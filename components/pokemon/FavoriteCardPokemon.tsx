

import { Grid, Card } from '@nextui-org/react'
import  { useRouter } from 'next/router'

export const FavoriteCardPokemon = ({id}:{id:number}) => {

    const router = useRouter();

    const onFavoriteClicked = () =>{
        // Router.push(`/pokemon/${id}`);
        router.push(`/pokemon/${id}`)
    }

  return (
    <Grid onClick={onFavoriteClicked} xs={6} sm={3} md={2} xl={1} >
        <Card hoverable clickable css={{padding:10}}>
        <Card.Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`} 
        width={'100%'} height={140}/>
        </Card>
    </Grid>
  )
}
