import React from 'react';
import Box from '@mui/material/Box';
import { Pagination } from '@mui/material';

interface IProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const MyPagination: React.FC<IProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: '60px' }}>
      <Pagination
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
        count={totalPages || 0}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};
