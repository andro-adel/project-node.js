const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) =>
{
  res.redirect("/home")

  res.send('<h1>Index Page</h1>')
})

app.get('/home', (req, res) => {
  res.send('<h1>Home Page</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})