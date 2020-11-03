const express = require('express')

const app = express()

app.get('/', (request, response) => {
    return response.json({ message: 'Hello World!'}) //retorn of json always in array or object
})

app.listen(3333)