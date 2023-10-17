const letters = ['T', 'A', 'L', 'P', 'X'];

const Loading = () => {
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

export default Loading;