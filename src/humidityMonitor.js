import {EventEmitter} from './events.js';

class Humidity {
  constructor() {
    this.maxInterval = 2001;
    this.minInterval = 100;
    this.maxHumid = 101;
    this.minHumid = 0;
    this.interval = 0;

    // emitting initial value not before 100ms
    window.setTimeout(() => {
      this.run();
    }, 100);
  }

  run() {
    // generate random humidity
    const val = this.generateRandom(this.maxHumid, this.minHumid);
    EventEmitter.dispatch('humidity', val);

    // random interval to emit next value
    this.interval = this.generateRandom(this.maxInterval, this.minInterval);
    window.setTimeout(() => {
      this.run();
    }, this.interval);
  }

  generateRandom(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default Humidity;
