import { TechIcon, IconName } from './Icons';

export const TechStackBar = ({
  technologies,
  title,
}: {
  technologies: IconName[];
  title?: string;
}) => {
  return (
    <div className="flex p-2 gap-2 rounded-md mt-1 md:items-center flex-col md:flex-row">
      {title && <span className="font-bold flex-1 text-lg">{title}</span>}
      <div className="flex gap-2 justify-end">
        {technologies.map((t, idx) => (
          <span key={t + idx}>
            <TechIcon name={t} />
          </span>
        ))}
      </div>
    </div>
  );
};
