import Head from 'next/head'
import Layout from '../../components/layout'
import { getPostBySlug, getPostSlugs } from '../../lib/api'
import { formatDate } from '../../lib/utilities'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Post({ post, morePosts, preview }) {
  return (
    <Layout>
      <span className="inline-block py-1 px-3 rounded bg-gray-100 text-gray-700 text-sm font-medium tracking-widest">
        { formatDate(post.date) }
      </span>
      <h1 className="text-2xl sm:text-3xl title-font font-semibold text-gray-900 mt-4 mb-8">
        {post.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug.join(''), [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const slugs = getPostSlugs()

  return {
    paths: slugs.map((slug) => {
      const slashed_slug = slug.replace(/(\d{4})(\d{2})(\d{2})(\d{6}).md/, '$1/$2/$3/$4');
      return {
        params: {
          slug: slashed_slug.split('/'),
        },
      }
    }),
    fallback: false,
  }
}
