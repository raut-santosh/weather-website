const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
// const { error } = require('console')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
// handlebars (hbs) setup in express seting viewengine to hbs 

// now we are renaming views folder so we can check another method
// another method for hbs views
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))



// using render
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'santosh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'santosh raut',
        age: 21
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'santosh raut',
        help: 'this is some help'
    })
})

app.get('/test',(req, res) => {
    res.send({
        title: 'santosh',
        post: 'king'
    })
})



// app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'santosh',
//         age: 22
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page route</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide adress'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })

    // console.log(req.query.address)
    // res.send({
    //     address: req.query.address,
    //     forecast: 'It is snowing',
    //     location: 'Phelidelphia'
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'santosh',
        name: 'raut',
        error: 'articles not found help'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Andrew mead',
        error: 'page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})