import Head from 'next/head'
import Layout from '../components/layout'
import List from '../components/list'
import { getStaticProps } from './page/[page]'
export { getStaticProps }

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
