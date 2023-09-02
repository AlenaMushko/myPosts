'use client';
import React from 'react';
import { Box, Button, FormControl, TextareaAutosize, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { styled } from '@mui/system';
import { useMutation } from 'react-query';

import { IPost } from '@/interfaces';
import { PostValidators } from '@/validators';
import supabase from '@/config/superbaseClients';
import { useUser } from '@/hooks';

const StyledTextarea = styled(TextareaAutosize)(` padding: 8px;`);

interface IProps {
  userId: number;
  refetch: Function;
}

export const PostForm: React.FC<IProps> = ({ userId, refetch }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IPost>({
    mode: 'all',
    resolver: joiResolver(PostValidators),
  });

  const { data: user } = useUser();

  const addPostMutation = useMutation(async (post: IPost) => {
    const newPost = {
      ...post,
      author_id: userId,
      author_name: user?.name,
    };

    const { data, error } = await supabase.from('posts').insert([newPost]);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  });

  const addPost: SubmitHandler<IPost> = async post => {
    try {
      await addPostMutation.mutateAsync(post);
      refetch();
      reset();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
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
      <FormControl component="form" onSubmit={handleSubmit(addPost)} sx={{ width: '70%', gap: 3 }}>
        <TextField
          label="Title"
          variant="outlined"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message as string}
        />
        <StyledTextarea
          {...register('body')}
          placeholder="Enter your message"
          name="body"
          minRows={4}
        />

        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ padding: '12px' }}
          disabled={!isValid}
        >
          Add Post
        </Button>
      </FormControl>
    </Box>
  );
};
