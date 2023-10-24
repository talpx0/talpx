'use client'
import { useEffect, useState } from "react";

const letters = ['T', 'A', 'L', 'P', 'X'];

export const LoadingState = () => {
  return (
    <div className="flex space-x-3 items-center justify-center min-h-screen w-full">
      {letters.map((letter, index) => (
        <span
          key={letter}
          className="text-sm animate-fade text-slate-500 dark:text-slate-400"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};



interface LoadingBoxProps {
  element: JSX.Element;
}

export const LoadingBox: React.FC<LoadingBoxProps> = ({ element }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
  }, []);

  if (!mounted) {
      return <LoadingState />;
  }

  return (
      <>
          {element}
      </>
  );
}