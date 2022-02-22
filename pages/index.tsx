import type {GetStaticProps} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import client from "../contentful/index";
import {IArcticle, IArcticleFields, IMainPage, IMainPageFields} from "../contentful-types";
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Button, Card, CardText, CardTitle, Col, Container, Row} from "reactstrap";
import Link from 'next/link';


const Home = ({home, arcticle}: { home: IMainPage, arcticle: IArcticle[] }) => {
    console.log(arcticle)
    return (
        <div className={styles.container}>
            <Head>
                <title>{home.fields.heading}</title>
            </Head>
            <main>
                <div className={'text-center p-5 text-white'} style={{
                    background: `url("http:${home.fields.image?.fields.file.url}") no-repeat center / cover`,
                    minHeight: 300
                }}>
                    <h1 className={'mt-5'}>{home.fields.heading}</h1>
                    <div className={'mb-5'}>{documentToReactComponents(home.fields.underHeading!)}</div>
                </div>

                <Container className={'pt-5'} >
                    <Row>
                        {arcticle.map(el => (
                            <Col sm={4} key={el.fields.slug}>
                                <Card body>
                                    <CardTitle tag={'h5'}>{el.fields.title}</CardTitle>
                                    <CardText>{el.fields.description}</CardText>
                                    <Link href={`/arcticles/${el.fields.slug}`}><Button>{el.fields.action}</Button></Link>
                                </Card>
                            </Col>
                        ))}

                    </Row>
                </Container>

            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const home = await client.getEntries<IMainPageFields>({
        content_type: 'mainPage',
        limit: 1
    })

    const articleEntries = await client.getEntries<IArcticleFields>({
        content_type: 'arcticle',
        select: 'fields.title,fields.slug,fields.description,fields.action'
    })


    const [homePage] = home.items

    return {
        props: {title: 'My Blog', home: homePage, arcticle: articleEntries.items}
    }
}

export default Home
