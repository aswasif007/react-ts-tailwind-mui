import { Box, Typography } from '@mui/material';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { HomePage, LoginPage } from './pages';

import './App.css';
import { useContext } from 'react';
import { AuthContext } from './contexts';

function Private() {
  const location = useLocation();

  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;

  if (location.pathname === '/login') return <Navigate to="/home" />;

  return <Outlet />;
}

function App() {
  return (
    <Box className="flex flex-col w-full h-full">
      <Box className="text-center">
        <Typography variant="h5">- boilerplate -</Typography>
        <Typography variant="h4">
          React + Tailwind + MUI + TypeScript
        </Typography>
        <hr />
      </Box>
      <Box className="flex-grow">
        <BrowserRouter>
          <Routes>
            <Route path="/login" Component={LoginPage} />
            <Route path="/" Component={Private}>
              <Route path="/home" Component={HomePage} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </Box>
  );
}

export default App;
