'use client'

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Calendar, User, Eye, Heart, Share2, Clock
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: string | number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  views: number;
  likes: number;
  tags: string[];
}

const BlogDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!params?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Normalize id to string (Next.js params can be string | string[])
        const blogId = Array.isArray(params.id) ? params.id[0] : params.id;
        
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            // Map database blog to component interface
            const blogData = data.data;
            setBlog({
              id: blogData._id || blogId,
              title: blogData.title || '',
              excerpt: blogData.excerpt || '',
              content: blogData.content || '',
              author: blogData.author || 'Premium Dubai Tours',
              authorImage: blogData.authorImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
              publishDate: blogData.publishDate ? new Date(blogData.publishDate).toLocaleDateString() : 'N/A',
              readTime: blogData.readTime || '5 min read',
              category: blogData.category || 'Travel Guide',
              image: blogData.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
              views: blogData.views || 0,
              likes: blogData.likes || 0,
              tags: blogData.tags || [],
            });
          } else {
            setBlog(null);
          }
        } else {
          console.error('Failed to fetch blog:', response.status, response.statusText);
          setBlog(null);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-900">Loading article...</h2>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h3>
          <p className="text-gray-600 mb-8">The article you are looking for does not exist.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-3">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-gray-900">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-gray-900">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden bg-gray-100">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content - Full Width */}
      <article className="max-w-none w-full font-merriweather">
        {/* Article Header */}
        <header className="max-w-5xl mx-auto px-1 sm:px-2 lg:px-3 pt-12 pb-8">
          <div className="mb-6">
            <Badge className="mb-4">{blog.category}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 font-montserrat">
              {blog.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-merriweather">
              {blog.excerpt}
            </p>
          </div>

          {/* Author & Meta Info */}
          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={blog.authorImage}
                  alt={blog.author}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900 font-montserrat">{blog.author}</p>
                <p className="text-sm text-gray-500 font-merriweather">{blog.publishDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600 font-merriweather">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{blog.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>{blog.likes.toLocaleString()} likes</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Body - Full Width Content */}
        <div className="max-w-none w-full">
          <div className="prose prose-lg prose-gray max-w-none px-1 sm:px-2 lg:px-3 pb-16">
            {/* Blog Content from Database */}
            <div className="max-w-5xl mx-auto border border-gray-200 rounded-lg p-6 mb-16 font-merriweather">
              <div 
                className="text-lg md:text-xl text-gray-700 leading-relaxed font-merriweather whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
              />
            </div>

          </div>
        </div>

        {/* Tags & Footer */}
        <footer className="max-w-5xl mx-auto px-1 sm:px-2 lg:px-3 pb-16">
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-sm px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Explore Dubai During Your Layover?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Contact us for a free consultation and customized stopover tour itinerary
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/packages/premium">
                  <Button size="lg" variant="outline">
                    View Premium Tours
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogDetailPage;
