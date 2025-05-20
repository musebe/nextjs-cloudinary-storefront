'use client';

import { useEffect, useState } from 'react';
import { AITags } from '@/components/AITags';

/**
 * Cloudinary Product-Gallery wrapper
 * • Client-only (no hydration diff)
 * • Explicit public-IDs – no `/image/list` API
 * • Emits `mediachanged` to keep <AITags /> in sync
 * • Stage is bounded by `.cld-gallery-bounded` CSS (560 × 420, object-fit:contain)
 */

/* ---------- extra typing for gallery events ------------------- */
declare global {
    interface CloudinaryGalleryWidget {
      on(
        event: 'mediachanged',
        cb: (e: { public_id?: string }) => void
      ): void;
    }
  }
  
export function CloudinaryRawGallery() {
  /** store the currently-active Cloudinary public_id */
  const [activeId, setActiveId] = useState<string | undefined>(
    'cloudinary-storefront/iphone_front'
  );

  useEffect(() => {
    if (!window.cloudinary?.galleryWidget) return;

    /* 1️⃣  asset list — edit freely */
    const mediaAssets = [
      { publicId: 'cloudinary-storefront/iphone_front', mediaType: 'image' },
      { publicId: 'cloudinary-storefront/iphone_back', mediaType: 'image' },
      { publicId: 'cloudinary-storefront/iphone_side', mediaType: 'image' },
      { publicId: 'cloudinary-storefront/iphone_video', mediaType: 'video' },
      { publicId: 'cloudinary-storefront/iphone', mediaType: '3d' },
    ];

    /* 2️⃣  init widget */
    const widget = window.cloudinary.galleryWidget({
      container: '#my-gallery',
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      mediaAssets,

      /* —— style preset (matches your sample) ——————————————— */
      displayProps: { spacing: 15, mode: 'classic' },
      aspectRatio: '16:9',
      bgColor: 'transparent',
      carouselOffset: 20,
      navigation: 'always',
      transition: 'fade',
      zoomProps: { level: 1.6 },

      thumbnailProps: {
        mediaSymbolSize: 42,
        spacing: 20,
        width: 130,
        height: 110,
        navigationFloat: true,
        navigationShape: 'radius',
        navigationSize: 40,
        navigationColor: '#ffffff',
        selectedStyle: 'gradient',
        selectedBorderPosition: 'bottom',
        selectedBorderWidth: 4,
        navigationIconColor: '#000000',
      },

      navigationButtonProps: {
        shape: 'round',
        iconColor: '#1d73cb',
        color: '#3a345e',
        size: 52,
        navigationPosition: 'offset',
        navigationOffset: 12,
      },

      themeProps: { primary: '#3a345e', active: '#3a345e' },
      secureDistribution: 'res.cloudinary.com',
    });

    /* 3️⃣  update tags on slide / click */
    widget.on('mediachanged', (ev) => {
        if (ev.public_id) setActiveId(ev.public_id);
    });

    widget.render();
    return () => widget.destroy?.();
  }, []);

  /* centred wrapper; stage bounded by CSS class */
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div id='my-gallery' className='cld-gallery-bounded' />
      <AITags publicId={activeId} />
    </div>
  );
}
