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
        `flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] active:bg-[var(--primary)] aria-disabled:cursor-not-allowed aria-disabled:opacity-50 
        ${isValid? "bg-[var(--primary)] hover:bg-[var(--primary-30)]" : "border border-[var(--primary-30)] border-opacity-10 bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed"}`,
        className,
      )}
    >
      {children}
    </button>
  );
}
