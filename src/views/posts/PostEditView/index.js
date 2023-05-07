import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import PostEditForm from './PostEditForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function PostEditView() {
  const classes = useStyles();
  const history = useHistory();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { pid } = useParams();
  const [post, setPost] = useState(null);

  const getPost = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/posts/${pid}`)
      .then((response) => {
        if (isMountedRef.current) {
          setPost(response.data.post);
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

  return (
    <Page
      className={classes.root}
      title="Chỉnh sửa bài đăng"
    >
      <Container maxWidth="md">
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              Chỉnh sửa bài đăng
            </Typography>
          </Grid>
          <Grid item>
            <Button
              component={RouterLink}
              to={`/posts/${pid}`}
            >
              Hủy
            </Button>
          </Grid>
        </Grid>
        <PostEditForm post={post} />
      </Container>
    </Page>
  );
}

export default PostEditView;
