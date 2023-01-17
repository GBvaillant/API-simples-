const express = require('express')
const { restart } = require('nodemon')

// FAKE DATABASE 
let books = []

const app = express()

app.use(express.json())

app.post('/books', (req, res) => {
    const { id, tittle, author, publisheAt } = req.body
    const book = { id, tittle, author, publisheAt }
    books.push(book)
    res.status(201).json(book)
})


//listar todos os books 
app.get("/books", (req, res) => {
    const allBooks = books
    return res.status(200).json(allBooks)
})

app.get("/books/:book_id", (req, res) => {
    const { book_id } = req.params
    const book = books.find((book) => book.id === book_id)
    if (!book) res.status(404).json("not found")
    return res.status(200).json(book)
})

app.delete("/books/:book_id", (req, res) => {
    const { book_id } = req.params
    const filteredBooks = books.filter((book) => book.id !== book_id)
    books = filteredBooks
    return res.status(204).json("deleted")
})

// update
app.patch("/books/:book_id", (req, res) => {
    const { author, tittle, publisheAt } = req.body
    const { book_id } = req.params
    const book = books.find((book) => book.id === book_id)
    book.id = book.id
    book.tittle = tittle ? tittle : book.tittle
    book.author = author ? author : book.author
    book.publisheAt = publisheAt ? publisheAt : book.publisheAt
    return res.status(200).json(book)
})
    


//Mandar o servidor rodar 
app.listen(3333, () => console.log("Server is running"))