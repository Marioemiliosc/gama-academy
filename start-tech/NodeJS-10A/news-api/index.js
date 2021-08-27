// Inclusao dos pacotes
const express = require('express')
var mysql = require('mysql2');

// Instancia o express
const app = express()

// Instancia a porta
const port = 3000

// Abrindo conexao com base de dados
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'senha do server',
    database : 'sistema_noticias'
});

connection.connect();


// Servico de Hello World
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Servico de busca de categorias
app.get('/news-api/v1/categorias', (req, res) => {

    // Busca categorias
    connection.query('SELECT id, nome FROM sistema_noticias.categoria', function(err, rows, fields) {
        if (err) throw err;

        res.send(rows)
    });
})

// Servico de busca de noticias
app.get('/news-api/v1/categorias/:categoriaId/noticias', (req, res) => {

    let categoria = req.params.categoriaId;

    // Busca noticias de uma categoria
    connection.query('SELECT id, titulo FROM sistema_noticias.noticia WHERE id_categoria = ' + categoria, function(err, rows, fields) {
        if (err) throw err;

        res.send(rows)
    });
})

// Servico que busca uma noticia
app.get('/news-api/v1/categorias/:categoriaId/noticias/:noticiaId', (req, res) => {

    let categoria_ID = req.params.categoriaId;
    let id_ID = req.params.noticiaId;

    // Busca noticia
    connection.query('SELECT id, titulo, conteudo FROM sistema_noticias.noticia WHERE id_categoria = ' + categoria_ID + ' AND id =' + id_ID, function(err, rows, fields) {
        if (err) throw err;

        res.send(rows[0])
    });
})

// Subindo servidor Node
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
