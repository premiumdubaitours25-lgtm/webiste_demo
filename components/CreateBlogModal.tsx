'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUrlOrUpload, { uploadImageToCloudinary } from '@/components/ImageUrlOrUpload';

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateBlogModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateBlogModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Premium Dubai Tours',
    authorImage: '',
    readTime: '5 min read',
    category: 'Travel Guide',
    image: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [authorImageFile, setAuthorImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let imageUrl = formData.image;
      let authorImageUrl = formData.authorImage;

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      if (authorImageFile) {
        authorImageUrl = await uploadImageToCloudinary(authorImageFile);
      }

      if (!imageUrl) {
        setError('Please upload a blog image or provide an image URL');
        setLoading(false);
        return;
      }

      // Convert tags string to array
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
          authorImage: authorImageUrl,
          tags: tagsArray,
        }),
      });

      // Get response text first to handle both JSON and HTML errors
      const responseText = await response.text();
      
      // Check if response is ok
      if (!response.ok) {
        let errorMessage = 'Failed to create blog';
        try {
          // Try to parse as JSON
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          // If not JSON, use the text as error message
          errorMessage = responseText || errorMessage;
        }
        setError(errorMessage);
        setLoading(false);
        return;
      }

      // Parse successful response as JSON
      const data = JSON.parse(responseText);

      if (data.success) {
        onSuccess();
        handleClose();
      } else {
        setError(data.error || 'Failed to create blog');
      }
    } catch (err) {
      console.error('Error creating blog:', err);
      const errorMessage = err instanceof Error ? err.message : err?.toString() || 'Unknown error occurred';
      setError(`Network error: ${errorMessage}. Please check your connection and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'Premium Dubai Tours',
      authorImage: '',
      readTime: '5 min read',
      category: 'Travel Guide',
      image: '',
      tags: '',
    });
    setError('');
    setImageFile(null);
    setAuthorImageFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Blog Post</DialogTitle>
          <DialogDescription>
            Create a new blog post to display on the home page and blogs page
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Blog post title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Travel Guide">Travel Guide</SelectItem>
                  <SelectItem value="Adventure">Adventure</SelectItem>
                  <SelectItem value="Travel Tips">Travel Tips</SelectItem>
                  <SelectItem value="Culture">Culture</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Short description of the blog post"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Full blog post content"
              rows={10}
              required
            />
          </div>

          <ImageUrlOrUpload
            id="image"
            label="Blog Image"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            onFileChange={setImageFile}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Author name"
              />
            </div>

            <div className="space-y-2 md:col-span-1">
              <ImageUrlOrUpload
                id="authorImage"
                label="Author Image"
                value={formData.authorImage}
                onChange={(url) => setFormData({ ...formData, authorImage: url })}
                onFileChange={setAuthorImageFile}
                placeholder="https://example.com/author.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="readTime">Read Time</Label>
              <Input
                id="readTime"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="5 min read"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Dubai, Travel, Guide"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (imageFile || authorImageFile ? 'Uploading...' : 'Creating...') : 'Create Blog Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
