class LoginController {
    //GET[] / index
    index(req, res) {
        res.render('../../public/index')
    }

    oauth(req, res) {
        console.log('hello token')
        const { access_token, refresh_token, avatar } = req.query
        console.log(access_token)
        console.log(refresh_token)
        console.log(avatar)
        return res.redirect('http://3.0.99.113:3000/sales')
    }
}

module.exports = new LoginController();