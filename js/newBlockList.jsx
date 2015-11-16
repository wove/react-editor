// New Block List

var React = require('react');
var blockComponentList = require('./blockComponentList');
var NewBlockItem = require('./newBlockItem');

module.exports = React.createClass({
    render: function() {
        var thisComponent = this;
        var blockTypeList = Object.keys(blockComponentList);
        var blockTypes = blockTypeList.map(function(blockType) {
            return (
                <NewBlockItem 
                    key={blockType}
                    className="newBlockItem"
                    blockType={blockType}
                    parentBlockOrderID={thisComponent.props.data.orderID}
                    onNewBlockClick={thisComponent.props.onNewBlockClick} />
            );
        });
        return (
            <div
                className="newBlockList"
                style={{
                    paddingTop: "0",
                    paddingBottom: "0",
                    paddingLeft: "10",
                    paddingRight: "10",
                    marginBottom: "40",
                    marginTop: "-10"}}>
                {blockTypes}
            </div>
        );
    }
});