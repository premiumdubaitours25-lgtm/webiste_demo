import connectDB from '../../../lib/mongodb';
import Team from '../../../models/Team';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    await connectDB();

    if (req.method === 'GET') {
      const teams = await Team.find({ isActive: true }).sort({ createdAt: -1 }).lean();
      return res.status(200).json({ success: true, data: teams });
    }

    if (req.method === 'POST') {
      const name = req.body?.name?.trim();
      const designation = req.body?.designation?.trim?.() || '';
      const email = req.body?.email?.trim?.() || '';
      const phone = req.body?.phone?.trim?.() || '';
      const description = req.body?.description?.trim?.() || '';
      const photo = req.body?.photo?.trim?.() || '';

      if (!name) {
        return res.status(400).json({ success: false, error: 'Name is required' });
      }

      const team = await Team.create({
        name,
        designation,
        email,
        phone,
        description,
        photo,
        isActive: true,
      });

      return res.status(201).json({ success: true, data: team });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Teams API error:', error);
    return res
      .status(500)
      .json({ success: false, error: error?.message || 'Internal server error' });
  }
}

