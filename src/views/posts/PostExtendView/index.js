import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Dialog,
  makeStyles,
  Typography,
  Box,
  Link,
  Button
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  }
}));

function PostExtendView({
  // className,
  notification,
  open,
  onClose
}) {
  const classes = useStyles();
  const [post, setPost] = useState(null);
  const [creator, setCreator] = useState(null);
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const getPost = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/posts/${notification.post}`)
      .then((response) => {
        if (isMountedRef.current) {
          setPost(response.data.post);
          setCreator(response.data.creator);
        }
      })
      .catch(() => {
        enqueueSnackbar('Không thể tìm thấy bài đăng', {
          variant: 'error'
        });
        history.push('/404');
      });
  }, [isMountedRef]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (!post) {
    return null;
  }

  if (!creator) {
    return null;
  }

  const handleApply = () => {
    axios
      .patch(`${process.env.REACT_APP_API}/posts/${post.id}/extend`, {
        extendDate: notification.extendDate,
        pid: post.id
      })
      .then(() => enqueueSnackbar('Gia hạn bài thành công', {
        variant: 'success'
      }))
      .catch(() => enqueueSnackbar('Không thể gia hạn', {
        variant: 'error'
      }))
      .finally(() => onClose());
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <Typography
        align="center"
        className={classes.title}
        gutterBottom
        variant="h3"
        color="textPrimary"
      >
        Bài đăng cần gia hạn
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        mt={2}
      >
        <Box ml={1}>
          <Link
            color="textPrimary"
            component={RouterLink}
            to={`/posts/${post.id}`}
            variant="h4"
          >
            {post.title}
          </Link>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            đăng bởi
            {' '}
            <Link
              color="textPrimary"
              component={RouterLink}
              to={`/users/${creator.id}`}
              variant="h6"
            >
              {creator.username}
            </Link>
          </Typography>
        </Box>
      </Box>
      {post.endDate !== notification.extendDate ? (
        <>
          <Box
            pb={1}
            px={3}
            className={classes.box}
          >
            <Typography
              color="textPrimary"
              variant="body2"
            >
              Ngày hết hạn cũ:
              {' '}
              {`${new Date(post.endDate).getDate()}/${(new Date(post.endDate).getMonth() + 1)}/${new Date(post.endDate).getFullYear()}`}
            </Typography>
            <Typography
              color="textPrimary"
              variant="body2"
            >
              Ngày hết hạn mới:
              {' '}
              {`${new Date(notification.extendDate).getDate()}/${(new Date(notification.extendDate).getMonth() + 1)}/${new Date(notification.extendDate).getFullYear()}`}
            </Typography>
          </Box>
          <Box
            mt={3}
            p={3}
          >
            <Button
              variant="contained"
              fullWidth
              color="primary"
              type="submit"
              onClick={handleApply}
            >
              Duyệt
            </Button>
          </Box>
        </>
      ) : (
        <Alert
          severity="success"
        >
          <Typography
            align="center"
            variant="subtitle2"
            color="textSecondary"
          >
            Bài đăng đã được gia hạn
          </Typography>
        </Alert>
      )}
    </Dialog>
  );
}

PostExtendView.propTypes = {
  // className: PropTypes.string,
  notification: PropTypes.object,
  // onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

export default PostExtendView;
