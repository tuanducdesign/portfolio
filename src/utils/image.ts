import { buildImageKitURL } from '@site/libs';

export async function getBlurPlaceholder(src: string) {
  const url = buildImageKitURL({
    src,
    width: 1000,
    blur: 10,
    quality: 10,
  });
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mime = res.headers.get('Content-Type') ?? 'image/webp';
  return `data:${mime};base64,${base64}`;
}