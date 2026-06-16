'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ImageUrlOrUpload, { uploadImageToCloudinary } from '@/components/ImageUrlOrUpload';

type TeamMember = {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  description?: string;
  photo?: string;
  isActive?: boolean;
};

type TeamForm = {
  name: string;
  email: string;
  phone: string;
  description: string;
  photo: string;
};

export default function TeamsDashboardPanel() {
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<TeamForm>({
    name: '',
    email: '',
    phone: '',
    description: '',
    photo: '',
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/teams');
      const data = await res.json();
      if (res.ok && data.success) {
        setTeams(Array.isArray(data.data) ? data.data : []);
      } else {
        setTeams([]);
      }
    } catch (e) {
      console.error('Error fetching teams:', e);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const resetModal = () => {
    setIsModalOpen(false);
    setMode('create');
    setEditingId(null);
    setSubmitting(false);
    setError('');
    setPhotoFile(null);
    setForm({
      name: '',
      email: '',
      phone: '',
      description: '',
      photo: '',
    });
  };

  const openCreate = () => {
    setMode('create');
    setEditingId(null);
    setError('');
    setPhotoFile(null);
    setForm({ name: '', email: '', phone: '', description: '', photo: '' });
    setIsModalOpen(true);
  };

  const openEdit = (team: TeamMember) => {
    setMode('edit');
    setEditingId(team._id);
    setError('');
    setPhotoFile(null);
    setForm({
      name: team.name || '',
      email: team.email || '',
      phone: team.phone || '',
      description: team.description || '',
      photo: team.photo || '',
    });
    setIsModalOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      let photoUrl = form.photo;
      if (photoFile) {
        photoUrl = await uploadImageToCloudinary(photoFile);
      }

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        description: form.description.trim(),
        photo: (photoUrl || '').trim(),
      };

      const url =
        mode === 'create' ? '/api/teams' : `/api/teams/${editingId}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        // keep data null
      }

      if (res.ok && data?.success) {
        await fetchTeams();
        resetModal();
      } else {
        setError(data?.error || text || 'Failed to save team member');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save team member');
    } finally {
      setSubmitting(false);
    }
  };

  const actionButtons = useMemo(() => {
    return (
      <div className="flex items-center justify-between mb-6">
        <div>
          <CardTitle>Teams</CardTitle>
          <CardDescription>Manage team members shown on the About page</CardDescription>
        </div>
        <Button size="sm" onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>
    );
  }, []);

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          {actionButtons}
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="text-center py-12 text-gray-600">Loading team members...</div>
          ) : teams.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              No team members added yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Photo</th>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Phone</th>
                    <th className="text-left p-3">Description</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team._id} className="border-b">
                      <td className="p-3">
                        {team.photo ? (
                          <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={team.photo}
                              alt={team.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-100" />
                        )}
                      </td>
                      <td className="p-3 font-medium">{team.name}</td>
                      <td className="p-3 text-gray-600">{team.email || '-'}</td>
                      <td className="p-3 text-gray-600">{team.phone || '-'}</td>
                      <td className="p-3 text-gray-600">
                        <p className="line-clamp-2 max-w-md">{team.description || '-'}</p>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEdit(team)}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={async () => {
                              if (
                                !window.confirm(
                                  `Delete "${team.name}"?`
                                )
                              ) {
                                return;
                              }
                              const res = await fetch(`/api/teams/${team._id}`, {
                                method: 'DELETE',
                              });
                              if (res.ok) {
                                await fetchTeams();
                              } else {
                                const t = await res.text();
                                setError(t);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={isModalOpen}
        onOpenChange={(o) => {
          if (!o) resetModal();
          setIsModalOpen(o);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{mode === 'create' ? 'Add Team Member' : 'Edit Team Member'}</DialogTitle>
            <DialogDescription>
              Upload photo + add contact details. This will appear on the About page.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="team-name">Name *</Label>
                <Input
                  id="team-name"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-email">Email</Label>
                <Input
                  id="team-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-phone">Phone</Label>
                <Input
                  id="team-phone"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Photo</Label>
                <ImageUrlOrUpload
                  id="team-photo"
                  label="Team photo"
                  value={form.photo}
                  onChange={(url) => setForm((p) => ({ ...p, photo: url }))}
                  onFileChange={setPhotoFile}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="team-description">Description</Label>
              <Textarea
                id="team-description"
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={resetModal} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : mode === 'create' ? 'Create Team Member' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

