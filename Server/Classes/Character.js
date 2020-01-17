var shortID = require('shortid')

module.exports = class Character {
  constructor () {
    this.id = shortID.generate()
    this.character1
    this.character2
  }
}
