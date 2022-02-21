import type {GetStaticProps} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import client from "../contentful";
import {IMainPage, IMainPageFields} from "../contentful-types";

const Home = ({home}: { home: IMainPage }) => {
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
    const home = await client.getEntries<IMainPageFields>({
        content_type: 'mainPage',
        limit: 1
    })
    const [homePage] = home.items

    return {
        props: {title: 'My Blog', home: homePage}
    }
}

export default Home
