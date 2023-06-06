const express = require('express')
const router = express()

const { create } = require('./controller')

router.get('/categories', (req, res) => {
    res.status(200).json({
        message: 'endpoint get all categories'
    })
})
router.post('/categories', create)

module.exports = router