// New Block Item

var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

module.exports = React.createClass({
    render: function() {
        var classes = "newBlockItem" + " " + this.props.parentBlockOrderID;
        var buttonLabel = this.props.blockType;
        return (
            <RaisedButton
                label={buttonLabel}
                secondary={true}
                className={classes}
                onClick={this.handleClick}
                style={{
                    marginTop: "20",
                    marginBottom: "20",
                    marginLeft: "10",
                    marginRight: "10"}} />
        );
    },
    handleClick: function(e) {
        e.preventDefault();
        var type = this.props.blockType;
        var content = '';
        this.props.onNewBlockClick({"type": type, "content": content}, this.props.parentBlockOrderID);
        return;
    },
});