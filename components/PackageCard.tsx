'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Star } from 'lucide-react';

export interface PackageCardData {
  _id: string;
  title: string;
  subtitle?: string;
  location: string;
  duration: string;
  price: number;
  rating?: number;
  bookings?: number;
  images?: Array<{ url: string; alt?: string } | string>;
}

interface PackageCardProps {
  pkg: PackageCardData;
}

const formatPrice = (price: number) => {
  if (!price || price <= 0) return 'Custom';
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0,
  }).format(price);
};

const getPackageImage = (pkg: PackageCardData): { url: string; alt: string } | null => {
  if (!pkg.images || pkg.images.length === 0) return null;
  const firstImage = pkg.images[0];

  if (typeof firstImage === 'string') {
    const url = firstImage?.trim();
    if (!url) return null;
    return { url, alt: pkg.title };
  }

  const url = firstImage?.url?.trim?.() || '';
  if (url) {
    // next/image only supports local paths (starting with "/") or remote URLs (starting with http(s))
    const isLocal = url.startsWith('/');
    const isRemote = url.startsWith('http://') || url.startsWith('https://');
    if (!isLocal && !isRemote) return null;
    return { url, alt: firstImage.alt?.trim?.() || pkg.title };
  }

  return null;
};

const formatDurationShort = (duration: string) => {
  const nights = duration.match(/(\d+)\s*night/i);
  const days = duration.match(/(\d+)\s*day/i);

  if (nights && days) return `${nights[1]}N/${days[1]}D`;
  if (days) return `${days[1]}D`;
  if (/hour/i.test(duration)) {
    const hours = duration.match(/(\d+)/);
    return hours ? `${hours[1]}H` : duration;
  }

  return duration;
};

const renderStars = (rating = 0) => {
  const filled = Math.round(Math.max(0, Math.min(5, rating)));

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-3 w-3 ${
            index < filled ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

export default function PackageCard({ pkg }: PackageCardProps) {
  const image = getPackageImage(pkg);
  const durationShort = formatDurationShort(pkg.duration || '');
  const locationLabel = (pkg.location || 'Dubai, UAE').toUpperCase();
  const bookings = pkg.bookings ?? 0;

  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <MapPin className="h-10 w-10 text-gray-300" />
          </div>
        )}
      </div>

      <div className="p-3.5 md:p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500">
          {durationShort} · {locationLabel}
        </p>

        <h3 className="mt-1.5 line-clamp-2 text-base font-bold uppercase leading-snug tracking-wide text-slate-900 md:text-lg">
          {pkg.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          {renderStars(pkg.rating)}
          <span className="text-[11px] text-gray-500">
            {bookings} Booking{bookings !== 1 ? 's' : ''}
          </span>
        </div>

        <p className="mt-1 text-xs text-gray-500">{pkg.duration}</p>

        <div className="mt-3 flex items-end justify-between gap-2 border-t border-gray-100 pt-3">
          <div>
            <p className="text-xl font-bold text-slate-900 md:text-2xl">
              {formatPrice(pkg.price)}
              {pkg.price > 0 && (
                <span className="ml-1 text-xs font-normal text-gray-500">/ person</span>
              )}
            </p>
          </div>

          <Link
            href={`/packages/${pkg._id}`}
            aria-label={`View ${pkg.title}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-800"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
