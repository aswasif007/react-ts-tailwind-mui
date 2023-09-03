import { Button } from '@mui/material';

type Props = {
  label: React.ReactNode;
} & React.ComponentProps<typeof Button>;

function MyButton({ label, ...props }: Props) {
  return <Button {...props}>{label}</Button>;
}

export default MyButton;
