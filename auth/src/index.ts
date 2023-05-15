import express from 'express'
import { json } from 'body-parser'

const app = express()
app.use(json())

app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there')
})

app.get('/api/users/my-profile', (req, res) => {
  res.send('My profile')
})

app.listen(3000, () => {
  console.log('Listening on 3000')
})
