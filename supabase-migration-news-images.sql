-- Add images JSONB column for multiple image support
ALTER TABLE news ADD COLUMN IF NOT EXISTS images JSONB NOT NULL DEFAULT '[]';

-- Backfill: copy existing image_url into images array as main image
UPDATE news
SET images = jsonb_build_array(
  jsonb_build_object(
    'url', image_url,
    'order', 0,
    'isMain', true
  )
)
WHERE image_url IS NOT NULL AND image_url != ''
  AND (images IS NULL OR images = '[]'::jsonb);