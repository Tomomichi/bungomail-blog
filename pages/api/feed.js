import { getPosts, getPostSlugs } from '../../lib/api'
const Feed = require("feed").Feed;

export default async (req, res) => {
  const entries = getPosts([
    'title',
    'date',
    'slug',
    'content',
  ], 0, 20)

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

  entries.forEach(post => {
    feed.addItem({
      title: post.title,
      id: `https://blog.bungomail.com/entry/${post.slug}`,
      link: `https://blog.bungomail.com/entry/${post.slug}`,
      description: post.content,
      date: new Date(post.date),
    });
  });

  res.statusCode = 200
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.write(feed.atom1());
  res.end();
}
