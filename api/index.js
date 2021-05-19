/* eslint-disable no-console */
import News from './controller/News'
import User from './controller/User'
import Auth from './middleware/Auth'
const express = require('express')
const app = express()
const { fetchNews } = require('./utils/cron')
fetchNews.start()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/news', News.getAll)
app.post('/news', Auth.verifyToken, News.getOne)
app.post('/news/thumbnail', News.getThumbnail)
app.post('/user/signup', User.create)
app.post('/user/login', User.login)
app.post('/user/subscribe', User.subscribe)

if (require.main === module) {
  const port = process.env.PORT || 3001

  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}

module.exports = app
