import axios from 'axios'
import db from '../db'
const cheerio = require('cheerio')

const News = {
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM news'
    try {
      const { rows } = await db.query(findAllQuery)
      return res.status(200).json(rows)
    } catch (error) {
      return res.status(400).send(error)
    }
  },
  async getOne(req, res) {
    const text = 'SELECT * FROM news WHERE guid = $1'
    try {
      const { rows } = await db.query(text, [req.body.guid])
      if (!rows[0]) {
        return res.status(404).send({ message: 'Article not found' })
      }
      await axios
        .get(rows[0].link)
        .then((response) => {
          if (response.status === 200) {
            const articlePage = cheerio.load(response.data)
            const thumbnail = articlePage('.article__lead-image img').attr(
              'src'
            )
            const content = articlePage('.article__body-text').text()
            return res.status(200).json({ ...rows[0], thumbnail, content })
          }
        })
        .catch((error) => res.send(error))
    } catch (error) {
      return res.status(400).send(error)
    }
  },
  async getThumbnail(req, res) {
    await axios
      .get(req.body.articleLink)
      .then((response) => {
        if (response.status === 200) {
          const articlePage = cheerio.load(response.data)
          const thumbnail = articlePage('.article__lead-image img').attr('src')
          return res.json({
            thumbnail,
          })
        }
      })
      .catch((error) => res.send(error))
  },
}

export default News
