var React = require('react');
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
                    zIndex: 10,
                    position: "relative",
                }}>
                <Toolbar>
                    <ToolbarGroup
                        float="left">
                        <ToolbarTitle
                            text={this.props.data.type}
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={this.handleBlockCollapseClick} />
                    </ToolbarGroup>
                    <ToolbarGroup
                        float="right">
                        {this.props.data.orderID > 1 ?
                            <FontIcon
                                className="material-icons"
                                onClick={this.handleBlockMoveUpClick}>
                                    arrow_drop_up
                            </FontIcon> : ''}
                        {this.props.data.orderID < this.props.blockCount ?
                            <FontIcon
                                className="material-icons"
                                onClick={this.handleBlockMoveDownClick}>
                                    arrow_drop_down
                            </FontIcon> : ''}
                        <FontIcon
                            className="material-icons"
                            onClick={this.handleBlockCollapseClick}>
                                {this.props.data.collapsed ? "edit" : "expand_less"}
                        </FontIcon>
                        <FontIcon
                            className="material-icons"
                            onClick={this.handleBlockDeleteClick}>
                                delete
                        </FontIcon>
                    </ToolbarGroup>
                </Toolbar>
            </Paper>
        );
    },
    handleBlockCollapseClick: function(e) {
        e.preventDefault();
        this.props.onCollapseBlockClick(this.props.data.id);
    },
    handleBlockDeleteClick: function(e) {
        e.preventDefault();
        this.props.onBlockDeleteClick(this.props.data.orderID);
    },
    handleBlockMoveUpClick: function(e) {
        this.props.onBlockMoveClick(this.props.data.orderID, "up");
    },
    handleBlockMoveDownClick: function(e) {
        this.props.onBlockMoveClick(this.props.data.orderID, "down");
    },
});
