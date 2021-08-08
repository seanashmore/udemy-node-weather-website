const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = 3000

//Define paths for express config
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

//Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sean Ashmore'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sean Ashmore'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a helpful message',
        title: 'Help',
        name: 'Sean Ashmore'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address field',
            result: undefined
        })
    }

    geocode(req.query.address, (error, { location, lat, lng } = {}) => {
        if (error) {
            res.send({ error })
        } else {
            forecast(lat, lng, (error, { result }) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: result,
                    location,
                    address: req.query.address
                })
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    const search = req.query.search
    const rating = req.query.rating

    console.log(search, rating)

    res.send({
        products: []
    })
})


// 404 handlers
app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        message: 'Help article not found',
        name: 'Sean Ashmore'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        message: 'Page not found',
        name: 'Sean Ashmore'
    })
})

app.listen(port, () => {
    console.log("Server is up on port: " + port)
})