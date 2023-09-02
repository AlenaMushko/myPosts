import { Box, Container } from '@mui/material';
import React, { ReactNode } from 'react';

interface CenteredContainerProps {
  children: ReactNode;
}

export const MyContainer: React.FC<CenteredContainerProps> = ({ children }) => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
          mt: 7,
          gap: 5,
        }}
      >
        {children}
      </Box>
    </Container>
  );
};
