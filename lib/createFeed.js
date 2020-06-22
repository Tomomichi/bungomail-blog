const fs = require('fs');
const matter = require('gray-matter');
const Feed = require("feed").Feed;

// const currentTimeString = new Date().toLocaleDateString("ja-JP", {timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit"}).replace(/\//g, "")
// const slugs = fs.readdirSync('_posts').reverse().filter(slug => slug != '.DS_Store' && slug.slice(0, 8) <= currentTimeString).slice(0,20);
const slugs = fs.readdirSync('_posts').filter(slug => slug != '.DS_Store' && new Date(slug.slice(0, 14).replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1/$2/$3 $4:$5:$6")) <= new Date()).sort().reverse().slice(0,20);

let entries = [];
slugs.map((slug) => {
  const fileContents = fs.readFileSync(`_posts/${slug}`, 'utf8');
  const { data, content } = matter(fileContents);
  entries.push({
    title: data['title'],
    date: data['date'],
    slug: slug.replace(/\.md$/, ''),
    content: content
  });

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
      date: new Date(post.date)
    });
  });

  fs.writeFileSync('./out/feed.xml', feed.atom1());
});
