var shortID = require('shortid')
var Vector2 = require('./Vector2.js')

module.exports = class Player {
  constructor () {
    this.username = 'Default_Player'
    this.id = shortID.generate()
    this.lobby = 0
    this.position = new Vector2()
    this.armsRotation = new Number(0)
    this.isTouched = false
    this.respawnTicker = new Number(0)
    this.respawnTime = new Number(0)
  }

  displayerPlayerInformation () {
    const player = this
    return '(' + player.username + ':' + player.id + ')'
  }

  /* respawnCounter() {
        this.respawnTicker = this.respawnTicker + 1;

        if(this.respawnTicker >= 10) {
            this.respawnTicker = new Number(0);
            this.respawnTime = this.respawnTime + 1;

            //Three second respond time
            if(this.respawnTime >= 3) {
                console.log('Respawning player id: ' + this.id);
                this.isDead = false;
                this.respawnTicker = new Number(0);
                this.respawnTime = new Number(0);
                this.position = new Vector2(-8, 3);

                return true;
            }
        }

        return false;
    } */

  touched () {
    this.isTouched = true
    this.respawnTicker = new Number(0)
    this.respawnTime = new Number(0)
    return this.isTouched
  }
}
