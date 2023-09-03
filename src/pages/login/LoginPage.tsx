import { Box, Input, TextField, Typography } from '@mui/material';
import { Button, Form } from '../../design';

function LoginPage() {
  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <Box className="h-full flex flex-col justify-center items-center">
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 border rounded"
      >
        <Typography variant="h6" className="text-center" sx={{ lineHeight: 1 }}>
          Login
        </Typography>
        <TextField label="Username" />
        <TextField label="Password" type="password" />
        <Button label="Submit" type="submit" variant="contained" />
      </Form>
    </Box>
  );
}

export default LoginPage;
