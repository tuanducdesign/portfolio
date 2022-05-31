export const IMAGEKIT_BASE_URL = `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID}`;

export type ImageKitTransform = {
  width?: string | number;
  height?: string | number;
  format?: string;
  aspectRatio?: string;
  blur?: number;
  quality?: number | string;
};

export const buildImageKitURL = ({
  src,
  width,
  height,
  quality,
  blur,
  format,
  aspectRatio,
}: {
  src: string;
} & ImageKitTransform) => {
  if (src.startsWith(IMAGEKIT_BASE_URL)) {
    src = src.slice(IMAGEKIT_BASE_URL.length);
  }
  if (src.startsWith('/')) {
    src = src.slice(1);
  }
  const params: string[] = [];
  if (width) {
    params.push(`w-${width}`);
  }
  if (height) {
    params.push(`h-${height}`);
  }
  if (quality) {
    params.push(`q-${quality}`);
  }
  if (blur) {
    params.push(`bl-${blur}`);
  }
  if (format) {
    params.push(`f-${format}`);
  }
  if (aspectRatio) {
    const [w, h] = aspectRatio.split(':');
    params.push(['ar', w, h].join('-'));
  }
  let url = `${IMAGEKIT_BASE_URL}/${src}`;
  if (params.length > 0) {
    url += `?tr=${params.join(',')}`;
  }
  return url;
};
