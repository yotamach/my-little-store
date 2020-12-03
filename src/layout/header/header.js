import React, { Component } from 'react'
import Box from '@material-ui/core/Box';

import './header.scss';


export default class AppHeader extends Component {
    render() {
        return (
            <Box component="div" className="header">
                <h3 className="title">Store application</h3>
            </Box>
        )
    }
}
