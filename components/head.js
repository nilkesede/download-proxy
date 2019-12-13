import React, {Component} from 'react';
import NextHead from 'next/head';
import {string} from 'prop-types';

export default class Head extends Component {
  static defaultProps = {
    title: '',
    description: ''
  };

  static propTypes = {
    title: string,
    description: string
  };

  render() {
    const {title, description} = this.props;

    return (
      <NextHead>
        <meta charSet="UTF-8"/>
        <title>{title}</title>

        <meta name="description" content={description}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <link rel="icon" href="/favicon.ico"/>
      </NextHead>
    );
  }
}
