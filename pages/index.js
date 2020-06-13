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
        <section className="text-gray-700 body-font overflow-hidden break-all">
          <div className="container px-5 md:px-24 pb-24 mx-auto max-w-screen-lg">
            <div className="-my-8">
              { allPosts.map((item) => (
                <div className="py-12 flex flex-wrap md:flex-no-wrap" key={ item.slug }>
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="mt-1 text-gray-900 font-bold">{ formatDate(item.date) }</span>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 title-font mb-4">
                      <Link href="/entry/[...slug]" as={`/entry/${ item.slug }`}>
                        <a>{ item.title }</a>
                      </Link>
                    </h2>
                    <div className="leading-relaxed">
                      <ReactMarkdown source={ item.excerpt } escapeHtml={ false } />
                    </div>

                    <Link href="/entry/[...slug]" as={`/entry/${ item.slug }`}>
                      <a className="text-blue-700 inline-flex items-center mt-4">記事の続きを読む
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              )) }
            </div>
          </div>
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
