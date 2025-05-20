// src/app/page.tsx
'use client';
import { CloudinaryRawGallery } from '@/components/CloudinaryRawGallery';

export default function Home() {
  return (
    <main className='container mx-auto px-4 py-14 space-y-10'>
      <h1 className='text-3xl font-bold'>Interactive Storefront Demo</h1>
      <CloudinaryRawGallery />
    </main>
  );
}
