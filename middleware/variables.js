module.exports = function(req, res, next) {
    res.locals.isAdminAuth = req.session.isAdminAuthenticated;
    res.locals.admin = req.session.admin;
    res.locals.csrf = req.csrfToken();
    next();
}