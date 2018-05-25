import React, {Component} from 'react';
import Head from '../components/head';

export default class Index extends Component {
  constructor() {
    super();
    this.state = {value: ''};
  }

  handleChange = e => {
    this.setState({value: e.target.value});
  }

  download = e => {
    if (e.keyCode === 13) {
      location.replace(`/download?url=${this.state.value}`);
    }
  }

  render() {
    const title = 'Download!';
    const description = 'A proxy!';

    return (
      <div>
        <Head title={title} description={description}/>
        <input type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyUp={this.download}/>
      </div>
    );
  }
}
