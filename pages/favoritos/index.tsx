import { Card, Grid } from '@nextui-org/react';
import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { Layout } from '../../components/layouts'
import { FavoritePokemon } from '../../components/pokemon/FavoritePokemon';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';

const FavoritesPage:NextPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])
  
  useEffect(()=>{
    setFavoritePokemons(localFavorites.pokemons);
  },[])

  return (
    <Layout title="Pokemons - Favoritos">
      {
        favoritePokemons.length === 0
        ? (<NoFavorites/>) :
        (
          <FavoritePokemon pokemons={favoritePokemons}/>
        )
      }
    </Layout>
  )
}
export default FavoritesPage;