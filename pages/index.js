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
      location.replace(`/download?url=${encodeURIComponent(this.state.value)}`);
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

        <style global jsx>{`
          * {
            box-sizing: border-box;
          }
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: black;
          }
          input {
            width: 70vw;
            margin: 0;
            padding: 8px 5px;
            border: 1px solid #333;
            font: 1rem 'Courier New', Courier, monospace;
            background: black;
            color: #999;
            outline: none;
          }`}
        </style>
      </div>
    );
  }
}
