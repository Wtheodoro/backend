const express = require('express')
const { uuid, isUuid } = require('uuidv4')

const app = express()

// this line down must be early of the routes
app.use(express.json())

const projects = []

// middleware
function logRequests(request, response, next) {
    const { method, url } = request
    const logLabel = `[${method.toUpperCase()}] ${url}`
    console.log(logLabel)

    return next() //next middleware in this case are the other methods(get, post, put, delete)
}

function validateProjectId(request,response, next) {
    const { id } = request.params

    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid project ID' })
    }

    return next()
}

app.use(logRequests)
app.use('/projects/:id', validateProjectId)

app.get('/projects', (request, response) => {
    const { title , character } = request.query

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects

    // console.log(title, character)
    //retorn of json always in array or object
    return response.json(results) 
})

// There is no problem to use the same path /projects but with an other method (get, post)
app.post('/projects', (request, response) =>{
    const { title, owner } = request.body

    const project = { id: uuid(), title, owner }

    projects.push(project)

    return response.json(project)
})

app.put('/projects/:id', (request, response) =>{
    const { id } = request.params
    const { title, owner} = request.body

    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    }
    
    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project

    return response.json(project)
})

app.delete('/projects/:id', (request, response) =>{
    const { id } = request.params

    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    }

    projects.splice(projectIndex, 1)

    // when the response is empty is recomended that we use status 204
    // and use send() instead of json()
    return response.status(204).send()
})

app.listen(3333, () => {
    console.log('🚀️Back-end Started!')
})