const express = require('express')
const app = express();
const mongoose=require('mongoose')
const cookieSession=require('cookie-session')
app.set('view engine', 'ejs')
const routes = require('./routes/routes')
const passport=require('passport')
mongoose.connect('mongodb://localhost:27017/myapp',{useNewUrlParser:true, useUnifiedTopology:true},()=>{console.log('db connected')});
app.use(passport.initialize())
app .use(passport.session())

app.use('/auth', routes)
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['mysuperstrongpassword']
}))




app.get('/', (req, res) => {
    res.render('home')
})



const PORT = 3000;
app.listen(PORT, '127.0.0.1', () => { console.log(`server started at ${PORT}`) })