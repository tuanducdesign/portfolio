import { ImageKitTransfrom, loadImageKit } from '@site/libs';

export function getImgProps({
  src,
  widths,
  sizes,
  transform = {},
}: {
  src: string;
  widths: number[];
  sizes: string[];
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
