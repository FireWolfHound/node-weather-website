console.log('hello World');

const weatherFrom = document.querySelector('#weather')
const search = document.querySelector('#location')

weatherFrom.addEventListener('submit', (e) => {
	e.preventDefault()
	var text = document.createElement('p')
	text.setAttribute('id', 'message')

	const location = search.value

	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				if (!document.querySelector('#message')) {
					text.innerHTML = data.error
					weatherFrom.after(text)
				}else{
					document.querySelector('#message').innerHTML = data.error
					if (document.querySelector('#forecast'))
						document.querySelector('#forecast').remove()
				}
			} else {
				if (!document.querySelector('#message')) {
					text.innerHTML = data.location
					var text2 = document.createElement('p')
					text2.setAttribute('id', 'forecast')
					text2.innerHTML = data.forecast
					weatherFrom.after(text)
					text.after(text2)
				}else if (!document.querySelector('#forecast')) {
					var message = document.querySelector('#message')
					var text2 = document.createElement('p')
					text2.setAttribute('id', 'forecast')
					text2.innerHTML = data.forecast
					message.after(text2)
					document.querySelector('#message').innerHTML = data.location
				}else{
					document.querySelector('#message').innerHTML = data.location
					document.querySelector('#forecast').innerHTML = data.forecast
				}

			}
		})
	})
})