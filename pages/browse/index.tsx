import * as React from 'react';
import { Box, CircularProgress, Container, Pagination } from "@mui/material";
import { GetServerSideProps, NextPage } from 'next';
import GridCardPoster from '../../src/components/cards/GridCardPoster';
import { Context } from "vm";
import Head from 'next/head';
import { Result } from '../../src/@types/result';
import { useRouter } from 'next/router';
import { getSeries } from '../../src/services/api';


export const getServerSideProps: GetServerSideProps = async (context: Context) => {
    const order: string = context.query.order || 'most_view'
    const sort: string = context.query.sort || 'asc'
    const page: number = context.query.page || '1'
    const result: Result = await getSeries(undefined, page, 24, order, sort)
    const pageTitles = {
        "most_view" : "Mais Populares",
        "title" : "Ordem Alfabética",
        "latest_release" : "Ultimos Lançamentos",
        "created_date" : "Ultimos Lançamentos"
    }
    return {
        props: {
            result: result,
            title: pageTitles[order as keyof typeof pageTitles]
        }
    }
}

type Props = {
    result: Result,
    title: string
}

const List: NextPage<Props> = ({ result, title }: Props) => {
    const router = useRouter()
    
    function handlePage(event: any, value: any){
        const query = router.query
        query.page = value
        router.replace({
            query: query
        })
    }
    if (router.isFallback) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        )
    }
    else {
        return (
            <>
                <Head>
                    <title>{`${title} - ${process.env.NEXT_PUBLIC_WEBSITE_TITLE}`}</title>
                </Head>
                <Box sx={{pt:5}}>
                    <Container maxWidth='lg'>
                        {
                            result.totalResults == 0 && <h3>Nenhum resultado encontrado</h3>
                        }
                        {
                            result.results && 
                            <>
                                <h2>
                                    {title}
                                </h2>
                                <GridCardPoster arrayCards={result.results} ></GridCardPoster>
                                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Pagination count={result.totalPages} page={result.currentPage} onChange={handlePage} />
                                </Box>
                            </>
                        }
                    </Container>
                </Box>
            </>
        )
    }
}


export default List