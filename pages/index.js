import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearchBar from '../components/SearchBar.jsx'
import { useState } from 'react'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>CometSearch</title>
                <meta name="description" content="Search UTD info" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    <s className='comet'>Comet</s>Search
                </h1>

                <SearchBar/>
            </main>
        </div>
    )
}
