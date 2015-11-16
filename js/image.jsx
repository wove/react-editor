var React = require('react');
var TextField = require('material-ui/lib/text-field');
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var FontIcon = require('material-ui/lib/font-icon');
var Paper = require('material-ui/lib/paper');
var blockComponentList = require('./blockComponentList');

module.exports = React.createClass({
    render: function() {
        return (
            <Paper
                style={{
                    marginTop: -10,
                    marginLeft: 5,
                    marginRight: 5,
                    paddingTop: 30,
                    paddingBottom: 30,
                }}>
                <TextField
                    floatingLabelText="Add an image URL here"
                    value={this.props.data.content}
                    onChange={this.handleChange}
                    style={{
                        paddingLeft: "24",
                    }} />
            </Paper>
        );
    },
    handleChange: function(e) {
        var content = e.target.value;
        this.props.onBlockChange({"orderID": this.props.data.orderID, "content": content});
    }
});

blockComponentList['Image'] = module.exports;