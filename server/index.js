const express = require('express')
const app = express()
const port = 8000
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const session = require('express-session')
app.use(session({secret: 'reactrestapi',
    resave: false, saveUninitialized: false}))

app.get('/api/session/get', (request,response) => {
    let s = (request.session.email) ? true : false
    response.json({signedIn: s})
})

app.post('/api/session/set', (request,response) => {
    let email = request.body.email || ''
    let password = request.body.pswd || ''
    if (password === '12345'){
        request.session['email'] = email
        response.json({signedIn: true})
    }else {
        response.json({signedIn: false})
    }
})

app.get('/api/session/del', (request, response) => {
    request.session.destroy(err => {
        response.json({signedIn: false})
    })
})

app.listen(port,() => {
    console.log('Server listening on port: ' + port)
})