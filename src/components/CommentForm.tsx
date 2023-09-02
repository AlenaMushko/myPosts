'use client';
import React, { ChangeEvent } from 'react';
import { Button, FormControl, MenuItem, TextareaAutosize, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IComment } from '@/interfaces';
import { joiResolver } from '@hookform/resolvers/joi';
import supabase from '@/config/superbaseClients';
import { styled } from '@mui/system';
import { useMutation } from 'react-query';
import { CommentValidators } from '@/validators/CommentValidators';
import { useRouter } from 'next/navigation';
import { MyContainer } from '@/components/MyContainer';

const StyledTextarea = styled(TextareaAutosize)(` padding: 8px;`);

interface IProps {
  post_id: number;
  user_name: string;
  refetch: Function;
}

const CommentForm: React.FC<IProps> = ({ user_name, post_id, refetch }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm<IComment>({
    mode: 'all',
    resolver: joiResolver(CommentValidators),
  });

  const [rating, setRating] = React.useState(1);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(+event.target.value);
  };

  const addCommentMutation = useMutation(
    async (comment: IComment) => {
      const newComment = {
        ...comment,
        author_name: user_name,
        post_id: post_id,
      };

      const { data, error } = await supabase.from('comments').insert([newComment]);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    {
      onSuccess: () => {
        refetch();
        reset();
        router.back();
      },
      onError: error => {
        console.error('Error adding comment:', error);
      },
    }
  );

  const addComment: SubmitHandler<IComment> = async comment => {
    try {
      await addCommentMutation.mutateAsync({
        ...comment,
        author_name: user_name,
        post_id: post_id,
      });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <MyContainer>
      <FormControl
        component="form"
        onSubmit={handleSubmit(addComment)}
        sx={{ width: '70%', gap: 3 }}
      >
        <TextField
          select
          label="Rating"
          {...register('rating')}
          value={rating}
          onChange={handleChange}
          variant="outlined"
        >
          <MenuItem value={'1'}>1</MenuItem>
          <MenuItem value={'2'}>2</MenuItem>
          <MenuItem value={'3'}>3</MenuItem>
          <MenuItem value={'4'}>4</MenuItem>
          <MenuItem value={'5'}>5</MenuItem>
        </TextField>

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
          Add Comment
        </Button>
      </FormControl>
    </MyContainer>
  );
};

export default CommentForm;
