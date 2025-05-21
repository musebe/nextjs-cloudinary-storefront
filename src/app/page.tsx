// src/app/page.tsx
'use client';
import { CloudinaryRawGallery } from '@/components/CloudinaryRawGallery';

export default function Home() {
  return (
    <main className='container mx-auto px-4 py-14 space-y-10'>
      <h1 className='text-3xl font-extrabold text-center tracking-tight animate-fade-in space-x-2'>
        <span className='text-[#3448C5]'>Interactive</span>{' '}
        <span className='text-[#00ADEF]'>Storefront</span>{' '}
        <span className='text-[#F38020]'>Demo</span>
      </h1>
      <CloudinaryRawGallery />
    </main>
  );
}
