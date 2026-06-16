import connectDB from '../../../lib/mongodb';
import Team from '../../../models/Team';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    await connectDB();
    const { id } = req.query;

    if (req.method === 'DELETE') {
      const deleted = await Team.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'Team member not found' });
      }
      return res.status(200).json({ success: true, data: deleted });
    }

    if (req.method === 'PUT') {
      const name = req.body?.name?.trim();
      const email = req.body?.email?.trim?.() || '';
      const phone = req.body?.phone?.trim?.() || '';
      const description = req.body?.description?.trim?.() || '';
      const photo = req.body?.photo?.trim?.() || '';

      if (!name) {
        return res.status(400).json({ success: false, error: 'Name is required' });
      }

      const updated = await Team.findByIdAndUpdate(
        id,
        { name, email, phone, description, photo, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );

      if (!updated) {
        return res.status(404).json({ success: false, error: 'Team member not found' });
      }

      return res.status(200).json({ success: true, data: updated });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Team by id API error:', error);
    return res
      .status(500)
      .json({ success: false, error: error?.message || 'Internal server error' });
  }
}

