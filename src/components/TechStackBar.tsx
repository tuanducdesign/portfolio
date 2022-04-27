import { TechIcon, IconName } from './Icons';

export const TechStackBar = ({ technologies, title }: { technologies: IconName[]; title?: string }) => {
  return (
    <div className="flex gap-x-4 p-2 rounded-md mt-1 items-center">
      {title && <span className="font-bold flex-1 text-lg">{title}</span>}
      {technologies.map((t, idx) => (
        <span key={t + idx}>
          <TechIcon name={t} />
        </span>
      ))}
    </div>
  );
};
