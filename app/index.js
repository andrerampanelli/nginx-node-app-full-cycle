const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlCreate = `CREATE TABLE IF NOT EXISTS people (name VARCHAR(255) NOT NULL)`
connection.query(sqlCreate)

const sqlInsert = `INSERT INTO people(name) values('Alcino')`
connection.query(sqlInsert)

let nomes = []

connection.query('SELECT name FROM people', (err, result) => {
    nomes = result
})

connection.end()

app.get('/', (req, res) => {
    let resultado = '<h1>Full Cycle Rocks!</h1>'
    nomes.forEach((element) => {
        resultado = resultado.concat(`<h2>${element.name}<h2>`)
    })
    res.send(resultado)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})