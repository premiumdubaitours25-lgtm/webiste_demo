'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Heart,
  LucideIcon,
  MapPin,
  Phone,
  Share,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';

type PricingTier = {
  name: string;
  description: string;
  price: number;
};

type TabItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export function PackageHero({
  packageData,
  selectedImageIndex,
  onSelectImage,
  onBack,
  isPremium,
  isInternational,
  formatPrice,
}: {
  packageData: {
    title: string;
    subtitle?: string;
    location: string;
    duration: string;
    capacity: string;
    rating: number;
    reviews?: unknown[];
    images: Array<{ url: string; alt?: string }>;
    price: number;
  };
  selectedImageIndex: number;
  onSelectImage: (index: number) => void;
  onBack: () => void;
  isPremium: boolean;
  isInternational: boolean;
  formatPrice: (price: number) => string;
}) {
  const images = Array.isArray(packageData.images) ? packageData.images : [];
  const startingPrice = packageData.price;

  return (
    <section className="relative">
      <div className="relative h-[52vh] min-h-[420px] max-h-[640px] w-full overflow-hidden rounded-b-[2rem] md:rounded-b-[2.5rem]">
        {images.length > 0 ? (
          <Image
            src={images[selectedImageIndex].url}
            alt={images[selectedImageIndex].alt || packageData.title}
            fill
            className="object-cover scale-105"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-slate-800 via-slate-900 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" />

        <div className="absolute inset-x-0 top-0 z-20 p-4 md:p-6">
          <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-14">
            <Button
              variant="outline"
              size="sm"
              className="border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
              onClick={onBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-10">
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {isPremium ? (
                    <Badge className="border-0 bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1 text-white shadow-lg">
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                      Premium
                    </Badge>
                  ) : (
                    <Badge className="border-0 bg-white/15 px-3 py-1 text-white backdrop-blur-md">
                      {isInternational ? 'International' : 'Domestic'}
                    </Badge>
                  )}
                  <Badge className="border-0 bg-white/15 px-3 py-1 text-amber-300 backdrop-blur-md">
                    <Star className="mr-1 h-3.5 w-3.5 fill-current" />
                    {packageData.rating} · {packageData.reviews?.length || 0} reviews
                  </Badge>
                </div>

                <div>
                  <h1 className="font-playfair text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                    {packageData.title}
                  </h1>
                  {packageData.subtitle && (
                    <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">{packageData.subtitle}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: MapPin, label: packageData.location },
                    { icon: Clock, label: packageData.duration },
                    { icon: Users, label: packageData.capacity },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur-md"
                    >
                      <item.icon className="h-4 w-4 text-amber-300" />
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">From</p>
                  <p className="font-playfair text-3xl font-bold">{formatPrice(startingPrice)}</p>
                  <p className="text-sm text-white/70">per person</p>
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2">
                    {images.slice(0, 4).map((image, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => onSelectImage(index)}
                        className={cn(
                          'relative h-14 w-20 overflow-hidden rounded-xl border-2 transition-all',
                          selectedImageIndex === index
                            ? 'border-amber-400 ring-2 ring-amber-400/40'
                            : 'border-white/20 hover:border-white/50'
                        )}
                      >
                        <Image src={image.url} alt={image.alt || ''} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PackageNavTabs({
  tabs,
  activeTab,
  onTabClick,
}: {
  tabs: TabItem[];
  activeTab: string;
  onTabClick: (id: string) => void;
}) {
  return (
    <div className="sticky top-[var(--site-navbar-offset,4.5rem)] z-20 -mt-5 px-0 mb-0">
      <div className="rounded-xl rounded-b-none border border-b-0 border-slate-200/80 bg-white/95 p-1 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <div className="flex gap-1 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabClick(tab.id)}
                className={cn(
                  'flex min-w-fit items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                  active
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function TrustFeatureGrid({ isPremium }: { isPremium: boolean }) {
  const features = [
    { icon: CheckCircle, text: 'Verified Experience', tone: 'from-emerald-50 to-white text-emerald-700' },
    { icon: ShieldCheck, text: 'Best Price Guarantee', tone: 'from-sky-50 to-white text-sky-700' },
    { icon: Users, text: 'Expert Local Guides', tone: 'from-violet-50 to-white text-violet-700' },
    { icon: Sparkles, text: 'Curated with Care', tone: 'from-amber-50 to-white text-amber-700' },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {features.map((feature) => (
        <div
          key={feature.text}
          className={cn(
            'group flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-gradient-to-br p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
            feature.tone,
            isPremium && 'border-amber-100/80'
          )}
        >
          <div className="rounded-xl bg-white p-2.5 shadow-sm">
            <feature.icon className="h-5 w-5" />
          </div>
          <span className="font-medium text-slate-800">{feature.text}</span>
        </div>
      ))}
    </div>
  );
}

export function ContentSection({
  title,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm md:p-6', className)}>
      <div className="mb-4 flex items-center gap-3">
        {Icon && (
          <div className="rounded-xl bg-slate-900 p-2.5 text-white">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <h3 className="font-playfair text-xl font-semibold text-slate-900 md:text-2xl">{title}</h3>
      </div>
      <div className="text-slate-600 leading-relaxed">{children}</div>
    </div>
  );
}

export function PackageItineraryHeader({ duration }: { duration: string }) {
  return (
    <div className="mb-10 flex flex-col items-center px-4 pt-6 text-center md:pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Your journey</p>
      <h3 className="mt-2 font-playfair text-3xl font-bold text-slate-900 md:text-4xl">Daily Itinerary</h3>
      <Badge variant="outline" className="mt-4 rounded-full border-slate-300 bg-slate-50 px-4 py-1.5 text-slate-700">
        <Calendar className="mr-1.5 h-3.5 w-3.5" />
        {duration}
      </Badge>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  badge,
}: {
  eyebrow: string;
  title: string;
  badge?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col items-center px-4 pt-6 text-center md:pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{eyebrow}</p>
      <h3 className="mt-2 font-playfair text-3xl font-bold text-slate-900 md:text-4xl">{title}</h3>
      {badge ? <div className="mt-4">{badge}</div> : null}
    </div>
  );
}

export function TierBookingForm({
  tierName,
  tierPrice,
  onRequestBooking,
  onTalkToExpert,
}: {
  tierName?: string;
  tierPrice?: number;
  onRequestBooking: (tierName?: string) => void;
  onTalkToExpert?: (tierName?: string, tierPrice?: number) => void;
}) {
  return (
    <div className="space-y-3 border-t border-slate-100 pt-3">
      <div className="space-y-1.5">
        <Button
          className="h-9 w-full rounded-lg bg-slate-900 text-sm text-white shadow-md hover:bg-slate-800"
          onClick={() => onRequestBooking(tierName)}
        >
          Book Your Seat
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-8 w-full rounded-lg border-slate-300 text-xs text-slate-700 hover:bg-slate-50"
          onClick={() => onTalkToExpert?.(tierName, tierPrice)}
        >
          <Phone className="mr-1.5 h-3.5 w-3.5" />
          Enquiry
        </Button>
      </div>

      <p className="text-center text-[10px] text-slate-500">Free cancellation up to 48 hours</p>
    </div>
  );
}

export function PricingSidebar({
  pricingTiers,
  expandedPricingTier,
  onToggleTier,
  onRequestBooking,
  onTalkToExpert,
  packageData,
  formatPrice,
  isPremium,
}: {
  pricingTiers: PricingTier[];
  expandedPricingTier: string;
  onToggleTier: (name: string) => void;
  onRequestBooking: (tierName?: string) => void;
  onTalkToExpert?: (details: { tierName?: string; tierPrice?: number }) => void;
  packageData: { price: number };
  formatPrice: (price: number) => string;
  isPremium: boolean;
}) {
  const tierFormProps = {
    onRequestBooking,
    onTalkToExpert: (tierName?: string, tierPrice?: number) => {
      onTalkToExpert?.({ tierName, tierPrice });
    },
  };
  const tierAccent = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('diamond')) return 'from-slate-900 via-slate-800 to-slate-900';
    if (lower.includes('silver')) return 'from-slate-600 via-slate-500 to-slate-600';
    if (lower.includes('gold')) return 'from-amber-600 via-amber-500 to-amber-600';
    return isPremium ? 'from-amber-500 to-amber-600' : 'from-slate-900 to-slate-700';
  };

  return (
    <aside className="sticky top-[var(--site-navbar-offset,1rem)] z-30 w-full space-y-3 lg:max-h-[calc(100vh-var(--site-navbar-offset,1rem)-1.5rem)] lg:overflow-y-auto lg:overscroll-contain hide-scrollbar">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Book this tour</p>
          <p className="font-playfair text-lg font-semibold leading-tight text-slate-900">Choose your package</p>
        </div>

        <div className="space-y-2.5 p-3">
          {pricingTiers.length > 0 ? (
            pricingTiers.map((tier, idx) => {
              const isExpanded = expandedPricingTier === tier.name;
              return (
                <Card
                  key={`${tier.name}-${idx}`}
                  className={cn(
                    'overflow-hidden border transition-all duration-300',
                    isExpanded
                      ? 'border-slate-900 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onToggleTier(isExpanded ? '' : tier.name)}
                    className="w-full text-left"
                  >
                    <div
                      className={cn(
                        'bg-gradient-to-r px-3 py-3 text-white transition-all',
                        isExpanded ? tierAccent(tier.name) : 'from-slate-100 to-white text-slate-900'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className={cn('text-xs font-semibold', !isExpanded && 'text-slate-500')}>
                            {tier.name}
                          </p>
                          <p className={cn('mt-0.5 text-lg font-bold leading-tight', !isExpanded && 'text-slate-900')}>
                            {formatPrice(tier.price)}
                            <span className={cn('ml-1 text-[10px] font-normal', isExpanded ? 'text-white/75' : 'text-slate-500')}>
                              / person
                            </span>
                          </p>
                          {tier.description && (
                            <p className={cn('mt-1.5 line-clamp-2 text-[11px] leading-snug', isExpanded ? 'text-white/80' : 'text-slate-600')}>
                              {tier.description}
                            </p>
                          )}
                        </div>
                        <ChevronDown
                          className={cn(
                            'mt-0.5 h-4 w-4 shrink-0 transition-transform duration-300',
                            isExpanded ? 'rotate-180 text-white' : 'text-slate-400'
                          )}
                        />
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <CardContent className="p-3 pt-2">
                      <TierBookingForm tierName={tier.name} tierPrice={tier.price} {...tierFormProps} />
                    </CardContent>
                  )}
                </Card>
              );
            })
          ) : (
            <Card className="overflow-hidden border-slate-200">
              <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-3 py-4 text-white">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">Starting from</p>
                <p className="mt-0.5 font-playfair text-2xl font-bold">{formatPrice(packageData.price)}</p>
                <p className="text-xs text-white/75">per person</p>
              </div>
              <CardContent className="p-3">
                <TierBookingForm {...tierFormProps} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-2.5 text-[11px] leading-snug text-emerald-800">
        <div className="flex items-start gap-1.5">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <p>Secure Stripe checkout · Instant confirmation · Dubai support</p>
        </div>
      </div>
    </aside>
  );
}
