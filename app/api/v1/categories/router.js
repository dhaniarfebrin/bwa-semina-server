const express = require('express')
const router = express()

const { create, index } = require('./controller')

router.get('/categories', index)
router.post('/categories', create)


module.exports = router