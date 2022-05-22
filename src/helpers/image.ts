import { ImageKitTransform, buildImageKitURL } from '@site/libs';

export function getImgProps({
  src,
  widths,
  sizes,
  transform = {},
}: {
  /**
   * Pass the `src` here
   * - Url can be absolute or relative to the root imagekit endpoint
   * - `src` will be returned again
   */
  src: string;
  widths: number[];
  sizes: string[];
  /**
   * Used to transform the image, will be passed to `buildImageKitURL`
   */
  transform?: ImageKitTransform;
}) {
  const averageSize = Math.ceil(
    widths.reduce((prev, next) => prev + next) / widths.length,
  );
  return {
    sizes: sizes.join(', '),
    src: buildImageKitURL({
      src,
      width: averageSize,
      quality: 'auto',
      format: 'auto',
      ...transform,
    }),
    width: averageSize,
    srcSet: widths
      .map(width =>
        [
          buildImageKitURL({
            src,
            width,
            quality: 'auto',
            format: 'auto',
            ...transform,
          }),
          `${width}w`,
        ].join(' '),
      )
      .join(', '),
  };
}
