const express = require('express')

const app = express()

app.get('/projects', (request, response) => {
    //retorn of json always in array or object
    return response.json([
        'project ONE',
        'project TWO',
        'project THREE'
    ]) 
})

// There is no problem to use the same path /projects but with an other method (get, post)
app.post('/prohects', (request, response) =>{
    return response.json([
        'project ONE',
        'project TWO',
        'project THREE',
        'project FOUR'
    ])
})

app.put('/prohects/:id', (request, response) =>{
    return response.json([
        'project FIVE',
        'project TWO',
        'project THREE',
        'project FOUR'
    ])
})

app.delete('/prohects/:id', (request, response) =>{
    return response.json([
        'project TWO',
        'project THREE',
        'project FOUR'
    ])
})

app.listen(3333, () => {
    console.log('🚀️Back-end Started!')
})