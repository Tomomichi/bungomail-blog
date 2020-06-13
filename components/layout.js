import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <meta content="width=device-width, initial-scale=1, minimum-scale=1" name="viewport" />
        <link rel="icon" href="/images/notsobad/favicon.ico" />
        <title key="title">NOT SO BADなブログ</title>
        <meta name="description" content="ぼっちスタートアップが日々がんばっています。" />
        <meta content="NOT SO BADなブログ" property="og:title" key="og:title" />
        <meta content="website" property="og:type" />
        <meta content="https://blog.notsobad.jp" property="og:url" key="og:url" />
        <meta content="https://blog.notsobad.jp/images/notsobad/ogp.png" property="og:image" key="og:image" />
        <meta content="ぼっちスタートアップが日々がんばっています。" property="og:description" key="og:description" />
        <meta content="NOT SO BADなブログ" property="og:site_name" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="NOT SO BADなブログ" name="twitter:title" key="twitter:title" />
        <meta content="ぼっちスタートアップが日々がんばっています。" name="twitter:description" key="twitter:description" />
        <meta content="https://blog.notsobad.jp/images/notsobad/ogp.png" name="twitter:image:src" key="twitter:image:src" />
      </Head>

      <section className="text-gray-700 body-font">
        <div className="container px-5 p-5 md:pb-12 mx-auto  max-w-screen-lg">
          <h1 className="text-xl font-bold title-font text-gray-900 mb-4 inline-block border-b-4 border-gray-900">
            <Link href='/'>
              <a>ブンゴウメール公式ブログ</a>
            </Link>
          </h1>
          <h2 className="text-xs text-gray-700 tracking-widest font-medium title-font">
            青空文庫の作品を1ヶ月で読めるように毎日小分けでメール配信してくれるサービス「ブンゴウメール」の公式ブログです。
          </h2>
        </div>
      </section>

      <div className="container px-5 p-5 md:pb-12 mx-auto  max-w-screen-lg">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-2/3">
            { children }
          </div>
          <div className="w-full lg:w-1/3 bg-gray-500">
          </div>
        </div>
      </div>

      <footer className="text-gray-200 body-font">
        <div className="bg-gray-900">
          <div className="container mx-auto py-6 px-5 flex flex-wrap flex-col sm:flex-row max-w-screen-lg">
            <p className="text-gray-200 text-sm text-center sm:text-left">
              <Link href='/'>
                <a className="text-gray-500 hover:text-gray-200 ml-1">© 2020 ブンゴウメール公式ブログ</a>
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
