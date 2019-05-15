const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode').geocode
const forecast = require('./utils/forecast').forecast

const app = express()

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// setup staic directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Valyu'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Valyu'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Valyu'
	})
})

app.get('/weather', (req, res) => {
	const address = req.query.address
	if (address) {
		geocode(address, (error, {latitude, longitude, location} = {})=>{
			if (error) {
				res.send({
					error
				})
			}
			else {
				forecast(latitude, longitude, (error, forecast)=>{
					if (error) {
						res.send({
							error
						})
					}else {
						res.send({
							location,
							forecast
						})
					}
				})
			}
		})
	} else {
		res.send({
			error: 'You need to specify an address'
		})
	}
})

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: 'Error 404 !',
		name: 'Valyu',
		message: 'Page not found.'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Error 404 !',
		name: 'Valyu',
		message: 'Page not found.'
	})
})

app.listen(3000, () => {
	console.log('server is up on port 3000');

})