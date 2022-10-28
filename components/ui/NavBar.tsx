import { Button, Link, Spacer, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image';
import React, { FC } from 'react'
import NextLink from 'next/link'



export const NavBar: FC = () => {

  const { theme } = useTheme();
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '0px 20px',
      backgroundColor: theme?.colors.gray900.value,

    }}>
      <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" alt='icono aplicacion' width={70} height={70} />

      <NextLink href='/'>
        <Link>
          <Text color='white' h2>P</Text>
          <Text color='white' h3>okemon</Text>
        </Link>
      </NextLink>


      <Spacer css={{ flex: 1 }} />
      <NextLink href='/favoritos'>
        <Link css={{marginRight: '10px'}}>
          <Button color='gradient'>
          <Text color='white' >Favoritos</Text>

          </Button>

        </Link>
      </NextLink>


    </div>
  )
}

