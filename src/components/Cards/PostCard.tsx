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
                  widths: [420, 840, 1100, post.cover.width],
                  sizes: [
                    '(max-width: 520px) 90vw',
                    '(min-width: 521px) and (max-width: 840px) 45vw',
                    '(min-width: 841px) and (max-width: 1100px) 30vw',
                    `${post.cover.width}px`,
                  ],
                })}
                height={post.cover.height}
                loading="lazy"
                className="max-w-full w-full object-cover rounded-md"
              />
            }
          />
          <p className="text-neutral font-semibold text-lg my-3">
            {dateFormatter.format(new Date(post.publishedAt))}
          </p>
          <h3 className="font-bold text-2xl">{post.title}</h3>
        </Card>
      </a>
    </Link>
  );
};
