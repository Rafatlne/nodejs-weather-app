const express = require('express');
const path = require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config 
const publicRouteDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicRouteDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rafat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rafat'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Helping page',
        name: 'rafat'   
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})  

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'please provide a address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude,longitude,(error, forecast) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                foreCast: forecast,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found',
        name: 'Rafat'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: 'Page not found',
        name: 'Rafat'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})