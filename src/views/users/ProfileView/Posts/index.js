import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import PostCard from 'src/components/PostCard';
import axios from 'src/utils/axios';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Posts({
  className, uid, variant, ...rest
}) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/users/${uid}/${variant}`)
      .then((response) => {
        if (isMountedRef.current) {
          setPosts(response.data.user.posts);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!posts) {
    return null;
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        container
        spacing={3}
      >
        {posts.map((post) => (
          <Grid
            item
            key={post.id}
            lg={4}
            lx={4}
            md={6}
            xs={12}
          >
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Posts.propTypes = {
  className: PropTypes.string,
  uid: PropTypes.string,
  variant: PropTypes.string
};

export default Posts;
