module.exports = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/login");
        return;
    } else {
        next();
    }
}