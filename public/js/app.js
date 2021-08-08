const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value  

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://127.0.0.1:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {

        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }

    })
})
})