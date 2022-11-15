import { Grid } from "@nextui-org/react"
import { FavoriteCardPokemon } from "./";

interface Props {
    pokemons: number[];
}

export const FavoritePokemon = ({pokemons}:Props) => {
  return (
    <Grid.Container gap={2} direction="row" justify='flex-start'>
    {
      pokemons.map(id => (
        <FavoriteCardPokemon key={id} id={id}/>
      ))
    }
</Grid.Container>
  )
}
