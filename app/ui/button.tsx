import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, disabled, ...rest }: ButtonProps) {
  const isValid = disabled;
  return (
    <button
      {...rest}
      className={clsx(
        `flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary) active:bg-(--primary) aria-disabled:cursor-not-allowed aria-disabled:opacity-50 
        ${isValid? "bg-(--primary) hover:bg-(--primary-30) text-(--primary-foreground)" : "border border-(--primary-30) border-opacity-10 bg-(--muted) text-(--muted-foreground) cursor-not-allowed"}`,
        className,
      )}
    >
      {children}
    </button>
  );
}
