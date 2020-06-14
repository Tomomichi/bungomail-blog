import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { formatDate } from '../lib/utilities'

export default function List({ entries, page, hasNextPage, tag }) {
  return (
    <section className="text-gray-700 body-font overflow-hidden">
      { entries.map((item) => (
        <div className="flex flex-col items-start" key={ item.slug }>
          <span className="inline-block py-1 px-3 rounded bg-gray-100 text-gray-700 text-sm font-medium tracking-widest">
            <Link href="/entry/[...slug]" as={`/entry/${ item.slug.replace(/(\d{4})(\d{2})(\d{2})(\d{6})/, '$1/$2/$3/$4') }`}>
              <a>{ formatDate(item.date) }</a>
            </Link>
          </span>
          <h2 className="text-2xl sm:text-3xl title-font font-semibold text-gray-900 mt-4 mb-4">
            <Link href="/entry/[...slug]" as={`/entry/${ item.slug.replace(/(\d{4})(\d{2})(\d{2})(\d{6})/, '$1/$2/$3/$4') }`}>
              <a>{ item.title }</a>
            </Link>
          </h2>
          <p className="leading-relaxed mb-8">{ item.content.slice(0, 200) }...</p>
        </div>
      )) }

      <div className="py-12 flex flex-wrap md:flex-no-wrap">
        <div className="flex-grow">
          <div className="inline-block w-1/2 text-left">
            { prevPageLink(page, tag) }
          </div>
          <div className="inline-block w-1/2 text-right">
            { nextPageLink(page, hasNextPage, tag) }
          </div>
        </div>
      </div>
    </section>
  )
}

function prevPageLink(page, tag) {
  if(page && page > 1) {
    const href = `${ tag ? '/tag/[tag]' : '' }${ (page == 2) ? '/' : '/page/[page]' }`;
    const path = `${ tag ? '/tag/' + tag : '' }${ (page == 2) ? '/' : '/page/' + (page - 1) }`;
    return <Link href={ href } as={ path }><a>前のページ</a></Link>
  }
}

function nextPageLink(page, hasNextPage, tag) {
  if(hasNextPage) {
    const href = `${ tag ? '/tag/[tag]' : '' }/page/[page]`;
    const path = `${ tag ? '/tag/' + tag : '' }/page/${page + 1}`;
    return <Link href={ href } as={ path }><a>次のページ</a></Link>
  }
}
