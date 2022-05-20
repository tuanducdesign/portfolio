import clsx from 'clsx';
import {
  cloneElement,
  ImgHTMLAttributes,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

export const BlurrableImage = ({
  img,
  placeholder,
  ...props
}: JSX.IntrinsicElements['div'] & {
  img: JSX.Element & ReactElement<ImgHTMLAttributes<HTMLImageElement>>;
  placeholder: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgElRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgElRef.current) return;
    if (imgElRef.current.complete) {
      setLoaded(true);
      return;
    }

    let current = true;
    imgElRef.current.addEventListener('load', () => {
      if (current) setLoaded(true);
    });

    return () => {
      current = false;
    };
  }, []);

  const clonedImgEl = cloneElement(img, {
    ref: imgElRef,
    className: clsx(img.props.className, 'transition-opacity duration-300', {
      'opacity-0': !loaded,
    }),
  });

  return (
    <div {...props}>
      <img
        src={placeholder}
        alt={img.props.alt}
        width={img.props.width}
        height={img.props.height}
        className={img.props.className}
      />
      <div className={clsx(img.props.className, 'backdrop-blur-xl')} />
      {clonedImgEl}
    </div>
  );
};
