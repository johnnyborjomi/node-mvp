module.exports = function(req, res, next) {
    res.locals.isAdminAuth = req.session.isAdminAuthenticated;

    next();
}