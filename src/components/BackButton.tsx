import Router from 'next/router';
import { Button } from './Button';
import { ChevronLeft } from './Icons';

export const BackButton = () => {
  return (
    <Button
      color="unstyled"
      onClick={Router.back}
      className="inline-flex items-center gap-x-4 group !p-0"
    >
      <ChevronLeft className="group-hover:-translate-x-2 transition-transform duration-300" />
      <span>Back</span>
    </Button>
  );
};
