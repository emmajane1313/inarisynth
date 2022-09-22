import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import { Landing } from '../modules/landing/Landing'

const Home: NextPage = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Inari Synth</title>
        <meta name="description" content="Inari Synth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </div>
  )
}

export default Home
