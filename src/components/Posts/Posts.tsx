import React, { useState } from 'react'
import axios from "axios";
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import {
    Pagination,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

type Items = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const Posts = () => {
    const navigate = useNavigate();
    const queryClient = new QueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    function FetchData() {
        const { isLoading, error, data, isFetching } = useQuery({
            queryKey: ["respData"],
            queryFn: () =>
                axios
                    .get("https://jsonplaceholder.typicode.com/posts/")
                    .then((response) => response.data),
        });
        if (isLoading && isFetching) return <>'Загрузка...'</>;
        if (error instanceof Error) return <>{error.message}</>;

        const pagesCount = data.length / postsPerPage;
        const posts = data.slice(
            (currentPage - 1) * postsPerPage,
            (currentPage - 1) * postsPerPage + postsPerPage
        );

        return (
            <>
                <TableContainer
                    component={Paper}
                    sx={{ margin: "0 auto", width: "1170px" }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>user id</TableCell>
                                <TableCell>id</TableCell>
                                <TableCell>title</TableCell>
                                <TableCell>content</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts.map((item: Items) => (
                                <TableRow
                                    key={item.id}
                                    hover
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => {
                                        navigate(`/${item.id}`)
                                    }}
                                >
                                    <TableCell>{item.userId}</TableCell>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>
                                        {item.body.slice(0, 40)}...
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    sx={{
                        display: "flex",
                        alignContent: "center",
                        marginTop: "20px",
                    }}
                >
                    <Pagination
                        count={pagesCount}
                        page={currentPage}
                        defaultPage={currentPage}
                        variant="outlined"
                        shape="rounded"
                        onChange={(event, page) => {
                            setCurrentPage(page);
                        }}
                        sx={{ margin: "0 auto" }}
                    />
                </Box>
            </>
        );
    }

  return (
    <QueryClientProvider client={queryClient}>
    <FetchData />
</QueryClientProvider>
  )
}

export { Posts }