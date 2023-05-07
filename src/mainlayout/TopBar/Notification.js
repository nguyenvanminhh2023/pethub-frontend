import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  SvgIcon,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getNotifications } from 'src/actions/notificationsActions';

const iconsMap = {
  ADMIN: HourglassEmptyIcon,
  APPROVED: CheckIcon,
  UNAVAILABLE: ClearIcon,
  EXTENDPOST: HourglassEmptyIcon,
  EXTENDAPPROVED: CheckIcon
};

const notificationText = {
  ADMIN: 'Bài đăng cần duyệt',
  APPROVED: 'Bài đăng đã được duyệt',
  UNAVAILABLE: 'Thú cưng yêu thích đã được bán',
  EXTENDPOST: 'Bài đăng cần gia hạn',
  EXTENDAPPROVED: 'Bài đăng được gia hạn'
};

const useStyles = makeStyles((theme) => ({
  popover: {
    width: 320
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  customBadge: {
    backgroundColor: 'red',
    color: 'white'
  }
}));

function Notifications() {
  const classes = useStyles();
  const notifications = useSelector((state) => state.notifications.notifications);
  // const count = notifications.filter((noti) => !noti.seen).length;
  const notiIds = [];
  for (let i = 0; i < notifications.length; i++) {
    if (!notifications[i].seen) {
      notiIds.push(notifications[i].id);
    }
  }
  console.log(notiIds);
  const [
    countUnseenNoti,
    setCountUnseenNoti
  ] = useState(notifications.filter((noti) => !noti.seen).length);
  console.log(countUnseenNoti);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  useEffect(() => {
    setCountUnseenNoti(notifications.filter((noti) => !noti.seen).length);
  }, [notifications]);

  const handleSeenNotification = () => {
    axios
      .patch(`${process.env.REACT_APP_API}/notifications/seen`, { notiIds })
      .then(setCountUnseenNoti(0));
  };

  return (
    <>
      <Tooltip title="Xem thông báo mới nhất">
        <IconButton
          color="inherit"
          ref={ref}
          onClick={handleOpen}
        >
          {/* <NotificationsIcon /> */}
          <Badge
            classes={{ badge: classes.customBadge }}
            badgeContent={countUnseenNoti}
          >
            <NotificationsIcon onClick={handleSeenNotification} />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Box p={2}>
          <Typography
            variant="h5"
            color="textPrimary"
          >
            Thông báo
          </Typography>
        </Box>
        {notifications.length === 0 ? (
          <Box p={2}>
            <Typography
              variant="h6"
              color="textPrimary"
            >
              Bạn không có thông báo
            </Typography>
          </Box>
        ) : (
          <>
            <List
              className={classes.list}
              disablePadding
            >
              {notifications.map((notification) => {
                const Icon = iconsMap[notification.type];

                return (
                  <ListItem
                    className={classes.listItem}
                    component={RouterLink}
                    divider
                    onClick={handleClose}
                    key={notification.id}
                    to={`/posts/${notification.post}`}
                  >
                    <ListItemAvatar>
                      <Avatar
                        className={classes.icon}
                      >
                        <SvgIcon fontSize="small">
                          <Icon />
                        </SvgIcon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={notificationText[notification.type]}
                      primaryTypographyProps={{ variant: 'subtitle2', color: 'textPrimary' }}
                      secondary={notification.title}
                    />
                  </ListItem>
                );
              })}
            </List>
          </>
        )}
      </Popover>
    </>
  );
}

export default Notifications;
