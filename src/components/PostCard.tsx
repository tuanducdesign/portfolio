import { Post } from '@site/types';
import Link from 'next/link';

export const PostCard = ({ meta }: Pick<Post, 'meta'>) => {
  return (
    <Link href={'/blog/' + meta.slug} passHref>
      <a className="p-1 rounded-lg cursor-pointer hover:ring-offset-8 hover:ring-blue-text dark:hover:ring-yellow-border ring-2 ring-transparent dark:ring-offset-black-primary transition-all">
        <h1 className="font-bold text-xl">{meta.title}</h1>
        <p className="text-gray-400">{meta.description}</p>
        <ul className="flex gap-2">
          {meta.tags.map((tag, idx) => (
            <li key={tag + idx} className="p-1">
              <span className="text-yellow-border dark:text-blue-text">#</span>
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      </a>
    </Link>
  );
};
