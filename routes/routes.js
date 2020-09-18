const app = require('express').Router();
const passport=require('passport')
const passportsetup=require('../config/passport-config')


app.get('/login', (req, res) => {
    res.render('login')
})

//logout
app.get('/logout', (req, res) => {
    //handle with passport
    res.render('logout')
})

app.get('/redirect', (req, res) => {
    //handle with passport
    res.render('redirect')
})

//google
app.get('/google', passport.authenticate('google', {
    scope: ['profile','email','openid']
}));

app.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.render('redirect')
    //res.render('redirect')
});
module.exports = app;