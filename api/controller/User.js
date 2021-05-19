import dotenv from 'dotenv'
import db from '../db'
import Helper from './Helper'
const Mailchimp = require('mailchimp-api-v3')
dotenv.config()

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)

const User = {
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' })
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res
        .status(400)
        .send({ message: 'Please enter a valid email address' })
    }
    const hashPassword = Helper.hashPassword(req.body.password)

    const createQuery = `INSERT INTO
      users(username, email, password)
      VALUES($1, $2, $3)
      returning *`
    const values = [req.body.username, req.body.email, hashPassword]

    try {
      const { rows } = await db.query(createQuery, values)
      const token = Helper.generateToken(rows[0].id)
      return res.status(201).json({
        username: req.body.username,
        email: req.body.email,
        token,
      })
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res
          .status(400)
          .send({ message: 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error)
    }
  },
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' })
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res
        .status(400)
        .send({ message: 'Please enter a valid email address' })
    }
    const text = 'SELECT * FROM users WHERE email = $1'
    try {
      const { rows } = await db.query(text, [req.body.email])
      if (!rows[0]) {
        return res
          .status(400)
          .send({ message: 'The credentials you provided is incorrect' })
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res
          .status(400)
          .send({ message: 'The credentials you provided is incorrect' })
      }
      const token = Helper.generateToken(rows[0].id)
      return res.status(200).json({
        username: rows[0].username,
        email: req.body.email,
        token,
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  },
  async subscribe(req, res) {
    if (!req.body.newsletteremail) {
      return res.status(400).send({ message: 'Some values are missing' })
    }
    if (!Helper.isValidEmail(req.body.newsletteremail)) {
      return res
        .status(400)
        .send({ message: 'Please enter a valid email address' })
    }
    await mailchimp
      .post(`/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
        email_address: req.body.newsletteremail,
        status: 'subscribed',
      })
      .then((results) => {
        return res.status(200).json(results)
      })
      .catch((err) => {
        return res.status(400).send(err)
      })
  },
}

export default User
