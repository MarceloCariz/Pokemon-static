import Head from "next/head"
import { FC } from "react"
import { NavBar } from "../ui";

type Props ={
    children: React.ReactNode;
    title?: string;
}

export const Layout:FC<Props> = ({children, title}) => {
  return (
    <>
        <Head>
            <title>{title || 'Pokemon App'}</title>
            <meta name="author" content="Marcelo Cariz"/>
            <meta name="description" content={`Informacion sobre el pokemon ${title}`}/>
            <meta name="keyword" content={`${title}, pokemon, pokedex`}/>

        </Head>
        <NavBar/>
        <main style={{
          padding: '0px 20px'
        }}>
            {children}
        </main>
    </>
  )
}

