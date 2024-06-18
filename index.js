import express from 'express';
import { fileConfig } from './config/fileConfig.js';
import "dotenv/config";
import { engine } from "express-handlebars";
import router from './routes/router.js';
import cookieParser from 'cookie-parser';

const app = express();  
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileConfig)
app.use(cookieParser());

const __dirname = import.meta.dirname;

app.use("/", router);

app.engine('hbs', engine({
    extname: '.hbs'}
));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
