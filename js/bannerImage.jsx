var React = require('react');
var TextField = require('material-ui/lib/text-field');
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var FontIcon = require('material-ui/lib/font-icon');
var Paper = require('material-ui/lib/paper');
var ImageURLField = require('./imageURLField');
var OverlayTextField = require('./overlayTextField');
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
                <ImageURLField
                    data={this.props.data}
                    onBlockChange={this.props.onBlockChange}/>
                <OverlayTextField
                    data={this.props.data}
                    onBlockChange={this.props.onBlockChange}/>
            </Paper>
        );
    },
    handleChange: function(e) {
        var content = e.target.value;
        this.props.onBlockChange({"orderID": this.props.data.orderID, "content": content});
    }
});

blockComponentList['Banner Image'] = module.exports;