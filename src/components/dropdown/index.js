import React from 'react';

import Header from './Header';
import Content from './Content';

import './styles.css';

export default class Dropdown extends React.Component {
    render() {
        return (
            <div>
                <Header title = {this.props.title} />
                <Content content = {this.props.content} />
            </div>
        );
    }
}