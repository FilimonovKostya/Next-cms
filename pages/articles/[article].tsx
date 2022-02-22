import {IArcticle, IArcticleFields} from "../../contentful-types";
import {Container} from "reactstrap";
import Head from "next/head";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import {GetStaticPaths, GetStaticProps} from "next";
import client from "../../contentful/index";

export default function Article({arcticle}: { arcticle: IArcticle }) {
    return (
        <>
            <Head>
                <title>{arcticle.fields.title}</title>
            </Head>
            <Container>
                <h1 className={'py-3'}>{arcticle.fields.title}</h1>
                <div className={'py-2'}>
                    {documentToReactComponents(arcticle.fields.content)}
                </div>
            </Container>
        </>
    )

}


export const getStaticPaths: GetStaticPaths = async () => {
    const articleEntries = await client.getEntries<IArcticleFields>({
        content_type: 'arcticle',
        select: 'fields.slug'
    })

    return {
        paths: articleEntries.items.map(el => {
            return {
                params: {
                    article: el.fields.slug
                }
            }
        }),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const slug = params!.arcticle!

    const articleEntries = await client.getEntries<IArcticleFields>({
        content_type: 'arcticle',
        limit: 1,
        "fields.slug": slug
    })

    const [arcticle] = articleEntries.items

    return {
        props: {arcticle}
    }
}