var React = require('react');
var TextField = require('material-ui/lib/text-field');
var FontIcon = require('material-ui/lib/font-icon');
var blockComponentList = require('./blockComponentList');

module.exports = React.createClass({
    render: function() {
        return (
            <TextField
                floatingLabelText="Add an image URL here"
                value={this.props.data.content.imageURL}
                onChange={this.handleChange}
                style={{
                    paddingLeft: "24",
                }} />
        );
    },
    handleChange: function(e) {
        var content = this.props.data.content;
        content.imageURL = e.target.value;
        this.props.onBlockChange({"orderID": this.props.data.orderID, "content": content});
    }
});

blockComponentList['Banner Image'] = module.exports;