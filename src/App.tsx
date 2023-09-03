import { Box, Typography } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage } from './pages';

import './App.css';

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
            <Route path="/home" Component={HomePage} />
            <Route path="/login" Component={LoginPage} />
          </Routes>
        </BrowserRouter>
      </Box>
    </Box>
  );
}

export default App;
