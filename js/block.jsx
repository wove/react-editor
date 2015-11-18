var React = require('react');
var Paper = require('material-ui/lib/paper');
var FloatingActionButton = require('material-ui/lib/floating-action-button');
var FontIcon = require('material-ui/lib/font-icon');
var NewBlockList = require('./newBlockList');
var Heading = require('./heading');
var Paragraph = require('./paragraph');
var Image = require('./image');
var BannerImage = require('./bannerImage');
var Video = require('./video');
var BlockToolbar = require('./blockToolbar');
var blockComponentList = require('./blockComponentList');

module.exports = React.createClass({
    render: function() {
        var BlockType = blockComponentList[this.props.data.type];
        var rotate = ' rotate(45deg)';
        var translate = 'translate(-50%,25%)';
        var newBlockList = (
            <Paper>
                <NewBlockList
                    data={this.props.data}
                    onNewBlockClick={this.props.onNewBlockClick} />
            </Paper>
        );
        if (this.props.data.newBlocksCollapsed) {
            rotate = '';
            translate = 'translate(-50%,-50%)';
            newBlockList = '';
        }
        return (
            <div
                className="block"
                key={this.props.data.id}>
                <BlockToolbar
                    data={this.props.data}
                    blockCount={this.props.blockCount}
                    onBlockDeleteClick={this.props.onBlockDeleteClick}
                    onCollapseBlockClick={this.props.onCollapseBlockClick}
                    onBlockMoveClick={this.props.onBlockMoveClick} />
                {this.props.data.collapsed ? '' : (
                    <BlockType
                        data={this.props.data}
                        onBlockChange={this.props.onBlockChange} />
                )}
                <FloatingActionButton
                    mini={true}
                    onClick={this.handleShowNewBlocks}
                    style={{
                        marginLeft: '50%',
                        transform: translate + rotate,
                        zIndex: 10,
                        position: "relative",
                    }}>
                    <FontIcon className="material-icons">add</FontIcon>
                </FloatingActionButton>
                {newBlockList}
            </div>
        );
    },
    handleShowNewBlocks: function(e) {
        e.preventDefault();
        this.props.onCollapseNewBlocksClick(this.props.data.id);
    },
    handleBlockDeleteClick: function(e) {
        e.preventDefault();
        this.props.onBlockDeleteClick(this.props.data.orderID);
    },
    handleBlockCollapseClick: function(e) {
        e.preventDefault();
        this.props.onCollapseBlockClick(this.props.data.id);
    }
});