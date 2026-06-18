'use client'

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PackageCard from '@/components/PackageCard';
import { LEGACY_CATEGORY_ROUTES, normalizePackageCategoryKey } from '@/lib/packageSlug';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, Star, Crown, Heart, Shield, Globe, Phone, Sparkles, Calendar } from 'lucide-react';

interface PackageItem {
  _id: string;
  title: string;
  subtitle: string;
  about: string;
  price: number;
  duration: string;
  location: string;
  capacity: string;
  packageCategory: string;
  images?: Array<{ url: string; alt?: string }>;
  bookings?: number;
  rating?: number;
  slug?: string;
}

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  pageConfig?: {
    hero?: {
      title?: string;
      subtitle?: string;
      backgroundImage?: string;
    };
    sections?: Array<{
      badge?: string;
      title?: string;
      subtitle?: string;
      layout?: 'simple' | 'cards';
      content?: string;
      image?: string;
      cards?: Array<{
        title?: string;
        description?: string;
        icon?: string;
        iconImage?: string;
      }>;
    }>;
  };
}

const CARD_ICON_MAP: Record<string, any> = {
  crown: Crown,
  star: Star,
  heart: Heart,
  clock: Calendar,
  shield: Shield,
  globe: Globe,
  phone: Phone,
  sparkles: Sparkles,
};

const DEFAULT_FIXED_CATEGORY_SLUGS = new Set(Object.keys(LEGACY_CATEGORY_ROUTES));

export default function CategoryPackagesPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params?.slug || '';

  const [loading, setLoading] = useState(true);
  const [allPackages, setAllPackages] = useState<PackageItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const legacyRoute = LEGACY_CATEGORY_ROUTES[slug as keyof typeof LEGACY_CATEGORY_ROUTES];
    if (legacyRoute) {
      router.replace(legacyRoute);
    }
  }, [slug, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesRes, categoriesRes] = await Promise.all([
          fetch('/api/packages'),
          fetch('/api/categories'),
        ]);

        const packagesData = await packagesRes.json();
        const categoriesData = await categoriesRes.json();

        if (packagesRes.ok && packagesData.success && Array.isArray(packagesData.data)) {
          setAllPackages(packagesData.data);
        } else {
          setAllPackages([]);
        }

        if (categoriesRes.ok && categoriesData.success && Array.isArray(categoriesData.data)) {
          setCategories(categoriesData.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error('Error loading category packages page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categoryName = useMemo(() => {
    const matched = categories.find((category) => category.slug === slug);
    if (matched?.name) return matched.name;
    return slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }, [categories, slug]);

  const matchedCategory = useMemo(
    () => categories.find((category) => category.slug === slug),
    [categories, slug]
  );

  const isDefaultCategory = DEFAULT_FIXED_CATEGORY_SLUGS.has(slug);
  const heroTitle = isDefaultCategory
    ? categoryName
    : matchedCategory?.pageConfig?.hero?.title || categoryName;
  const customHeroSubtitle = isDefaultCategory
    ? ''
    : matchedCategory?.pageConfig?.hero?.subtitle || '';
  const heroBackgroundImage = isDefaultCategory
    ? ''
    : matchedCategory?.pageConfig?.hero?.backgroundImage || '';
  const customSections = !isDefaultCategory && Array.isArray(matchedCategory?.pageConfig?.sections)
    ? matchedCategory?.pageConfig?.sections.filter(
        (section) =>
          section?.badge ||
          section?.title ||
          section?.subtitle ||
          section?.content ||
          (section?.cards && section.cards.length > 0)
      )
    : [];

  const filteredPackages = useMemo(
    () =>
      allPackages.filter(
        (pkg) =>
          normalizePackageCategoryKey(pkg.packageCategory || '') ===
          normalizePackageCategoryKey(slug)
      ),
    [allPackages, slug]
  );
  const heroSubtitle = customHeroSubtitle || `${filteredPackages.length} package(s) found`;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  if (LEGACY_CATEGORY_ROUTES[slug as keyof typeof LEGACY_CATEGORY_ROUTES]) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative text-white min-h-[65vh] md:min-h-[72vh] lg:min-h-[78vh] flex items-center py-20 md:py-24 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${
              heroBackgroundImage ||
              'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80'
            })`,
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-playfair tracking-tight">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 opacity-90 font-poppins font-light tracking-wide">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {!isDefaultCategory && customSections.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-white to-amber-50/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto space-y-20">
              {customSections.map((section, index) => (
                <div
                  key={`${section?.title || 'section'}-${index}`}
                  className={`w-full ${
                    index < customSections.length - 1 ? 'border-b border-[#e8e2d3] pb-16' : ''
                  }`}
                >
                  <div className="text-center mb-12">
                    {section?.badge && (
                      <Badge className="mb-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white border-none px-6 py-2 text-sm font-semibold shadow-lg">
                        <Sparkles className="h-4 w-4 mr-2" />
                        {section.badge}
                      </Badge>
                    )}
                    {section?.title && (
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight font-playfair tracking-tight">
                        <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                          {section.title}
                        </span>
                      </h2>
                    )}
                    {section?.subtitle && ((section?.layout || 'simple') === 'cards' || !section?.content) && (
                      <p className="text-lg text-gray-600 max-w-3xl mx-auto font-poppins font-light">
                        {section.subtitle}
                      </p>
                    )}
                  </div>

                  {(section?.layout || 'simple') === 'cards' ? (
                    <div className="grid md:grid-cols-2 gap-8">
                      {(section?.cards || []).map((card, cardIndex) => {
                        const IconComp = CARD_ICON_MAP[card?.icon || 'star'] || Star;
                        return (
                          <Card
                            key={`${card?.title || 'card'}-${cardIndex}`}
                            className="border-2 border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm"
                          >
                            <CardContent className="p-8">
                              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg overflow-hidden">
                                {card?.iconImage ? (
                                  <img
                                    src={card.iconImage}
                                    alt={card?.title || `Card ${cardIndex + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <IconComp className="h-8 w-8 text-white" />
                                )}
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-4 font-cormorant tracking-wide">
                                {card?.title || `Card ${cardIndex + 1}`}
                              </h3>
                              <p className="text-gray-700 leading-relaxed text-lg font-poppins font-light whitespace-pre-wrap">
                                {card?.description || ''}
                              </p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed text-lg font-poppins font-light whitespace-pre-wrap text-center max-w-3xl mx-auto">
                      {section?.content || section?.subtitle || ''}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
          {filteredPackages.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h3>
              <p className="text-gray-600 mb-6">No package is created in this category yet.</p>
              <Link href="/packages">
                <Button>View All Packages</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          )}
          </div>
        </div>
      </section>
    </div>
  );
}
