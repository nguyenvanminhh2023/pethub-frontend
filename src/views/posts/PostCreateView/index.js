import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import PostCreateForm from './PostCreateForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function PostCreateView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Post Create"
    >
      <Container maxWidth="md">
        <Header />
        <PostCreateForm />
      </Container>
    </Page>
  );
}

export default PostCreateView;
