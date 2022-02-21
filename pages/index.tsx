import type {GetStaticProps} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import client from "../contentful";

const Home = ({title}: { title: string }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>My Blog</title>
            </Head>
            <main>{title}</main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const home = client.getEntries({
        content_type: 'mainPage'
    })

    return {
        props: {title: 'My Blog'}
    }
}

export default Home
