import express from 'express';
import path from 'path';
import assignmentRoutes from './routes/assignment-routes';

const app = express();

// Setting up API
app.use(express.json());

// Settings for web server
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// TODO Add routes here.
app.use("/", assignmentRoutes);

const port = 3000;
app.listen(port, () => console.log(`Listening on port: ${port}.`));

// Keep this line. It is added for our testing purposes.

export default app;