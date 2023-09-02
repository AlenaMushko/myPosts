'use client';
import React, { ChangeEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Box, FormControl, TextField, Button, MenuItem, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import SendIcon from '@mui/icons-material/Send';
import { useMutation } from 'react-query';
import { LinearProgress } from '@mui/material';

import supabase from '@/config/superbaseClients';
import { ISignup, IUser } from '@/interfaces';
import { SignupValidators } from '@/validators';
import { Container } from '@mui/system';

const signupUser = async (user: IUser) => {
  const { data, error } = await supabase.from('users').insert([user]);

  if (error) {
    throw error;
  }
  return data;
};
const SignupP = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignup>({
    mode: 'all',
    resolver: joiResolver(SignupValidators),
  });

  const router = useRouter();
  const [type, setType] = React.useState('');
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const mutation = useMutation(signupUser, {
    onSuccess: () => {
      router.push('/login');
      setAlertMessage(null);
      reset();
    },
    onError: (error: any) => {
      if (error.code === '23505') {
        setAlertMessage('This name already exists. Please choose another one!');
      }
    },
  });

  const handleSignup: SubmitHandler<ISignup> = user => {
    mutation.mutate(user as unknown as IUser);
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100vw',
          mt: 7,
          gap: 5,
        }}
      >
        {mutation.isLoading && <LinearProgress color="success" />}
        {alertMessage && (
          <Alert variant="filled" severity="info">
            {alertMessage}
          </Alert>
        )}
        <FormControl
          component="form"
          onSubmit={handleSubmit(handleSignup)}
          sx={{ width: '70%', gap: 3 }}
        >
          <TextField
            label="Name"
            variant="outlined"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            variant="outlined"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            variant="outlined"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            select
            label="Type"
            {...register('type')}
            value={type}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.type}
            helperText={errors.type?.message}
          >
            <MenuItem value={'author'}>Author</MenuItem>
            <MenuItem value={'commentator'}>Commentator</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" endIcon={<SendIcon />} disabled={!isValid}>
            Signup
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default SignupP;
