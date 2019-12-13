import React, {Component} from 'react';
import Head from '../../components/head';

export default class Index extends Component {
  state = {value: ''};

  handleChange = event => {
    this.setState({value: event.target.value});
  }

  download = event => {
    if (event.keyCode === 13) {
      location.replace(`/download?url=${encodeURIComponent(this.state.value)}`);
    }
  }

  render() {
    const title = 'Download!';
    const description = 'A proxy!';

    return (
      <div>
        <Head title={title} description={description}/>

        <div className="container">
          <input type="text"
            value={this.state.value}
            className="form-control"
            onKeyUp={this.download}
            onChange={this.handleChange}/>
        </div>

        <a href="http://ksde.pw"
          target="_blank"
          rel="noopener noreferrer"
          className="anchor">ksde.pw</a>

        <style global jsx>{`
          * { box-sizing: border-box; }
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            font: 1rem 'Courier New', Courier, monospace;
            background: black;
          }
          .container {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-bottom: -38px;
          }
          .form-control {
            width: 70vw;
            margin: 0;
            padding: 8px 5px;
            border: 1px solid #fff;
            font: 1rem 'Courier New', Courier, monospace;
            background: black;
            color: #fff;
            outline: none;
          }
          .anchor {
            color: #fff;
            text-align: center;
            display: block;
            text-decoration: none;
            margin-bottom: 20px;
          }`}
        </style>
      </div>
    );
  }
}
