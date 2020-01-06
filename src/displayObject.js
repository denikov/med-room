import {EventEmitter} from './events.js';
import {Subject} from 'rxjs';

class DisplayObject {
  constructor() {
    // initial storage, keeping track of value and last time it was updated
    this.store = {
      temp: {
        val: 'N/A',
        lastUpdated: 0,
      },
      airPres: {
        val: 'N/A',
        lastUpdated: 0,
      },
      humid: {
        val: 'N/A',
        lastUpdated: 0,
      },
    };

    // display object should not be omitted more often than 100ms
    this.lastOmitted = 0;

    // Observable display object
    this.displayObject = new Subject();

    EventEmitter.on('temperature', (data) => {
      const now = new Date().getTime();
      this.store['temp'].val = data;
      this.store['temp'].lastUpdated = now;
      if (now - this.lastOmitted >= 100) {
        this.nextCheck();
        this.lastOmitted = now;
      }
    });

    EventEmitter.on('air-pressure', (data) => {
      const now = new Date().getTime();
      this.store['airPres'].val = data;
      this.store['airPres'].lastUpdated = now;
      if (now - this.lastOmitted >= 100) {
        this.nextCheck();
        this.lastOmitted = now;
      }
    });

    EventEmitter.on('humidity', (data) => {
      const now = new Date().getTime();
      this.store['humid'].val = data;
      this.store['humid'].lastUpdated = now;
      if (now - this.lastOmitted >= 100) {
        this.nextCheck();
        this.lastOmitted = now;
      }
    });
  }

  nextCheck() {
    // checking whether each system emitted a value
    if (this.store.humid.lastUpdated > 0 && this.store.temp.lastUpdated > 0 && this.store.airPres.lastUpdated > 0) {
      const now = new Date().getTime();

      // setting values to N/A if no event emitted for more than 1000ms
      if (now - this.store.humid.lastUpdated > 1000) {
        this.store.humid.val = 'N/A';
      }
      if (now - this.store.temp.lastUpdated > 1000) {
        this.store.temp.val = 'N/A';
      }
      if (now - this.store.airPres.lastUpdated > 1000) {
        this.store.airPres.val = 'N/A';
      }
      this.displayObject.next(this.store);
    }
  }
}

export default DisplayObject;
