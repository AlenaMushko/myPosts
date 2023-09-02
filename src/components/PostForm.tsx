'use client';
import React from 'react';
import { Box, Button, FormControl, TextareaAutosize, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IPost } from '@/interfaces';
import { joiResolver } from '@hookform/resolvers/joi';
import { PostValidators } from '@/validators';
import supabase from '@/config/superbaseClients';
import { styled } from '@mui/system';
import { useMutation } from 'react-query';

const StyledTextarea = styled(TextareaAutosize)(` padding: 8px;`);

interface IProps {
  userId: number;
  refetch: Function;
}

const PostForm: React.FC<IProps> = ({ userId, refetch }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IPost>({
    mode: 'all',
    resolver: joiResolver(PostValidators),
  });

  const addPostMutation = useMutation(
    async (post: IPost) => {
      const newPost = {
        ...post,
        author_id: userId,
      };

      const { data, error } = await supabase.from('posts').insert([newPost]);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      //  onMutate, onError, onSuccess
    }
  );

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
        width: '100vw',
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

export default PostForm;
