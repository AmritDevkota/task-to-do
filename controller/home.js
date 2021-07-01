module.exports.getHomePage = (req, res, next) => {
    res.render('home', {
        user: req.session.user
    });
}