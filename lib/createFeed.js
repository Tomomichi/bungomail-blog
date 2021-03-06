const fs = require('fs');
const matter = require('gray-matter');
const Feed = require("feed").Feed;
const { DateTime } = require("luxon");

const filterFuturePost = function(slug) {
  const currentTimeString = DateTime.local().setZone("Asia/Tokyo").toFormat('yyyyLLddHHmmss');
  return slug.slice(0, 14) <= currentTimeString
}
const slugs = fs.readdirSync('_posts').filter(slug => slug != '.DS_Store' && filterFuturePost(slug)).sort().reverse().slice(0,20);

const feed = new Feed({
  title: "ブンゴウメール公式ブログ",
  description: "青空文庫の作品を1ヶ月で読めるように毎日小分けでメール配信してくれるサービス「ブンゴウメール」の公式ブログです。",
  id: "https://blog.bungomail.com/",
  link: "https://blog.bungomail.com/",
  language: "ja", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: "https://blog.bungomail.com/images/ogp.png",
  favicon: "https://blog.bungomail.com/favicon.ico",
  copyright: "All rights reserved 2020, NOT SO BAD, LLC.",
  feedLinks: {
    atom: "https://blog.bungomail.com/api/feed"
  },
  author: {
    name: "ブンゴウメール編集部",
    email: "info@notsobad.jp",
    link: "https://bungomail.com/"
  }
});

slugs.map((slug) => {
  const fileContents = fs.readFileSync(`_posts/${slug}`, 'utf8');
  const { data, content } = matter(fileContents);
  const realSlug = slug.replace(/\.md$/, '');

  feed.addItem({
    title: data['title'],
    id: `https://blog.bungomail.com/entry/${realSlug}`,
    link: `https://blog.bungomail.com/entry/${realSlug}`,
    description: content,
    date: new Date(data['date'])
  });
});

fs.mkdirSync('./out/feed');
fs.writeFileSync('./out/feed/index.xml', feed.atom1());
