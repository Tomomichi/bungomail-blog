const fs = require('fs');
const TurndownService = require('turndown')
const turndownService = new TurndownService()

const slugs = fs.readdirSync('_posts');
console.log(slugs.sort().reverse());
