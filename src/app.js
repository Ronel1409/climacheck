const path = require('path')
const { response } = require('express')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utills/geocode')
const forecast = require('./utills/forecast')


// Define paths for express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlers and views  location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath)),

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ronel Michael'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ronel Michael'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some useful text.',
        name: 'Ronel Michael'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
       return res.send({
            error: 'Must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send(
                {
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ronel Michael',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ronel Michael',
        errorMessage: 'Page not found'
    })
})

app.listen(4000, () => {
    console.log('Server is up on port 4000')
})