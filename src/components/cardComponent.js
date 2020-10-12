import React from "react"

export default class CardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.cardClick = this.props.cardClick;
    }

    render() {
        return (
            <div className={this.props.card.isFlipped ? "card flip-container" : "card flip-container backside"} onClick={() => {
                this.cardClick(this.props.card.index);
            }}>
                <div className="flipper">
                    <div className="front">
                        <img className="card-image" src={require("../assets/img/" + (this.props.card.imgUrl ? this.props.imgUrl : "bear.png"))}></img>
                    </div>
                    <div className="back"></div>
                </div>
            </div>
        )
    }
}