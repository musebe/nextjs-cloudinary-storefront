// src/app/about/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const FEATURES = [
  {
    title: 'Versatile Media Showcase',
    description:
      'Present high-res images, autoplay videos, 360° spins, and interactive 3D models—all in one unified gallery.',
  },
  {
    title: 'AI-Powered Tagging',
    description:
      'Automatically classify and tag each asset so shoppers can filter, search, and discover products instantly.',
  },
  {
    title: 'Dynamic Thumbnail Carousel',
    description:
      'Smooth, responsive thumbnail scroller keeps the current media in focus and adapts to any screen size.',
  },
  {
    title: 'Server-Signed Security',
    description:
      'All Cloudinary transformations and API calls are signed server-side, ensuring your assets stay protected.',
  },
];

export default function AboutPage() {
  return (
    <main className='container mx-auto px-4 md:px-8 lg:px-16 py-16 space-y-20'>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className='flex flex-col items-center text-center space-y-6'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 180,
            damping: 14,
            delay: 0.2,
          }}
        >
          <Image
            src='/preview.png'
            alt='Storefront Demo Preview'
            width={800}
            height={450}
            className='rounded-lg shadow-lg'
            priority
          />
        </motion.div>

        <h1 className='text-4xl sm:text-5xl font-bold leading-tight max-w-2xl'>
          About&nbsp;
          <span className='text-indigo-600'>Interactive Storefront</span>
          &nbsp;Demo
        </h1>

        <p className='max-w-xl text-gray-700'>
          Explore how Next.js, Cloudinary’s Interactive Product Gallery, and
          AI-driven auto-tagging come together to power an immersive shopping
          experience. Dive into the features below or return to the demo to see
          it in action.
        </p>

        <Link href='/' className='mt-4'>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size='lg'>View Live Demo</Button>
          </motion.div>
        </Link>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {FEATURES.map((feat, idx) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className='hover:shadow-2xl transition-shadow'>
              <CardHeader>
                <CardTitle className='text-lg'>{feat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-sm text-gray-600'>
                  {feat.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* ── Technology Stack ───────────────────────────────── */}
      <section className='text-center space-y-4'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-2xl font-semibold'
        >
          Technology Stack
        </motion.h2>
        <div className='flex flex-wrap justify-center gap-3'>
          <Badge>Next.js 15</Badge>
          <Badge>React 19</Badge>
          <Badge>Tailwind CSS 4</Badge>
          <Badge>shadcn/ui</Badge>
          <Badge>Motion.dev</Badge>
          <Badge>Cloudinary AI</Badge>
          <Badge>Axios</Badge>
        </div>
      </section>
    </main>
  );
}
