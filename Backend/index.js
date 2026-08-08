require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('dev'))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`)
})