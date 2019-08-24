const stats = require('./stats');

class Gameplay {
    
    constructor(){
        this.id = 0; // Game ID
        this.level = 0; // Choosed level
        this.is_play = 0; // play or now
        this.time = 0; // time of play
        this.result = {
            id: 0, // Game Id
            level: 0, // Choosed level
            time: 10, // Time of play
            status: 0 // win (1) or loose (0)
        };
        this.clicked = 0; //how much clicked now
        this.max_clicked = 0; //how need to click for win
        this.timeout = undefined; 
    }

    reset(){
        this.level = 0;
        this.is_play = 0;
        this.update();
    }

    setLevel(n){
        this.level = n;
        this.max_clicked = n * 20;
        this.clicked = 0;
        this.time = 10;
        this.update();
    }

    play(){
        let self = this;
        this.id++;
        this.is_play = 1;
        this.timeout = setInterval(function(){
            self.time--;
            self.update();
            if (self.time == 0) {
                clearInterval(self.timeout);
                self.fail();
            }
        },1000);
        this.update();
    }

    win(){
        clearTimeout(this.timeout);
        this.is_play = 2;
        this.result = {
            id: this.id,
            level: this.level,
            time: this.time,
            score: this.score(),
            status: 1
        }
        this.save();
        this.update();
    }

    click() {
        this.clicked++;
        if (this.max_clicked == this.clicked) this.win();
        this.update();
    }

    fail(){
        this.is_play = 3;
        this.result = {
            id: this.id,
            level: this.level,
            time: this.time,
            score: this.score(),
            status: 1
        }
        this.save();
        this.update();
    }

    score(){
        //write score calculating
        return 0;
    }

    save(){
        stats.add(this.result);
    }

    update(){
        let data = {
            id: 0,
            level: this.level,
            time: this.time,
            is_play: this.is_play,
            result: this.result,
            clicked: this.clicked,
            max_clicked: this.max_clicked
        }
        global._io.emit('state', data)
    }
}

module.exports = Gameplay;