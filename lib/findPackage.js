import mongoose from 'mongoose';
import Package from '../../../models/Package';
import { createPackageSlug } from '../../../lib/packageSlug';

export async function findPackageByIdOrSlug(id) {
  if (!id) return null;

  if (mongoose.Types.ObjectId.isValid(id)) {
    const byId = await Package.findById(id);
    if (byId) return byId;
  }

  const normalizedId = String(id).trim().toLowerCase();
  const bySlug = await Package.findOne({ slug: normalizedId });
  if (bySlug) return bySlug;

  return null;
}

export function withPackageSlug(packageData) {
  if (!packageData) return packageData;

  const payload = { ...packageData };
  if (!payload.slug) {
    payload.slug = createPackageSlug(payload.title);
  } else {
    payload.slug = createPackageSlug(payload.slug);
  }

  return payload;
}
