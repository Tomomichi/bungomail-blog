import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import ReactMarkdown from 'react-markdown'
import { getAllPosts } from '../lib/api'
import { formatDate } from '../lib/utilities'

export default function Index({ allPosts }) {
  return (
    <>
      <Layout>
        <section class="text-gray-700 body-font overflow-hidden">
          { allPosts.map((item) => (
            <div class="mb-12 flex flex-col items-start" key={ item.slug }>
              <span class="inline-block py-1 px-3 rounded bg-gray-100 text-gray-700 text-sm font-medium tracking-widest">{ formatDate(item.date) }</span>
              <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{ item.title }</h2>
              <p class="leading-relaxed mb-8">{ item.excerpt }</p>
            </div>
          )) }
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
