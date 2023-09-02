import React from 'react';
import { Typography, Grid } from '@mui/material';

interface LabeledTextProps {
  label: string;
  value: string | number | null;
  marginLeft?: string;
}

export const MyTypography: React.FC<LabeledTextProps> = ({ label, value, marginLeft = '12px' }) => (
  <Grid item xs={12}>
    <Typography
      component="div"
      sx={{ display: 'inline', fontWeight: 'bold' }}
      variant="body2"
      color="text.primary"
    >
      {label}:
    </Typography>
    <Typography
      component="div"
      sx={{ display: 'inline', marginLeft }}
      variant="body2"
      color="text.primary"
    >
      {value}
    </Typography>
  </Grid>
);
