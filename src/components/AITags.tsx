'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface Props {
  publicId: string | undefined;
}

/** Tailwind utility colors for variety */
const COLORS = [
  'bg-indigo-100 text-indigo-800',
  'bg-sky-100 text-sky-800',
  'bg-emerald-100 text-emerald-800',
  'bg-amber-100 text-amber-800',
  'bg-pink-100 text-pink-800',
  'bg-purple-100 text-purple-800',
];

export function AITags({ publicId }: Props) {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!publicId) return;
    setLoading(true);
    fetch(`/api/tags?publicId=${encodeURIComponent(publicId)}`)
      .then((r) => r.json())
      .then((d) => setTags(d.tags ?? []))
      .finally(() => setLoading(false));
  }, [publicId]);

  return (
    <div className='mt-4 space-y-2'>
      <h4 className='font-semibold'>AI Tags</h4>

      {loading && <p className='text-sm text-muted'>Loading…</p>}

      {!loading && (
        <div className='flex flex-wrap gap-2'>
          {tags.length ? (
            tags.map((t, i) => (
              <Badge
                key={t}
                className={COLORS[i % COLORS.length] + ' capitalize'}
              >
                {t}
              </Badge>
            ))
          ) : (
            <p className='text-sm text-muted'>—</p>
          )}
        </div>
      )}
    </div>
  );
}
