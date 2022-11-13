import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Results.module.css'
import SearchBar from '../components/SearchBar.jsx'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getCoursesAndProfs } from '../nebula-search'
import { ResultType, NebulaResultCard } from '../components/NebulaResultCard'
import Link from 'next/link'
import JupiterCard from '../components/JupiterCard.jsx'
import nebulaLogo from '../styles/nebula.png'
import 'semantic-ui-css/semantic.min.css'

export default function Results() {
    const [query, setQuery] = useState('')
    const [course, setCourse] = useState()
    const [prof, setProf] = useState()

    const router = useRouter();

    useEffect(() => {
        setQuery(router.query.query);
    }, [router.query]);

    useEffect(() => {
        if (query) {
            getCoursesAndProfs(query).then((res) => {
                console.log(res)
                setCourse(res.course)
                setProf(res.prof)
            })
        }
    }, [query])

    return (
        <div className={styles.container}>
            <Head>
                <title>{query ? query : "CometSearch"}</title>
                <meta name="description" content="Search UTD info" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <div className="results-top-bar">
                    <h1 className={styles.title + " results-title"}>
                        <Link href="/">
                            <s className='comet'>Comet</s>Search
                        </Link>
                    </h1>
                    <SearchBar query={query} />
                </div>
            </header>
            <main className={styles.main}>
                <div className="results-main">
                    <div className="results-left-pane">

                    </div>
                    <div className="results-right-pane">
                        {
                            course && <NebulaResultCard resultType={ResultType.COURSE} data={course} />
                        }
                        {
                            prof && <NebulaResultCard resultType={ResultType.PROF} data={prof} />
                        }
                        {/* <JupiterCard
                            orgs = {
                                [
                                    {name: "Nebula", url: "https://discord.gg/afdRbJY9", logo: nebulaLogo, description: "We're a Community of open source developers making student focused products"},
                                    {name: "ACM", url: "https://discord.gg/kJmvgTnt", logo: nebulaLogo, description: "Association of Computing Machinery"},
                                    {name: "AIS", url: "https://discord.gg/xyW9mvTJ", logo: nebulaLogo, description: "Artificial Intelligence Society"},
                                ]
                            }
                        />
                        <GuideCard
                            articles = {
                                [
                                    {title: "How to get Started at UTD", text: "'Get admitted'"},
                                    {name: "How to ace your exams", text: "'Dont be dumb'"},
                                    {name: "How and why you should worship our holy saviour TEMOC", text: "'Just Because'"},
                                ]
                            }
                        /> */}
                    </div>
                </div>
            </main>
        </div>
    )
}