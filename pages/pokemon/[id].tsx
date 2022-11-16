import confetti from 'canvas-confetti';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React, {  useEffect, useState } from 'react'
import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces'
import { getPokemonInfo, localFavorites } from '../../utils'

interface Props {
    pokemon: Pokemon
}

const PokemonPage:NextPage<Props> = ({pokemon}) => {
    /// Esta pagina se ejecuta en el backend

    const [isInFavorites, setIsInFavorites] = useState<boolean>();

    useEffect(()=>{
        setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
        // console.log('repeti');
    },[setIsInFavorites])

    const onToogleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites);
        if(!isInFavorites){
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: {
                    x:1,
                    y:0,
                }
            })
        }
    }



  return (
    <Layout title={pokemon.name}>
        <Grid.Container css={{marginTop: '5px'}} gap={2}>
            <Grid xs={12} sm={4}>
                <Card hoverable css={{padding: '30px'}}>
                    <Card.Body>
                        <Card.Image src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'} alt={pokemon.name} width="100%" height={200}/>
                    </Card.Body>
                </Card>
            </Grid>
            <Grid xs={12} sm={8}>
                <Card>
                    <Card.Header css={{display: 'flex', justifyContent:'space-between'}}>
                        <Text h2 transform='capitalize'>{pokemon.name}</Text>
                        <Button ghost={!isInFavorites}  onClick={onToogleFavorite} color="gradient" >
                            {isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos'}
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Text size={30}>Sprites:</Text>
                        <Container direction='row' display='flex' gap={0}>
                            <Image src={pokemon.sprites.front_default} alt={pokemon.name} 
                            width={100} height={100}
                            />
                             <Image src={pokemon.sprites.back_default} alt={pokemon.name} 
                            width={100} height={100}
                            />
                             <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} 
                            width={100} height={100}
                            />
                             <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} 
                            width={100} height={100}
                            />
                        
                        </Container>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
    </Layout>
  )
  
}
/// Aqui se generan los paths
export const getStaticPaths:GetStaticPaths = async(ctx) =>{
    
    const pokemon151 = [...Array(151)].map((value, index)=>`${index + 1}`);

    return{
        paths: pokemon151.map(id =>({
            params: { id}
        })),
        // fallback: false cuando no encuentra el id manda a la pageina 404
        fallback: 'blocking'

    }
}

/// Aqui las paginas que se generan en filsystem
export const getStaticProps: GetStaticProps = async({params}) =>{
    const {id} = params as {id:string};
    const pokemon = await getPokemonInfo(id);
    
    if(!pokemon){
        return { 
            redirect:{
            destination: '/', 
            permanent: false}}
    }

    return{
       props:{
        pokemon
       },
       revalidate: 86400,
       redirect: '/'

    }
}



export default PokemonPage