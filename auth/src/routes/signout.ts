import express from 'express'

const router = express.Router()

router.get('/api/users/signout', (req, res) => {
  res.send('Sign out')
})

export { router as signOutRouter }
