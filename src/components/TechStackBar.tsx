import { TechIcon, IconName } from './Icons';

export const TechStackBar = ({ technologies, title }: { technologies: IconName[]; title?: string }) => {
  return (
    <div className="flex gap-x-4 dark:bg-gray-100 bg-gray-200 p-2 rounded-md mt-4 items-center">
      {title && <span className="dark:text-gray-700 text-gray-900 font-bold flex-1 text-lg">{title}</span>}
      {technologies.map((t, idx) => (
        <span key={t + idx}>
          <TechIcon name={t} />
        </span>
      ))}
    </div>
  );
};
