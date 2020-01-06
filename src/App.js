import React from 'react';
import DisplayObject from './displayObject';
import Temperature from './tempMonitor';
import AirPressure from './airPresMonitor';
import Humidity from './humidityMonitor';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.temp = new Temperature();
    this.air = new AirPressure();
    this.humid = new Humidity();

    // Dependency Injection of three monitors
    this.displayObject = new DisplayObject(this.temp, this.air, this.humid);
  }

  componentDidMount() {
    // subscribe to display object only when component mounted
    this.displayObject.displayObject.subscribe((data) => {
      this.setState(data);
    });
  }

  render() {
    let content = '';

    // display values only after all 3 systems emit a value
    if (this.state.temp && this.state.airPres && this.state.humid) {
      content = (
        <div>
          <p>Temp is: {this.state.temp.val}</p>
          <p>Pressure is: {this.state.airPres.val}</p>
          <p>Humidity is: {this.state.humid.val}</p>
        </div>
      );
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default App;
