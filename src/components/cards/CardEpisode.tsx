import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { Episode } from '../../@types/serie';
import Link from 'next/link';
import Image from 'next/image'
type Props = {
    episode: Episode
}

const CardEpisode = ({ episode }: Props) => {
    return (
        <>

            <Card sx={{ display: 'flex', margin: 1, maxWidth: { xs: 1.0, sm: 300 }, maxHeight: { xs: 85, sm: 230 }, background: 'transparent' }} elevation={0}>
                <CardActionArea component={Link} href={`/watch/${episode.episodeKey}`}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' } }}>
                        {/*
                        <CardMedia
                            component="img"
                            sx={{ width: { xs: 150, sm: 1.0 }, maxHeight: { xs: 1.0, sm: 170 } }}
                            image={`${episode.episodeImg}`}
                        />
                            */
                        }
                        <CardMedia>
                            <Box sx={{ width: { xs: 150, sm: 1.0 }, maxHeight: { xs: 1.0, sm: 170 } }}>
                                <Image src={`${episode.episodeImg}`} width="0" height="0" sizes="100vw" style={{ width: '100%', height: '100%' }} alt={episode.description || ''} />
                            </Box>
                        </CardMedia>



                        <CardContent sx={{ maxHeight: { xs: 1.0, sm: 60 }, padding: 1 }}>
                            <Typography color="text.secondary" variant='subtitle2'>
                                Episódio {`${episode.episodeNum}`} | {episode.releasedDate}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden' align="left">
                                {episode.title}
                            </Typography>
                        </CardContent>
                    </Box>
                </CardActionArea>
            </Card>
        </>
    );
}

export default CardEpisode;