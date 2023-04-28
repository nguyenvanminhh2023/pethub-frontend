import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 200,
    backgroundColor: theme.palette.background.dark
  },
  VisibilityIcon: {
    marginRight: theme.spacing(1),
    opacity: 0.75
  },
  box: {
    height: 100
  }
}));

function PostCard({ post, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box p={3}>
        <CardMedia
          className={classes.media}
          image={post.image}
        />
        <Box
          display="flex"
          alignItems="center"
          mt={2}
        >
          <Avatar
            alt="Author"
            src={post.creator.avatar}
          >
            {getInitials(post.creator.name)}
          </Avatar>
          <Box ml={2}>
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
                to={`/users/${post.creator.id}`}
                variant="h6"
              >
                {post.creator.username}
              </Link>
              {' '}
              | Đăng lúc
              {' '}
              {moment(post.createdDate).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        pb={1}
        px={3}
        className={classes.box}
      >
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          Địa chỉ :
          {' '}
          {post.address}
        </Typography>
        <Typography
          color="textPrimary"
          variant="body2"
        >
          {post.description.slice(0, 110)}
          {'...'}
        </Typography>
      </Box>
      <Box
        py={2}
        px={3}
      >
        <Grid
          alignItems="center"
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              Giá tiền
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
            >
              {post.price}
              {' '}
              VNĐ
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              Loài
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
            >
              {post.species}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              Tuổi
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
            >
              {post.age}
              {' '}
              tháng
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box
        py={2}
        pl={2}
        pr={3}
        display="flex"
        alignItems="center"
      >
        <VisibilityIcon className={clsx(classes.VisibilityIcon, className)} fontSize="small" />
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {post.views}
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {post.subscribers}
        </Typography>
        <Box flexGrow={1} />
        <Rating
          precision={0.1}
          value={post.star}
          size="small"
          readOnly
        />
      </Box>
    </Card>
  );
}

PostCard.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object.isRequired
};

export default PostCard;
