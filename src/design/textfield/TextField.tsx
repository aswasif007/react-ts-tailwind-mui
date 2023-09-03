import { TextField } from '@mui/material';

type Props = {
  label: string;
};

function MyTextField({ label, ...props }: Props) {
  return <TextField {...props} />;
}

export default MyTextField;
