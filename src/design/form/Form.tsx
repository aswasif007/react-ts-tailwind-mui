import classNames from 'classnames';

type Props = {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  className?: string;
  names?: string[];
  disabled?: boolean;
};

function Form({ onSubmit, children, className, names = [], disabled }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {};

    for (const name of names) {
      // @ts-ignore
      data[name] = event.target.elements[name]?.value;
    }

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(className, {
        'pointer-events-none': disabled,
        'opacity-50': disabled,
      })}
    >
      {children}
    </form>
  );
}

export default Form;
