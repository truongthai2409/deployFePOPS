class SaleController {
    //GET[] / index
    index(req, res) {
        let newData = req.data;
        res.render('../public/views/blocks/call_video',  { reqData: newData })
    }
}

module.exports = new SaleController();