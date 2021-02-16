import React from 'react';

export default class Content extends React.Component {
    render() {
        return <div className = 'dropdown-content hidden'>{this.props.content}</div>;
    }
}