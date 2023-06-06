const Categories = require('./model')

const create = async (req, res, next) => {
    try {
        const { name } = req.body
        const result = await Categories.create({ name })

        res.status(201).json({
            data: result,
            message: "Category was created successfully"
        })
    } catch (err) {
        next(err)
    }
}

const index = async (req, res, next) => {
    try {
        const result = await Categories.find()
        
        res.status(200).json({
            data: result,
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { create, index }