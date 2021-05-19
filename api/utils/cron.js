/* eslint-disable node/handle-callback-err */
/* eslint-disable no-unused-vars */
import dotenv from 'dotenv'

dotenv.config()
const cron = require('node-cron')
const slugify = require('slugify')
const Parser = require('rss-parser')
const promise = require('bluebird')
const pgp = require('pg-promise')({
  promiseLib: promise,
})

const db = pgp({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

const parser = new Parser({
  customFields: {
    item: ['title', 'link', 'description', 'pubDate', 'guid'],
  },
})

const categories = [
  { title: 'The world this week', slug: 'the-world-this-week' },
  { title: 'Leaders', slug: 'leaders' },
  { title: 'Briefings', slug: 'briefing' },
  { title: 'Special reports', slug: 'special-report' },
  { title: 'Britain', slug: 'britain' },
  { title: 'Europe', slug: 'europe' },
  { title: 'United States', slug: 'united-states' },
  { title: 'The Americas', slug: 'the-americas' },
  { title: 'Middle East and Africa', slug: 'middle-east-and-africa' },
  { title: 'Asia', slug: 'asia' },
  { title: 'China', slug: 'china' },
  { title: 'International', slug: 'international' },
  { title: 'Business', slug: 'business' },
  { title: 'Finance and economics', slug: 'finance-and-economics' },
  { title: 'Science and technology', slug: 'science-and-technology' },
  { title: 'Books and arts', slug: 'books-and-arts' },
  { title: 'Obituaries', slug: 'obituary' },
  { title: 'Graphic detail', slug: 'graphic-detail' },
  { title: 'Indicators', slug: 'economic-and-financial-indicators' },
]

const parseNews = async () => {
  for (let i = 0; i < categories.length; i++) {
    const news = await parser.parseURL(
      `https://www.economist.com/${categories[i].slug}/rss.xml`
    )
    news.items.forEach(async (item) => {
      await db
        .none(
          'INSERT INTO news (guid, title, link, description, pubdate, category, categorytitle, slug) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [
            item.guid.replace(/\/content\//g, ''),
            item.title,
            item.link,
            item.description,
            item.pubDate,
            categories[i].slug,
            categories[i].title,
            slugify(item.title, { lower: true, remove: /[*+~.,()'"!:@]/g }),
          ]
        )
        .then((data) => {})
        .catch((error) => {})
    })
  }
}

const fetchNews = cron.schedule('*/10 * * * *', () => {
  parseNews()
    .then((data) => true)
    .catch((error) => true)
})

module.exports = { fetchNews }
