import * as React from 'react'; 

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export const MyMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <span
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{
                    color: "#fff",
                    fontSize: '20px',
                    cursor: 'pointer',
                    marginLeft: '20px',
                    fontWeight: 'bold'
                }}
                data-testid="span"
            >
                {props.title}
            </span>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    props.menuItems.map((item, index) => <MenuItem 
                    key={index} 
                    onClick={handleClose}> <Link
                        style={{
                            "textDecoration": "none",
                            "color": "white",
                        }}
                        to={item.path}> {item.title} </Link> </MenuItem>)
                }

            </Menu>
        </div>
    );
}