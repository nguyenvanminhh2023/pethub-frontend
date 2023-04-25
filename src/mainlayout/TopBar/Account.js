import React, {
  useState,
  useRef
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  ButtonBase,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core';
import { logout } from 'src/actions/accountActions';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1),
    marginLeft: 12
  },
  avatar1: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1),
    marginLeft: 24
  },
  popover: {
    width: 200
  }
}));

function Account() {
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await dispatch(logout());
      history.push('/');
    } catch (error) {
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };

  return (
    <>
      <Box
        className={classes.root}
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        ref={ref}
      >
        <Avatar
          alt="User"
          className={account.user ? classes.avatar : classes.avatar1}
          src={account.user ? account.user.avatar : null}
        />
        <Hidden smDown>
          <Typography
            variant="h6"
            color="inherit"
          >
            {account.user ? account.user.username : 'Tài khoản'}
          </Typography>
        </Hidden>
      </Box>
      {account.user ? (
        <Menu
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          keepMounted
          PaperProps={{ className: classes.popover }}
          getContentAnchorEl={null}
          anchorEl={ref.current}
          open={isOpen}
        >
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to={`/users/${account.user.id}`}
          >
            Tài khoản
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to="/users"
          >
            Danh sách người dùng
          </MenuItem>
          {account.user.role === 'admin' && (
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to="/places"
          >
            Danh sách bài đăng
          </MenuItem>
          )}
          {account.user.role === 'admin' && (
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to="/dashboard"
          >
            Quản lí trang Web
          </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            Đăng xuất
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          keepMounted
          PaperProps={{ className: classes.popover }}
          getContentAnchorEl={null}
          anchorEl={ref.current}
          open={isOpen}
        >
          <MenuItem
            component={RouterLink}
            to="/login"
          >
            Đăng nhập
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/register"
          >
            Đăng ký
          </MenuItem>
        </Menu>
      )}
    </>
  );
}

export default Account;
