#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * scripts/tag-assets.cjs
 * ----------------------
 * Use the Admin API’s `update` call to apply AWS Rekognition
 * auto-tagging to existing PNGs, assigning tags above your chosen threshold.
 *
 * Usage:
 *   npm run tag-assets               # tags the three iPhone PNGs
 *   npm run tag-assets -- id1 id2    # tags only the IDs you list
 */

const path = require('path');
const dotenv = require('dotenv');
const { v2: cloudinary } = require('cloudinary');

// 1️⃣ explicitly load .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: cloud_name,
  CLOUDINARY_API_KEY: api_key,
  CLOUDINARY_API_SECRET: api_secret,
} = process.env;

if (!cloud_name || !api_key || !api_secret) {
  console.error(
    '❗ Missing env vars. Ensure .env.local defines NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY & CLOUDINARY_API_SECRET'
  );
  process.exit(1);
}

// 2️⃣ configure the SDK
cloudinary.config({ cloud_name, api_key, api_secret });

// 3️⃣ default list of image-only assets
const defaults = [
  'cloudinary-storefront/iphone_front',
  'cloudinary-storefront/iphone_back',
  'cloudinary-storefront/iphone_side',
];

// allow override via CLI args
const publicIds = process.argv.length > 2 ? process.argv.slice(2) : defaults;

(async () => {
  for (const public_id of publicIds) {
    console.log(`\n🔍 Applying Rekognition auto-tagging to "${public_id}"…`);

    try {
      // 4️⃣ call Admin API .update to trigger aws_rek_tagging
      const result = await cloudinary.api.update(public_id, {
        categorization: 'aws_rek_tagging',
        auto_tagging: 0.7, // tags ≥70% confidence
      });

      // 5️⃣ extract the Rekognition results and final tags
      const rekData = result.info?.categorization?.aws_rek_tagging?.data ?? [];
      const detected = rekData.map(
        (d) => `${d.tag}@${Math.round(d.confidence * 100)}%`
      );
      console.log(
        ' • Detected (with confidence):',
        detected.length ? detected : '[none]'
      );
      console.log(' • Final resource.tags:', result.tags);
    } catch (err) {
      console.error('❌ Error on', public_id, err.message || err);
    }
  }

  console.log('\n👍 All done.');
})();
