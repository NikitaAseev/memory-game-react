import React from 'react';

export default class StartDialog extends React.Component {
    constructor(props) {
        super(props);

        this.modeRef = React.createRef();
        this.cardsRef = React.createRef();

        this.onSubmit = this.props.submit;
    }

    render() {
        return (
            <div className="message" style={{ display: this.props.message === "start" ? "block" : "none" }}>
                <div className="message-shade"></div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.onSubmit(this.modeRef.current.value, this.cardsRef.current.value);
                }} className="message-content start-dialog-content">
                    <h1 className="mb10">Select game mode</h1>
                    <select className="mb20" ref={this.modeRef}>
                        <option value={0}>Limited turns</option>
                        <option value={1}>Unlimited turns</option>
                    </select>

                    <input className="mb10" ref={this.cardsRef} defaultValue={12} type="number" className="mb10" placeholder="Number of cards"></input>
                    <br></br><button className="btn">Start playing</button>
                </form>
            </div>
        )
    }
}