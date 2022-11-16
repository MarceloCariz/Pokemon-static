import { useEffect, useState } from "react";
import { Grid, Card, Button, Container , Text, Image} from "@nextui-org/react";
import confetti from "canvas-confetti";
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, PokemonListResponse } from "../../interfaces"
import { getPokemonInfo, localFavorites } from "../../utils";

interface Props {
    pokemon: Pokemon;
}


const PokemonByNamePage:NextPage<Props> = ({pokemon}) => {
    
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
                        <Text  transform='capitalize'>{pokemon.name}</Text>
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


export const  getStaticPaths :GetStaticPaths = async(ctx) =>{

    const {data}=  await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonNames: string[] = data.results.map((pokemon)=>(pokemon.name))
    return {
        paths: pokemonNames.map((name)=>({
            params: {name}
        })),
        fallback: 'blocking'
    }
}

export const getStaticProps:GetStaticProps = async({params}) =>{
    const {name} = params as {name:string};
    
    const pokemon = await getPokemonInfo(name);
    
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

    }
}

export default PokemonByNamePage;
