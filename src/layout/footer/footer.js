import React, { Component } from 'react'
import "./footer.scss";
import Box from '@material-ui/core/Box';

export default class AppFooter extends Component {
    render() {
        return (
            <Box component="div" className="footer">
                <h5 className="title">Yotam Achrak</h5>
            </Box>
        )
    }
}
