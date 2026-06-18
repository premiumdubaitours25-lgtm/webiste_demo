export function createPackageSlug(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getPackagePath(pkg) {
  const id = pkg?.slug || pkg?._id;
  if (!id) return '/packages';
  return `/packages/${id}`;
}

export const LEGACY_CATEGORY_ROUTES = {
  'regular-packages': '/packages/regular',
  'premium-packages': '/packages/premium',
  'luxury-packages': '/packages/luxury',
  'adventure-activities': '/packages/adventure',
  'oman-tour': '/packages/oman',
  'attraction-and-activity': '/packages/attractions',
};

export const CATEGORY_SLUG_MAP = {
  'regular-packages': 'regular',
  'premium-packages': 'premium',
  'luxury-packages': 'luxury',
  'adventure-activities': 'adventure',
  'oman-tour': 'oman-tour',
  'attraction-and-activity': 'attraction-and-activity',
};

export function normalizePackageCategoryKey(value = '') {
  const normalized = String(value).trim().toLowerCase();
  const map = {
    regular: 'regular',
    'regular packages': 'regular',
    premium: 'premium',
    'premium packages': 'premium',
    luxury: 'luxury',
    'luxury packages': 'luxury',
    adventure: 'adventure',
    'adventure activities': 'adventure',
    'oman tour': 'oman-tour',
    oman: 'oman-tour',
    'attraction and activity': 'attraction-and-activity',
    'attractions and activities': 'attraction-and-activity',
  };

  return CATEGORY_SLUG_MAP[normalized] || map[normalized] || normalized.replace(/\s+/g, '-');
}
