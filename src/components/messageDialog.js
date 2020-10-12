import React from 'react';

export default class MessageDialog extends React.Component {
    constructor(props) {
        super(props);
        this.restartGame = this.props.restart;
    }

    render() {
        return (
            <div>

                <div className="blockingLayer" id="blockingLayer"></div>


                <div id="message-gameOver-win" className="message" style={{display: this.props.message === "win" ? "block" : "none"}}>
                    <div className="message-shade"></div>
                    <div className="message-content endGame">
                        <h1 className="mb10">Game over!</h1>
                        <div className="mb10">You won!</div>
                        <button className="btn" onClick={this.restartGame}>Want to restart?</button>
                    </div>
                </div>
                <div id="message-gameOver-loss" className="message" style={{display: this.props.message === "loss" ? "block" : "none"}}>
                    <div className="message-shade"></div>
                    <div className="message-content endGame">
                        <h1 className="mb10">Game over!</h1>
                        <div className="mb10">You lose!</div>
                        <button className="btn" onClick={this.restartGame}>Want to restart?</button>
                    </div>
                </div>
                <div id="message-gameOver" className="message" style={{display: this.props.message === "over" ? "block" : "none"}}>
                    <div className="message-shade"></div>
                    <div className="message-content endGame">
                        <h1 className="mb10">Game over!</h1>
                        <div className="mb10" id="score"></div>
                        <div className="mb10" id="status"></div>
                        <button className="btn" onClick={this.restartGame}>Want to restart?</button>
                    </div>
                </div>

                <div id="message-getReady" className="message" style={{display: this.props.message === "ready" ? "block" : "none"}}>
                    <div className="message-shade"></div>
                    <div className="message-content endGame">
                        <h1>Get ready!</h1>
                    </div>
                </div>
            </div>
        )
    }
}