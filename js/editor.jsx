var React = require('react');
var Block = require('./block');
var SiteOptions = require('./SiteOptions');
var parser = require('./videoURLParser');
var blockComponentList = require('./blockComponentList');
var csrftoken = require('./csrftoken');

module.exports = React.createClass({
    getInitialState: function() {
        return  {
                    data: {
                        "blocks": [
                            {
                                "id": 1,
                                "type": "Heading",
                                "content": "The Heading From The Initial Data"
                            },
                            {
                                "id": 5,
                                "type": "Paragraph",
                                "content": "The paragraph from the initial data"
                            },
                            {
                                "id": 3,
                                "type": "Image",
                                "content": "http://www.stuff.co.nz/content/dam/images/1/7/m/d/h/s/image.related.StuffLandscapeSixteenByNine.620x349.17md4l.png/1445465810580.png"
                            },
                            {
                                "id": 6,
                                "type": "Video",
                                "content": {
                                    "url": "http://vimeo.com/19339941",
                                    "embedHTML": ""
                                }
                            },
                            {
                                "id": 4,
                                "type": "Banner Image",
                                "content": {
                                    "imageURL": "http://www.stuff.co.nz/content/dam/images/1/7/m/d/h/s/image.related.StuffLandscapeSixteenByNine.620x349.17md4l.png/1445465810580.png",
                                    "overlayText": "The overlay text"
                                }
                            }
                        ],
                        "options": {
                            "siteName": ""
                        }
                    }
                };
    },
    componentWillMount: function() {
        for (var i in this.state.data.blocks) {
            var block = this.state.data.blocks[i];
            if (block.type === "Video") {
                block.content.embedHTML = this.getEmbedHTML(block.content.url);
            }
        }
        this.updateBlockOrderIDs();
        this.collapseBlocks();
    },
    render: function(){
        var thisComponent = this;
        var blockCount = this.state.data.blocks.length;
        var blockNodes = this.state.data.blocks.map(function(block) {
            return (
                <Block
                    key={block.id}
                    data={block}
                    blockCount={blockCount}
                    onBlockChange={thisComponent.handleBlockChange}
                    onBlockMoveClick={thisComponent.handleBlockMoveClick}
                    onBlockDeleteClick={thisComponent.handleBlockDelete}
                    onNewBlockClick={thisComponent.handleNewBlockClick}
                    onCollapseBlockClick={thisComponent.handleCollapseBlockClick}
                    onCollapseNewBlocksClick={thisComponent.handleCollapseNewBlocksClick} />
            );
        });
        return (
            <div className="Editor">
                <SiteOptions
                    className="SiteOptions"
                    data={this.state.data.options}
                    onSiteNameChange={this.handleSiteNameChange}
                    onSaveClick={this.handleSaveClick} />
                <div className="blocks">
                    {blockNodes}
                </div>
            </div>
        );

    },
    handleSiteNameChange: function(siteName) {
        this.state.data.options.siteName = siteName;
        this.setState({data: this.state.data});
    },
    handleSaveClick: function() {
        var JSONData = JSON.stringify(this.state.data);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'save-site/');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
        xhr.onload = function() {
            if (xhr.status === 200) {
                alert(xhr.responseText);
            }
        };
        xhr.send(JSONData);
    },
    collapseBlocks: function() {
        for (var block in this.state.data.blocks) {
            this.state.data.blocks[block].collapsed = true;
            this.state.data.blocks[block].newBlocksCollapsed = true;
        }
    },
    updateBlockOrderIDs: function() {
        for (var i = 0; i < this.state.data.blocks.length; i++) {
            this.state.data.blocks[i].orderID = i + 1;
        }
        this.setState({data: this.state.data});
    },
    createNewBlockID: function() {
        var blockIDs = this.state.data.blocks.map(function(block) {
            return block.id;
        });
        var newID = Math.max.apply(Math, blockIDs) + 1;
        return newID;
    },
    handleBlockChange: function(block) {
        if (this.state.data.blocks[block.orderID - 1].type === "Video") {
            console.log('update video');
            block.content.embedHTML = this.getEmbedHTML(block.content.url)
        }
        this.state.data.blocks[block.orderID - 1].content = block.content;
        this.setState({data: this.state.data});
    },
    handleBlockMoveClick: function(blockOrderID, direction) {
        var block = this.state.data.blocks[blockOrderID - 1];
        this.state.data.blocks.splice(blockOrderID - 1, 1);
        if (direction === "up") {
            this.state.data.blocks.splice(blockOrderID - 2, 0, block);
        } else {
            this.state.data.blocks.splice(blockOrderID, 0, block);
        }
        this.updateBlockOrderIDs();
    },
    handleBlockDelete: function(blockOrderID) {
        this.state.data.blocks.splice(blockOrderID - 1, 1);
        this.updateBlockOrderIDs();
    },
    handleNewBlockClick: function(blockData, parentBlockOrderID) {
        this.collapseBlocks();
        blockData.id = this.createNewBlockID();
        blockData.newBlocksCollapsed = true;
        this.state.data.blocks.splice(parentBlockOrderID, 0, blockData);
        this.updateBlockOrderIDs();
    },
    handleCollapseBlockClick: function(blockID) {
        var block;
        for (var item in this.state.data.blocks) {
            if (this.state.data.blocks[item].id === blockID) {
                block = this.state.data.blocks[item];
            }
        }
        block.collapsed = (!block.collapsed ? true : false);
        this.setState({data: this.state.data});
    },
    handleCollapseNewBlocksClick: function(blockID) {
        var block;
        for (var item in this.state.data.blocks) {
            if (this.state.data.blocks[item].id === blockID) {
                block = this.state.data.blocks[item];
            }
        }
        block.newBlocksCollapsed = (!block.newBlocksCollapsed ? true : false);
        this.setState({data: this.state.data});
    },
    getEmbedHTML: function(url) {
        var embedHTML;
        try {
            var videoProperties = parser.parse(url);
            if (videoProperties.provider === "vimeo") {
                embedHTML = '<iframe src=//player.vimeo.com/video/' +
                            videoProperties.id +
                            ' frameBorder="0" allowFullScreen></iframe>'
            } else if (videoProperties.provider === "youtube") {
                embedHTML = '<iframe src=//www.youtube.com/embed/' +
                            videoProperties.id +
                            '?modestbranding=1' +
                            'rel=0' +
                            ' frameBorder="0" allowFullScreen></iframe>'
            }
        } catch (err) {
            // Error message here
        }
        return embedHTML;
    }
});