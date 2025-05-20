import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * If this image has only its folder-tag (or no tags),
 * call the Admin API `.update()` once to apply aws_rek_tagging.
 */
export async function ensureTags(publicId: string) {
    console.log(`[ensureTags] checking resource "${publicId}"`);
    const res = await cloudinary.api.resource(publicId, {
        resource_type: 'image',
    });
    console.log('[ensureTags] existing tags:', res.tags);

    const existing = res.tags || [];
    const folderTag = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;
    const onlyFolder = existing.length === 1 && existing[0] === folderTag;

    if (!onlyFolder) {
        console.log('[ensureTags] skipping (already tagged or multiple tags present)');
        return;
    }

    console.log(`[ensureTags] tagging "${publicId}" via Admin API…`);
    const updateRes = await cloudinary.api.update(publicId, {
        categorization: 'aws_rek_tagging',
        auto_tagging: 0.7,
    });
    console.log('[ensureTags] update result info.categorization.aws_rek_tagging.data.length =',
        updateRes.info?.categorization?.aws_rek_tagging?.data?.length ?? 0
    );
    console.log('[ensureTags] done tagging:', updateRes.tags);
}
