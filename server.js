import express from "express"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public/"))

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/views/index.html")
// })
app.get('/', function (req, res) {
    const options = {
        root: path.join(__dirname)
    };

    const fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            res.sendStatus(err);
        }
    });
});
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