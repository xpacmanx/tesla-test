var socket = io.connect();

var app = new Vue({
    el: '#app',
    data: {
        is_play: 0,
        level: 0,
        clicked: 0,
        max_clicked: 0,
        countdown: 3,
        time: 0,
        interval: undefined
    },
    methods: {
        setLevel: function(n){
            var self = this;
            socket.emit('setLevel',n);
            this.interval = setInterval(function(){
                self.countdown--;
                if (self.countdown == 0) {
                    self.play();
                    clearInterval(self.interval);
                }
            },1000);
        },
        play: function(){
            socket.emit('play');
        },
        reset: function(){
            this.countdown = 3;
            socket.emit('reset');
        },
        clicker: function(){
            socket.emit('click');
        },
        renderTime: function(time){

        }
    },
});

socket.on('connect', function () {
    console.log('Connected to server.');
});

socket.on('state', function(data){
    console.log(data);
    for (i in app) {
        if (data[i] != undefined) app[i] = data[i];
    }
});