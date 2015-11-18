var React = require('react');
var TextField = require('material-ui/lib/text-field');
var VideoIframe = require('./videoIframe');
var parser = require('./videoURLParser');
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
                    floatingLabelText="Add your video URL here"
                    multiLine={true}
                    value={this.props.data.content.url}
                    onChange={this.handleChange}
                    style={{
                        paddingLeft: "24"
                    }} />
                <div
                    className="videoWrapper"
                    dangerouslySetInnerHTML={this.getIframeHTML()} />
            </Paper>
        );
    },
    handleChange: function(e) {
        var content = this.props.data.content;
        content.url = e.target.value;
        this.props.onBlockChange({"orderID": this.props.data.orderID, "content": content});
    },
    getIframeHTML: function() {
        return {__html: this.props.data.content.embedHTML};
    }
});

blockComponentList['Video'] = module.exports;