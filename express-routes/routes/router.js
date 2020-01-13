import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.send('Homepage running in node using babel ES6 transpiling for express')
})

export default router
