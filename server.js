const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Gameplay = require('./gameplay');
const stats = require('./stats');

const gameplay = new Gameplay();
global.io = io;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/templates/'));
app.use(express.static(path.join(__dirname, '/frontend/public/')));

app.get('/', (req, res) => {
  res.render('gameplay/index');
});

app.get('/dashboard', async (req, res) => {
  const best = await stats.getBest();
  const last = await stats.getLast();
  res.render('dashboard/index', {
    best,
    last,
  });
});

server.listen(1856, () => console.log('Listening on *:1856'));

io.on('connection', (client) => {
  // inital info on connection
  gameplay.update();

  client.on('setLevel', (n) => gameplay.setLevel(n));
  client.on('play', () => gameplay.play());
  client.on('click', () => gameplay.click());
  client.on('reset', () => gameplay.reset());
});
