'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, User, Eye, Heart, Share2, ArrowRight, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const blogs = [
    {
      id: 1,
      title: "10 Must-Visit Places in Nepal for First-Time Travelers",
      excerpt: "Discover the most beautiful and culturally rich destinations in Nepal that every first-time visitor should experience.",
      content: "Nepal is a land of incredible diversity, from the towering Himalayas to the lush Terai plains...",
      author: "Rajesh Sharma",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      publishDate: "2024-01-15",
      readTime: "8 min read",
      category: "Travel Guide",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      views: 1250,
      likes: 89,
      tags: ["Nepal", "Travel Guide", "First Time", "Destinations"]
    },
    {
      id: 2,
      title: "Everest Base Camp Trek: A Complete Guide for Beginners",
      excerpt: "Everything you need to know about trekking to Everest Base Camp, from preparation to what to expect on the trail.",
      content: "The Everest Base Camp trek is one of the most popular and challenging treks in the world...",
      author: "Priya Thapa",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      publishDate: "2024-01-12",
      readTime: "12 min read",
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      views: 2100,
      likes: 156,
      tags: ["Everest", "Trekking", "Adventure", "Guide"]
    },
    {
      id: 3,
      title: "Best Time to Visit Nepal: Weather and Seasons Guide",
      excerpt: "Learn about Nepal's climate and find the perfect time to visit based on your travel preferences and activities.",
      content: "Nepal experiences four distinct seasons, each offering unique experiences for travelers...",
      author: "Amit Gurung",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      publishDate: "2024-01-10",
      readTime: "6 min read",
      category: "Travel Tips",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      views: 980,
      likes: 67,
      tags: ["Weather", "Seasons", "Best Time", "Nepal"]
    },
    {
      id: 4,
      title: "Cultural Heritage of Kathmandu Valley: UNESCO World Heritage Sites",
      excerpt: "Explore the rich cultural heritage of Kathmandu Valley and its seven UNESCO World Heritage Sites.",
      content: "The Kathmandu Valley is home to seven UNESCO World Heritage Sites that showcase Nepal's rich cultural heritage...",
      author: "Sunita Lama",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      publishDate: "2024-01-08",
      readTime: "10 min read",
      category: "Culture",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      views: 1450,
      likes: 112,
      tags: ["Culture", "UNESCO", "Kathmandu", "Heritage"]
    },
    {
      id: 5,
      title: "Wildlife Safari in Chitwan National Park: What to Expect",
      excerpt: "A comprehensive guide to wildlife safaris in Chitwan National Park, including what animals you might see.",
      content: "Chitwan National Park is one of Nepal's most famous wildlife destinations, home to the endangered one-horned rhinoceros...",
      author: "Rajesh Sharma",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      publishDate: "2024-01-05",
      readTime: "7 min read",
      category: "Wildlife",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      views: 890,
      likes: 73,
      tags: ["Wildlife", "Chitwan", "Safari", "National Park"]
    },
    {
      id: 6,
      title: "Bhutan Travel Guide: Land of the Thunder Dragon",
      excerpt: "Discover the mystical kingdom of Bhutan, its unique culture, and the best places to visit in this Himalayan paradise.",
      content: "Bhutan, known as the Land of the Thunder Dragon, is a unique destination that measures its success by Gross National Happiness...",
      author: "Priya Thapa",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      publishDate: "2024-01-03",
      readTime: "9 min read",
      category: "International",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      views: 1200,
      likes: 95,
      tags: ["Bhutan", "International", "Culture", "Himalayas"]
    },
    {
      id: 7,
      title: "Packing List for Nepal: Essential Items for Your Trip",
      excerpt: "A comprehensive packing list for Nepal, covering everything from trekking gear to cultural considerations.",
      content: "Packing for Nepal requires careful consideration of the diverse climate and activities you'll be doing...",
      author: "Amit Gurung",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      publishDate: "2024-01-01",
      readTime: "5 min read",
      category: "Travel Tips",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      views: 750,
      likes: 54,
      tags: ["Packing", "Travel Tips", "Nepal", "Essentials"]
    },
    {
      id: 8,
      title: "Annapurna Circuit Trek: A Journey Through Diverse Landscapes",
      excerpt: "Experience the Annapurna Circuit, one of the world's most diverse treks offering stunning mountain views and cultural encounters.",
      content: "The Annapurna Circuit is renowned for its incredible diversity, taking trekkers through various landscapes and cultures...",
      author: "Sunita Lama",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      publishDate: "2023-12-28",
      readTime: "11 min read",
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      views: 1680,
      likes: 134,
      tags: ["Annapurna", "Trekking", "Adventure", "Mountains"]
    }
  ];

  const categories = [
    { name: "All", value: "all", count: blogs.length },
    { name: "Travel Guide", value: "Travel Guide", count: blogs.filter(b => b.category === "Travel Guide").length },
    { name: "Adventure", value: "Adventure", count: blogs.filter(b => b.category === "Adventure").length },
    { name: "Travel Tips", value: "Travel Tips", count: blogs.filter(b => b.category === "Travel Tips").length },
    { name: "Culture", value: "Culture", count: blogs.filter(b => b.category === "Culture").length },
    { name: "Wildlife", value: "Wildlife", count: blogs.filter(b => b.category === "Wildlife").length },
    { name: "International", value: "International", count: blogs.filter(b => b.category === "International").length }
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || blog.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      case "popular":
        return b.views - a.views;
      case "trending":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const featuredBlog = blogs[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-32 md:py-40 lg:py-48 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('/theme-img-1951.webp')`
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-10">
              Travel Blog
            </h1>
            <p className="text-3xl md:text-4xl lg:text-5xl mb-12 opacity-90">
              Discover travel tips, destination guides, and inspiring stories from around the world
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Calendar className="h-4 w-4 mr-2" />
                {blogs.length} Articles
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Eye className="h-4 w-4 mr-2" />
                Travel Insights
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Featured Article
            </h2>
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="aspect-video md:aspect-square relative">
                    <Image
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className="bg-primary text-white">{featuredBlog.category}</Badge>
                    <span className="text-sm text-gray-600">{featuredBlog.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={featuredBlog.authorImage}
                            alt={featuredBlog.author}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{featuredBlog.author}</p>
                          <p className="text-xs text-gray-600">{featuredBlog.publishDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {featuredBlog.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {featuredBlog.likes}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="w-full">
                      Read Full Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-100 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="trending">Most Liked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredBlogs.length} Article{filteredBlogs.length !== 1 ? 's' : ''} Found
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span>Filtered results</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-video relative">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                      {blog.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-3">{blog.excerpt}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {blog.publishDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        {blog.author}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">⏱️</span>
                        {blog.readTime}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {blog.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{blog.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {blog.views}
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {blog.likes}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="mt-4">
                      <Button className="w-full">
                        Read Article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setSortBy("latest");
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated with Travel Tips
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter for the latest travel guides, tips, and destination insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-white text-gray-900 placeholder-gray-500"
              />
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
