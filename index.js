const express = require("express")

// Express
const app = express()

// EJS
app.use(express.static("./public"))
app.set("view engine", "ejs")

// Bodyparser
app.use(express.urlencoded({extended: false}))

// Router
app.use("/", require("./routes/router"))

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
