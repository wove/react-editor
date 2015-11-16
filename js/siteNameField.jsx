var React = require('react');
var TextField = require('material-ui/lib/text-field');

module.exports = React.createClass({
    render: function() {
        return (
            <TextField
                floatingLabelText="Add the domain name here"
                hintText="e.g. example.com"
                value={this.props.data.siteName}
                onChange={this.handleChange}
                style={{
                    paddingLeft: "24",
                }} />
        );
    },
    handleChange: function(e) {
        var siteName = e.target.value;
        this.props.onSiteNameChange(siteName);
    }
});