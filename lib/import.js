const fs = require('fs');
const TurndownService = require('turndown')
const turndownService = new TurndownService()

const file = fs.readFileSync('lib/export.txt', 'utf-8');
const posts = file.split(/-----[\r\n]--------/);

(async () => {
  for(const [index, post] of posts.entries()) {
    const contents = post.split(/-----[\r\n]/)
    if(contents[1]==undefined) { return; }

    const meta = contents[0];
    let title, slug, published_at, status, image;
    const categories = [];
    meta.split(/\n/).map((line) => {
      const [key, val] = line.split(/: /);
      if(key.includes('TITLE')) {
        title = val;
      }else if( key.includes('STATUS') ) {
        status = val;
      }else if( key.includes('BASENAME') ) {
        slug = val;
      }else if( key.includes('DATE') ) {
        published_at = val;
      }else if( key.includes('IMAGE') ) {
        image = val;
      }else if( key.includes('CATEGORY') ) {
        categories.push(val);
      }
    });
    const body = contents[1].split(/BODY:\n/)[1].replace(/https\:\/\/cdn-ak\.f\.st-hatena\.com\/images\/fotolife\/o\/o_tomomichi\/\d+\/(\d+\.(?:png|jpg|jpeg|gif))/g, 'https://storage.googleapis.com/blog-notsobad/images/$1');

    let text = `---
title: ${title}
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.'
date: ${published_at}
---

${turndownService.keep(['iframe', 'cite']).turndown(body)}`;

    fs.writeFileSync(`_posts/${slug.replace(/\//g, '')}.md`, text);
  }
})();
