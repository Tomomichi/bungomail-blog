import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  const date = new Date();
  const currentTimeString = `${date.getFullYear()}${('00' + (date.getMonth() + 1)).slice(-2)}${('00' + date.getDate()).slice(-2)}`;
  return readdirSync(postsDirectory).filter(slug => slug != '.DS_Store' && slug.slice(0, 8) <= currentTimeString).sort().reverse();
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
