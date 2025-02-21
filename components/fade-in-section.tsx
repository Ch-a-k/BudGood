'use client';

import { useInView } from 'react-intersection-observer';
import cn from 'classnames';

export { FadeInSection };

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
}

function FadeInSection({ children, className }: FadeInSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-opacity duration-1000',
        inView ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      {children}
    </div>
  );
}
