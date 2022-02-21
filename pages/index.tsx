import type {GetStaticProps} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import client from "../contentful/index";
import {IMainPage, IMainPageFields} from "../contentful-types";
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';


const Home = ({home}: { home: IMainPage }) => {
    console.log('home --->', home.fields.heading);
    return (
        <div className={styles.container}>
            <Head>
                <title>{home.fields.heading}</title>
            </Head>
            <main>
                <h1>{documentToReactComponents(home.fields.underHeading!)}</h1>
            </main>
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
