import { Alert, Box, TextField, Typography } from '@mui/material';
import { Button, Form } from '../../design';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserResource } from '../../resources';
import { useRequester } from '../../hooks';

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const login = useRequester<UserResource>({
    onSubmit: (data: any) => UserResource.login(data.username, data.password),
    onSuccess: (loggedUser: UserResource) => {
      setUser(loggedUser);
      navigate('/home');
    },
    onError: console.log,
  });

  return (
    <Box className="h-full flex flex-col justify-center items-center">
      <Form
        onSubmit={login.submit}
        className="flex flex-col gap-4 p-8 border rounded"
        names={['email', 'password']}
        disabled={login.loading}
      >
        <Typography variant="h6" className="text-center" sx={{ lineHeight: 1 }}>
          Login
        </Typography>
        <TextField label="Username" name="email" />
        <TextField label="Password" type="password" name="password" />
        <Button label="Submit" type="submit" variant="contained" />
        {login.failed && <Alert severity="error">Login failed!</Alert>}
      </Form>
    </Box>
  );
}

export default LoginPage;
