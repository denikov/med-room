import {EventEmitter} from './events.js';

class Temperature {
  constructor() {
    this.maxInterval = 2001;
    this.minInterval = 100;
    this.maxTemp = 100;
    this.minTemp = 50;
    this.interval = 0;

    // emitting initial value not before 100ms
    window.setTimeout(() => {
      this.run();
    }, 100);
  }

  run() {
    // generate random temperature
    const val = this.generateRandom(this.maxTemp, this.minTemp);
    EventEmitter.dispatch('temperature', val);

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

export default Temperature;
