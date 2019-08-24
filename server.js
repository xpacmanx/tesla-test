const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
global._io = io;

const Gameplay = require('./gameplay');
const gameplay = new Gameplay();
const stats = require('./stats')

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates/');
app.use(express.static(__dirname + '/frontend/public/'));

app.get('/', (req, res) => {
    res.render('gameplay/index');
});

app.get('/dashboard', async (req, res) => {
    let best = await stats.getBest();
    let last = await stats.getLast();
    res.render('dashboard/index', {best: best, last: last});
});

server.listen(1856, () => console.log('Listening on *:1856'));

io.on('connection', function(client){

    //inital info on connection
    gameplay.update();

    client.on('setLevel', (n) => gameplay.setLevel(n));
    client.on('play', () => gameplay.play());
    client.on('click', () => gameplay.click())
    client.on('reset', () => gameplay.reset())
});