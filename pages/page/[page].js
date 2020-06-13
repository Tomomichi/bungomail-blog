import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import List from '../../components/list'
import { getPosts, getPostSlugs } from '../../lib/api'
import { formatDate } from '../../lib/utilities'


export default function Index({ entries, page, hasNextPage, tag }) {
  return (
    <Layout>
      <Head>
        <link rel="canonical" href="https://blog.bungomail.com" />
      </Head>

      <List entries={ entries } page={ page } hasNextPage={ hasNextPage } tag={ tag } />
    </Layout>
  )
}


const perPage = 10;

export async function getStaticProps({params}) {
  const page = (params && params.page) ? Number(params.page) : 1;
  const tag = (params && params.tag) ? params.tag : null;
  let hasNextPage = true;
  const skip = perPage * (page - 1);

  const entries = getPosts([
    'title',
    'date',
    'slug',
    'content',
  ], skip)

  return {
    props: {
      entries,
      tag: tag,
      page: page,
      hasNextPage: hasNextPage,
    },
  }
}

export async function getStaticPaths() {
  const slugs = getPostSlugs();
  const pageCount = Math.ceil(slugs.length/perPage);

  let paths = [];
  for(let i = 2; i <= pageCount; i++) {
    paths.push({
      params: {
        page: String(i)
      }
    });
  }

  return {
    paths,
    fallback: false
  }
}
