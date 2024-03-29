import { Box, Card, CardContent, CardMedia, Chip, Grid, Icon, IconButton, Typography } from "@mui/material";
import { Serie } from "../../@types/serie";
import { FavoriteButton } from "../buttons/FavoriteButton";
import Image from 'next/image'
import Link from "next/link";


type Props = {
    serie: Serie
}
export default function CardSerie({ serie }: Props) {
    return (
        <>
            <Card sx={{ display: 'flex', borderRadius: 3, background: 'transparent' }} elevation={0}>
                <Box sx={{ display: 'flex', pt: 3 }}>
                    <Box sx={{ display: 'flex', pl: 1, pr: 1, flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'start' } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {
                                /*
                                
                            <CardMedia
                                sx={{ width: 220, height: 330 }}
                                image={`${serie.posterImg}`}
                                component="img"
                                alt={'imagem do anime' + serie.title || ''}
                                >
                            </CardMedia>
                                */
                            }
                            <CardMedia
                                sx={{ width: 220, height: 330 }}
                            >
                                <Image src={`${serie.posterImg}`} width="0" height="0" sizes="100vw" style={{ width: '100%', height: 'auto' }} alt={serie.title || ''} />

                            </CardMedia>


                            <IconButton color='info' size="small">
                                <Icon fontSize="medium">star</Icon> {serie.rating}
                            </IconButton>
                            <FavoriteButton serieKey={serie.serieKey || ''} onlyIcon={false} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' } }}>
                                    <Typography sx={{ textAlign: { xs: 'center', md: 'start' } }} component="div" variant="h5">
                                        {serie.title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5, textAlign: { xs: 'center', md: 'start' } }} color="text.secondary" variant='subtitle2'>
                                        {serie.releasedDate}
                                    </Typography>
                                    <Grid>
                                        {serie.categories?.map((name, key) =>
                                                <Chip key={key} label={name} size="small" sx={{ m: 0.5 }}  clickable  component={Link} href={'/search/' + name.toLowerCase()}/>
                                        )}
                                    </Grid>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" mt={2} sx={{ whiteSpace: "pre-line" }}>
                                        {serie.description}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </>
    );
}