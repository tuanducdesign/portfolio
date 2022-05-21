import { ImageKitTransfrom, loadImageKit } from '@site/libs';

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
   * Used to transform the image, will be passed to `loadImageKit`
   */
  transform?: ImageKitTransfrom;
}) {
  const averageSize = Math.ceil(
    widths.reduce((prev, next) => prev + next) / widths.length,
  );
  return {
    sizes: sizes.join(', '),
    src: loadImageKit({
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
          loadImageKit({
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
