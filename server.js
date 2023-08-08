import express from "express"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";
import { Telegraf } from "telegraf"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const bot = new Telegraf("5648239366:AAE-VuCYZDTQiWawrFGS6JBNujvyk0f2HfQ")
const app = express()
const port = 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public/"))

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/views/index.html")
// })
app.get('/', function (req, res) {
    res.send(path.join(__dirname, './views', 'index.html'));

    // const fileName = __dirname + "/views/inde.html";
    // res.sendFile(fileName, function (err) {
    //     if (err) {
    //         console.error(err)
    //     }
    // });
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