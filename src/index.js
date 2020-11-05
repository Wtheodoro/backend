const express = require('express')

const app = express()

// this line down must be early of the routes
app.use(express.json())

app.get('/projects', (request, response) => {
    const { title , character } = request.query

    console.log(title, character)
    //retorn of json always in array or object
    return response.json([
        'project ONE',
        'project TWO',
        'project THREE'
    ]) 
})

// There is no problem to use the same path /projects but with an other method (get, post)
app.post('/projects', (request, response) =>{
    const { title, owner } = request.body

    console.log(title, owner)

    return response.json([
        'project ONE',
        'project TWO',
        'project THREE',
        'project FOUR'
    ])
})

app.put('/projects/:id', (request, response) =>{
    const { id } = request.params

    console.log(id)

    return response.json([
        'project FIVE',
        'project TWO',
        'project THREE',
        'project FOUR'
    ])
})

app.delete('/projects/:id', (request, response) =>{
    return response.json([
        'project TWO',
        'project THREE',
        'project FOUR'
    ])
})

app.listen(3333, () => {
    console.log('🚀️Back-end Started!')
})