'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, FormControl, TextField, Button, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { joiResolver } from '@hookform/resolvers/joi';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { LinearProgress } from '@mui/material';

import { ILogin } from '@/interfaces';
import { LoginValidators } from '@/validators';
import supabase from '@/config/superbaseClients';
import { IUser } from '@/interfaces';
import { Container } from '@mui/system';

const loginUser = async (user: IUser) => {
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, password')
    .eq('name', user.name);

  if (userError) {
    throw userError;
  }

  if (!userData || userData.length === 0) {
    throw new Error('User not found');
    return;
  }

  if (userData[0].password.trim() === user.password.trim()) {
    console.log('User authenticated');
    return {
      ...userData[0],
      id: userData[0].id,
    };
  } else {
    throw new Error('Incorrect password or name');
  }
};

const LoginP = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILogin>({
    mode: 'all',
    resolver: joiResolver(LoginValidators),
  });

  const router = useRouter();
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);

  const mutation = useMutation(loginUser, {
    onSuccess: data => {
      console.log('User authenticated');
      window.sessionStorage.setItem('userId', data?.id);
      setTimeout(
        () => {
          window.sessionStorage.removeItem('userId');
        },
        60 * 60 * 1000
      );
      // setIsLoggedIn?.(true);
      router.push('/author');
      setAlertMessage(null);
      reset();
    },
    onError: (error: any) => {
      setAlertMessage('Incorrect password or name');
    },
  });
  const handleLogin: SubmitHandler<ILogin> = async user => {
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
          onSubmit={handleSubmit(handleLogin)}
          sx={{ width: '70%', gap: 3 }}
        >
          <TextField
            label="Name"
            variant="outlined"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message as string}
          />
          <TextField
            label="Password"
            variant="outlined"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message as string}
          />

          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ padding: '12px' }}
            disabled={!isValid}
          >
            Login
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
};

export default LoginP;
