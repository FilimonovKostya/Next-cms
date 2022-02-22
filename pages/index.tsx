import type {GetStaticProps} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import client from "../contentful/index";
import {IMainPage, IMainPageFields} from "../contentful-types";
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';


const Home = ({home}: { home: IMainPage }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>{home.fields.heading}</title>
            </Head>
            <main>
                <div className={'text-center p-5 text-white'} style={{
                    background: `url("http:${home.fields.image?.fields.file.url}") no-repeat center / cover`,
                    minHeight: 300
                }}/>
                <h1 className={'mt-5'}>{home.fields.heading}</h1>
                <div className={'mb-5'}>{documentToReactComponents(home.fields.underHeading!)}</div>
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
