const { getAllOrders } = require("../../../services/mongoose/orders");
const { StatusCodes } = require("http-status-codes");

const index = async (req, res, next) => {
    try {
        const { data, pages, total } = await getAllOrders(req);

        res.status(StatusCodes.OK).json({
            data: { order: data, pages, total },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { index };
