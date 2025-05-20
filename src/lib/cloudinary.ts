import { Cloudinary } from '@cloudinary/url-gen';

/**
 * Shared Cloudinary client.
 * Reads your cloud name from NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME.
 */
export const cld = new Cloudinary({
    cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME! },
    url: { secure: true },
});
