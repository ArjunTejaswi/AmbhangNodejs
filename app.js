const express = require('express')
const app = express() //for executing express as a fn
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const categoryRoutes = require('./api/controllers/category')
// const authorRoutes = require('./api/controllers/author')
// const postRoutes = require('./api/controllers/post')
// const userRoutes = require('./api/controllers/user')
const morgan = require('morgan')
const bodyParser =  require('body-parser')

app.use(morgan('dev')) //format use for the output
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(expressLayouts)
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.set('layout', 'layouts/layout');

app.use(expressLayouts);
//cors
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-Headers',
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
    return res.status(200).json({})
  }
  next()
})

//utility method
//incoming req has to go through app.use
app.use('/',categoryRoutes)

//for error handling
app.use((req,res,next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error,req,res,next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})
module.exports = app
