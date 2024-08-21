import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationGrid({ count, page, onPageChange }) {
    return (
        <Stack spacing={1}>
            <Pagination
                count={count}
                page={page}
                onChange={(event, value) => onPageChange(value)}
                variant="outlined"
                shape="rounded"
            />
        </Stack>
    );
}