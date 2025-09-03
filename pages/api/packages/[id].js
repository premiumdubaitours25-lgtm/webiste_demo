import connectDB from '../../../lib/mongodb';
import Package from '../../../models/Package';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const packageData = await Package.findById(id);
      if (!packageData) {
        return res.status(404).json({ success: false, error: 'Package not found' });
      }
      res.status(200).json({ success: true, data: packageData });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const packageData = await Package.findByIdAndUpdate(
        id,
        { ...req.body, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
      if (!packageData) {
        return res.status(404).json({ success: false, error: 'Package not found' });
      }
      res.status(200).json({ success: true, data: packageData });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const packageData = await Package.findByIdAndDelete(id);
      if (!packageData) {
        return res.status(404).json({ success: false, error: 'Package not found' });
      }
      res.status(200).json({ success: true, data: packageData });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
