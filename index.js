import express from "express"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
const port = 3000
app.use(express.static(__dirname + "/public/"))

app.get('/', (req, res) => {
    res.send('Express JS on Vercel')
})
app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/views/about.html")
})
// app.get("/contacts", (req, res) => {
//     res.sendFile(__dirname + "/views/contacts.htm")
// })
app.listen(port, () => {
    console.log(`
http://localhost:${port}`);
})