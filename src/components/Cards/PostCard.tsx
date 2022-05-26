import { getImgProps } from '@site/utils';
import { Post } from '@content';
import Link from 'next/link';
import { BlurrableImage } from '../BlurrableImage';
import { Card } from './Card';

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
});

export const PostCard = ({
  post,
}: {
  post: Pick<Post, 'slug' | 'title' | 'cover' | 'publishedAt'> & {
    placeholder: string;
  };
}) => {
  return (
    <Link href={'/blog/' + post.slug} passHref>
      <a>
        <Card>
          <BlurrableImage
            placeholder={post.placeholder}
            className="aspect-w-3 aspect-h-4"
            img={
              <img
                alt={post.title}
                {...getImgProps({
                  src: post.cover.path,
                  widths: [post.cover.width ?? 420, 840, 1100],
                  sizes: [
                    '(max-width: 560px) 100vw',
                    '(min-width: 561px) and (max-width: 840px) 45vw',
                    '(min-width: 841px) 30vw',
                    (post.cover.width ?? 420) + 'px',
                  ],
                })}
                height={post.cover.height}
                width={post.cover.width}
                loading="lazy"
                className="max-w-full w-full object-cover rounded-md"
              />
            }
          />
          <p className="text-neutral font-semibold text-lg my-3">
            {dateFormatter.format(new Date(post.publishedAt))}
          </p>
          <h3 className="font-bold text-2xl">{post.title}</h3>
          {/* <ul className="flex gap-2"> 
            {meta.tags.map((tag, idx) => (
              <li key={tag + idx} className="p-1">
                <span className="text-secondary dark:text-primary">#</span>
                <span>{tag}</span>
              </li>
            ))}
          </ul> */}
        </Card>
      </a>
    </Link>
  );
};
