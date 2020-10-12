import React from 'react';

export default class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.restartGame = this.props.restart;
        this.settingsChange = this.props.settings;
    }

    render() {
        return (
            <div className="menu topMenu">
                <div>Memory Game</div>
                <div className="df">
                    <div className="turnCount mr10">Turns: <span id="count">{this.props.count}</span></div>
                    <button className="restartButton btn mr10" onClick={this.restartGame}>Restart</button>
                    <button className="btn" onClick={this.settingsChange}>Settings</button>
                </div>
            </div>
        )
    }
}