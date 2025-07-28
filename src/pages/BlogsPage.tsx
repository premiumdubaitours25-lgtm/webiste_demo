import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import blogHeroImage from "@/assets/image.png";
import BestPlaceSection from "@/components/BestPlaceSection";

const BlogsPage = () => {
  const blogs = [
    {
      id: 1,
      title: "Goa on a Shoe-string Budget? Check out These Chic Apartments for a Comfy Stay!",
      excerpt: "Discover affordable yet stylish accommodation options in Goa that won't break the bank. From beachside apartments to cozy homestays, we've got you covered.",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
      category: "Budget Travel",
      author: "Travel Expert",
      date: "2024-01-15",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "6 Red Sea Diving Experiences in Saudi to Add to Your Bucket List",
      excerpt: "Explore the underwater wonders of the Red Sea with these incredible diving experiences that showcase Saudi Arabia's marine biodiversity.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      category: "Adventure",
      author: "Dive Specialist",
      date: "2024-01-12",
      readTime: "7 min read",
      featured: false
    },
    {
      id: 3,
      title: "The Ultimate Guide to Hiking to the Tiger's Nest, Bhutan",
      excerpt: "Everything you need to know about the trek to Bhutan's most famous monastery, including preparation tips, what to expect, and cultural insights.",
      image: "https://images.unsplash.com/photo-1566054757965-e80f2fb03d1c?w=800&h=600&fit=crop",
      category: "Trekking",
      author: "Mountain Guide",
      date: "2024-01-10",
      readTime: "10 min read",
      featured: true
    },
    {
      id: 4,
      title: "Chele La Pass Bhutan: The Hidden Paradise of Nature",
      excerpt: "Discover the breathtaking beauty of Chele La Pass, the highest motorable pass in Bhutan, offering stunning views and unique flora.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      category: "Nature",
      author: "Nature Explorer",
      date: "2024-01-08",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 5,
      title: "Exploring the Living Root Bridges of Meghalaya",
      excerpt: "Journey into the heart of Meghalaya to witness these incredible natural formations and learn about the indigenous Khasi engineering.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      category: "Culture",
      author: "Cultural Writer",
      date: "2024-01-05",
      readTime: "8 min read",
      featured: false
    },
    {
      id: 6,
      title: "Nepal's Hidden Gems: Beyond Everest Base Camp",
      excerpt: "Discover lesser-known trekking routes and cultural experiences in Nepal that offer authentic Himalayan adventures.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      category: "Trekking",
      author: "Trek Leader",
      date: "2024-01-03",
      readTime: "12 min read",
      featured: true
    }
  ];

  const categories = ["All", "Adventure", "Budget Travel", "Culture", "Nature", "Trekking"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const featuredBlog = blogs.find(blog => blog.featured);

  return (
    <div className="min-h-screen bg-travel-light-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('${blogHeroImage}')`
          }}
        ></div>
        {/* Removed overlay */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center space-y-6 fade-in relative z-30">
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              Travel Blogs
            </h1>
            {/* Removed the visible hero image */}
            <p className="text-xl text-white/90 max-w-3xl mx-auto bg-black/40 rounded-lg py-2 px-4 inline-block">
              Read our latest travel stories and tips
            </p>
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      {featuredBlog && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Featured Story</h2>
            <Card className="overflow-hidden bg-white shadow-xl hover-lift scale-in">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative">
                  <img 
                    src={featuredBlog.image} 
                    alt={featuredBlog.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-secondary text-white">
                    Featured
                  </Badge>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="secondary">{featuredBlog.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(featuredBlog.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredBlog.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{featuredBlog.title}</h3>
                    <p className="text-muted-foreground">{featuredBlog.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{featuredBlog.author}</span>
                      </div>
                      <Button className="bg-secondary hover:bg-secondary/90 hover-lift">
                        Read More <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 scale-in">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`hover-lift ${selectedCategory === category ? 'bg-secondary hover:bg-secondary/90' : 'border-secondary text-secondary hover:bg-secondary/10'}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <Card key={blog.id} className={`overflow-hidden hover-lift bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${index % 3 === 0 ? 'slide-up' : index % 3 === 1 ? 'scale-in' : 'fade-in'}`}>
                <div className="relative">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-secondary text-white">
                    {blog.category}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground line-clamp-2">{blog.title}</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{blog.author}</span>
                    </div>
                    <Button variant="outline" size="sm" className="hover-lift border-secondary text-secondary hover:bg-secondary/10">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Best Place Section */}
      <BestPlaceSection 
        subtitle="Travel Stories"
        title="Get inspired by adventures in"
        destination="Every Corner"
        buttonText="READ MORE"
        buttonLink="/blogs"
      />
    </div>
  );
};

export default BlogsPage;