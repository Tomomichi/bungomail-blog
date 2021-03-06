import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { DateTime } from "luxon";

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  const filterFuturePost = function(slug) {
    const currentTimeString = DateTime.local().setZone("Asia/Tokyo").toFormat('yyyyLLddHHmmss');
    return slug.slice(0, 14) <= currentTimeString
  }
  return readdirSync(postsDirectory).filter(slug => slug != '.DS_Store' && filterFuturePost(slug)).sort().reverse();
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getPosts(fields = [], skip = 0, limit = 10 ) {
  const slugs = getPostSlugs()
  const posts = slugs.slice(skip, skip + limit)
    .map((slug) => getPostBySlug(slug, fields))
  return posts
}
