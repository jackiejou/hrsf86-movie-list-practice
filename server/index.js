const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const controllers = require('./controllers.js');

const app = express();
app.use(bodyParser.json());

router.get('/movies', controllers.get);
router.post('/movies', controllers.post);
router.get('/load', controllers.load);
router.put('/movies', controllers.put);

app.use('/', router);
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000, function () { console.log('MovieList app listening on port 3000!') });
