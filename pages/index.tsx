import type {GetStaticProps} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import client from "../contentful";

const Home = ({home}: { home: any }) => {
    console.log('home --->', home.fields.heading);
    return (
        <div className={styles.container}>
            <Head>
                <title>{home.fields.heading}</title>
            </Head>
            {/*<main>{home.underHeading.content.map(el => e)}</main>*/}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const home = await client.getEntries({
        content_type: 'mainPage',
        limit: 1
    })

    const [homePage] = home.items

    return {
        props: {title: 'My Blog', home: homePage}
    }
}

export default Home
