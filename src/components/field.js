import React from 'react';
import CardComponent from "./cardComponent"
// import { cloneDeep } from 'lodash'

export default class Field extends React.Component {
    constructor(props) {
        super(props);

        this.cardClick = this.props.cardClick;
    }

    renderField() {
        return this.props.cards.map((item, i) => {
            return <CardComponent key={item.imgUrl + i} card={{ ...item, index: i }} imgUrl={item.imgUrl} cardClick={this.cardClick} />
        });
    }

    render() {
        return (
            <div className="mg-field">
                {this.renderField()}
            </div>
        )
    }
}