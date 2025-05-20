/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'motion/react';

export function Footer() {
  const badges = [
    {
      href: 'https://nextjs.org/',
      alt: 'Next.js badge',
      src: 'https://img.shields.io/badge/Next.js-15-blue?logo=next.js',
      width: 130,
      height: 24,
    },
    {
      href: 'https://cloudinary.com/',
      alt: 'Cloudinary badge',
      src: 'https://img.shields.io/badge/Cloudinary-Interactive--Media-lightblue?logo=cloudinary',
      width: 200,
      height: 24,
    },
    {
      href: 'https://tailwindcss.com/',
      alt: 'Tailwind CSS badge',
      src: 'https://img.shields.io/badge/Tailwind-4.0-38BDF8?logo=tailwindcss',
      width: 160,
      height: 24,
    },
    {
      href: 'https://ui.shadcn.com/',
      alt: 'shadcn/ui badge',
      src: 'https://img.shields.io/badge/shadcn.ui-components-pink?logo=tailwindcss',
      width: 180,
      height: 24,
    },
    {
      href: 'https://motion.dev/',
      alt: 'Motion.dev badge',
      src: 'https://img.shields.io/badge/Motion.dev-framer--motion-orange?logo=motion',
      width: 170,
      height: 24,
    },
    {
      href: 'https://axios-http.com/',
      alt: 'Axios badge',
      src: 'https://img.shields.io/badge/Axios-%5E1.3.0-gray?logo=axios',
      width: 100,
      height: 24,
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className='mt-auto bg-white border-t border-gray-200 text-gray-700 py-6'
    >
      <div className='mx-auto max-w-7xl flex flex-col items-center gap-4 px-4 text-center'>
        {/* tagline */}
        <p className='text-sm font-medium'>
          Interactive Storefront Demo &mdash; powered by
          Next.js&nbsp;&amp;&nbsp;Cloudinary AI
        </p>

        {/* tech badges */}
        <div className='flex flex-wrap justify-center gap-3'>
          {badges.map((b) => (
            <a
              key={b.src}
              href={b.href}
              target='_blank'
              rel='noopener noreferrer'
              className='block'
            >
              <img
                src={b.src}
                alt={b.alt}
                width={b.width}
                height={b.height}
                className='h-6 w-auto'
              />
            </a>
          ))}
        </div>

        {/* credits */}
        <p className='text-xs text-gray-500'>
          Built by{' '}
          <a
            href='https://github.com/musebe'
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-gray-700'
          >
            Eugene Musebe
          </a>{' '}
          ·{' '}
          <a
            href='https://github.com/musebe/nextjs-cloudinary-storefront'
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-gray-700'
          >
            View source on GitHub
          </a>
        </p>
      </div>
    </motion.footer>
  );
}
