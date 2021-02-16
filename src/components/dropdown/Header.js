import React from 'react';

export default class Content extends React.Component {
    toggle(event) {
        let content = event.target.nextElementSibling;
        let content_classes = content.classList;
        content_classes.toggle('hidden');
    }

    render() {
        return <div className = 'dropdown-header' onClick = {this.toggle}>{this.props.title}</div>;
    }
}