'use client'

import { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface ImageUrlOrUploadProps {
  id: string
  label: string
  value: string
  onChange: (url: string) => void
  onFileChange: (file: File | null) => void
  required?: boolean
  placeholder?: string
}

export default function ImageUrlOrUpload({
  id,
  label,
  value,
  onChange,
  onFileChange,
  required = false,
  placeholder = 'https://example.com/image.jpg',
}: ImageUrlOrUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')

  const clearFile = () => {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setFileName('')
    onFileChange(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (preview) URL.revokeObjectURL(preview)
    onChange('')
    onFileChange(file)
    setPreview(URL.createObjectURL(file))
    setFileName(file.name)
  }

  const handleUrlChange = (url: string) => {
    if (url) clearFile()
    onChange(url)
  }

  const displayPreview = preview || value || null

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required ? ' *' : ''}
      </Label>

      <input
        ref={fileInputRef}
        id={`${id}-file`}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload from device
        </Button>
        {fileName && (
          <Button type="button" variant="ghost" size="sm" onClick={clearFile}>
            <X className="h-4 w-4 mr-1" />
            Remove file
          </Button>
        )}
      </div>

      {fileName && (
        <p className="text-xs text-gray-500">Selected: {fileName}</p>
      )}

      <p className="text-xs text-gray-500">Or paste an image URL:</p>
      <Input
        id={id}
        value={value}
        onChange={(e) => handleUrlChange(e.target.value)}
        placeholder={placeholder}
        type="url"
      />

      {displayPreview && (
        <div className="mt-2 w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={displayPreview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  )
}

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('images', file)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to upload image')
  }

  const result = await response.json()
  if (!result.success || !result.data?.[0]?.url) {
    throw new Error(result.error || 'Failed to upload image')
  }

  return result.data[0].url
}
