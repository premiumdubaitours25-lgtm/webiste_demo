import connectDB from '../../../lib/mongodb';
import Package from '../../../models/Package';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const packages = await Package.find({}).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: packages });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      console.log('Received package data:', JSON.stringify(req.body, null, 2));
      const packageData = req.body;
      const newPackage = new Package(packageData);
      const savedPackage = await newPackage.save();
      console.log('Package saved successfully:', savedPackage._id);
      res.status(201).json({ success: true, data: savedPackage });
    } catch (error) {
      console.error('Error creating package:', error);
      res.status(500).json({ success: false, error: error.message, details: error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
