class Db {
  async getBest() {
    // return list of 10 best
    return [];
  }

  async getLast() {
    return [];
  }

  add(result) {
    return result;
  }
}

const stats = new Db();
module.exports = stats;
