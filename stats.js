class Db {
    constructor(){
        
    }

    async getBest(){
        return [];
    }

    async getLast(){
        return [];
    }

    add(result){
        return true;
    }
}

const stats = new Db();
module.exports = stats;