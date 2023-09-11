import React from "react";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

const Post = () => {
    const navigate = useNavigate();
    const params = useParams();
    const queryClient = new QueryClient();

    function FetchData() {
        const { isLoading, error, data, isFetching } = useQuery({
            queryKey: ["respData"],
            queryFn: () =>
                axios
                    .get(
                        "https://jsonplaceholder.typicode.com/posts/" +
                            params.id
                    )
                    .then((response) => response.data),
        });
        if (isLoading && isFetching) return <>'Загрузка...'</>;
        if (error instanceof Error) return <>{error.message}</>;

        return (
            <Container>
                <Typography variant="h3">{data.title}</Typography>
                <Typography variant="body2">{data.body}</Typography>
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Назад
                </Button>
            </Container>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <FetchData />
        </QueryClientProvider>
    );
};

export { Post };
