import { TechIcon, IconName } from './Icons';

export const TechStackBar = ({ technologies, title }: { technologies: IconName[]; title?: string }) => {
  return (
    <div className="flex gap-x-4 bg-gray-100 p-2 rounded-md mt-4 items-center">
      {title && <span className="text-gray-700 font-bold flex-1 text-lg">{title}</span>}
      {technologies.map((t, idx) => (
        <span key={t + idx}>
          <TechIcon name={t} />
        </span>
      ))}
    </div>
  );
};
