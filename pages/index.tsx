import { Card, Grid, Image, Row, Text } from '@nextui-org/react';
import type { GetStaticProps, NextPage } from 'next'
import { pokeApi } from '../api'
import {Layout} from '../components/layouts'
import { PokemonCard } from '../components/pokemon';
import { PokemonListResponse, SmallPokemon } from '../interfaces'


interface Props{
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) => {
  return (
    <Layout title='Listado de Pokemon'>
      <Image src="/img/banner.png" width={200} height={150}/>
     <Grid.Container gap={2} justify='flex-start'> 
      {
        pokemons.map((pokemon)=>(
         <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))
      }
     </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async(ctx)=>{
  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  const pokemons: SmallPokemon[] =  data.results.map((poke,i)=>({
    ...poke,
    id: i+1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
  }))
  return{
    props: {
      pokemons: pokemons
    }
  }
}

export default HomePage
