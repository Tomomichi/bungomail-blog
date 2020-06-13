import Link from 'next/link'

export default function Sidebar() {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 border-solid border-b-2 border-gray-900 mb-12">公式サイト</h3>
      <div className="mb-8">
        <div className="rounded-lg w-full overflow-hidden">
          <a href="https://bungomail.com" target="_blank" rel="noopener">
            <img alt="ブンゴウメール" className="object-cover object-center h-full w-full" src="/images/ogp.png" />
          </a>
        </div>
        <a href="https://bungomail.com" target="_blank" rel="noopener">
          <h4 className="text-lg font-semibold text-gray-900 mt-3">ブンゴウメール</h4>
        </a>
        <p className="text-base leading-relaxed mt-1">
          1日3分のメールでムリせず毎月1冊本が読める、忙しいあなたのための読書サポートサービス
        </p>
      </div>

      <div className="">
        <div className="rounded-lg w-full overflow-hidden">
          <a href="https://search.bungomail.com" target="_blank" rel="noopener">
            <img alt="ブンゴウサーチ" className="object-cover object-center h-full w-full" src="/images/ogp_search.png" />
          </a>
        </div>
        <a href="https://search.bungomail.com" target="_blank" rel="noopener">
          <h4 className="text-lg font-semibold text-gray-900 mt-3">ブンゴウサーチ</h4>
        </a>
        <p className="text-base leading-relaxed mt-1">
          ブンゴウサーチは、青空文庫の作品を目安の読了時間で検索できるサービスです。
        </p>
      </div>
    </div>
  )
}
