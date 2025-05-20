import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

/**
 * GET /api/tags?publicId=<public_id>
 * Returns { tags: string[], raw: any }
 */
export async function GET(req: NextRequest) {
  const publicId = req.nextUrl.searchParams.get('publicId');
  console.log(`[Tags API] request for publicId="${publicId}"`);
  if (!publicId) {
    console.warn('[Tags API] no publicId provided');
    return NextResponse.json({ tags: [], raw: null }, { status: 400 });
  }

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    console.log(`[Tags API] fetching resource for "${publicId}"`);
    const resource = await cloudinary.api.resource(publicId, {
      resource_type: 'image',
      with_field: 'aws_rek_tagging',
    });
    console.log('[Tags API] raw resource.tags:', resource.tags);

    const rekData = resource.info?.categorization?.aws_rek_tagging?.data ?? [];
    console.log(`[Tags API] info.categorization.aws_rek_tagging.data.length = ${rekData.length}`);

    const rekTags = rekData.map((d: { tag: string }) => d.tag);
    console.log('[Tags API] mapped rekTags:', rekTags);

    const tags = Array.from(new Set([...rekTags, ...(resource.tags || [])]));
    console.log('[Tags API] merged tags:', tags);

    return NextResponse.json({ tags, raw: resource });
  } catch (err: unknown) {
    console.error('[Tags API] error fetching resource:', err);
    return NextResponse.json({ tags: [], raw: (err as Error).message }, { status: 500 });
  }
}
