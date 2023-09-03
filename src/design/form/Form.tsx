type Props = {
  onSubmit: () => void;
  children: React.ReactNode;
  className?: string;
};

function Form({ onSubmit, children, className }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}

export default Form;
