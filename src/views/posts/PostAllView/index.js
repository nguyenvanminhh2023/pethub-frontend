import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import { useSnackbar } from 'notistack';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function PostAllView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [posts, setPosts] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const getPosts = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/posts`)
      .then((response) => {
        if (isMountedRef.current) {
          setPosts(response.data.posts);
        }
      });
  }, [isMountedRef]);

  const approvePost = (id) => {
    axios
      .patch(`${process.env.REACT_APP_API}/posts/${id}/approve`)
      .then(() => {
        enqueueSnackbar('Duyệt bài thành công', {
          variant: 'success'
        });
        getPosts();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Duyệt bài không thành công', {
          variant: 'error'
        });
      });
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!posts) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Post List"
    >
      <Container maxWidth="lg">
        <Header />
        {posts && (
          <Box mt={3}>
            <Results posts={posts} approvePost={approvePost} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default PostAllView;
