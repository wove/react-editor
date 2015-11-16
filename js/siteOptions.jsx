var React = require('react');
var Paper = require('material-ui/lib/paper');
var RaisedButton = require('material-ui/lib/raised-button');
var SiteNameField = require('./siteNameField');

module.exports = React.createClass({
    render: function() {
        return (
            <Paper
                style={{
                    width: "25%",
                    float: "left",
                }}>
                <SiteNameField
                    data={this.props.data}
                    onSiteNameChange={this.props.onSiteNameChange} />
                <hr />
                <RaisedButton
                    label="Save"
                    primary={true}
                    onClick={this.props.onSaveClick}
                    style={{
                        marginTop: "20",
                        marginBottom: "20",
                        marginLeft: "10",
                        marginRight: "10"}} />
            </Paper>
        );
    },
    handleSaveClick: function(e) {
        e.preventDefault();
    }
});