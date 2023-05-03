import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  makeStyles,
  Button,
  colors,
  Typography,
  Container,
  Divider
} from '@material-ui/core';
import PlayForWorkOutlinedIcon from '@material-ui/icons/PlayForWorkOutlined';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import Footer from './Footer';
import Results from './Results';
import Filter from './Filter';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  cover: {
    position: 'relative',
    height: 800,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '&:before': {
      position: 'absolute',
      content: '" "',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage: 'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)'
    },
    '&:hover': {
      '& $inviteButton': {
        visibility: 'visible'
      }
    },
    [theme.breakpoints.down('lg')]: {
      height: 600
    },
    [theme.breakpoints.down('md')]: {
      height: 400
    },
    backgroundImage: `url(${'/static/images/covers/cover.jpg'})`
  },
  title: {
    color: '#ffffff',
    fontFamily: '"Segoe UI"',
    fontWeight: 'bold',
  },
  span: {
    color: 'greenyellow',
    fontFamily: '"Segoe UI"',
    fontWeight: 'bold',
    marginTop: 7,
  },
  subtext: {
    color: 'white',
    fontFamily: '"Segoe UI"',
    fontWeight: 'bold',
    marginTop: 4
  },
  container: {
    paddingLeft: '10%',
    marginTop: 60
  },
  inviteButton: {
    position: 'absolute',
    marginTop: 20,
    left: '10%',
    backgroundColor: '#ffffff',
    color: theme.palette.common.dark,
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(6),
    },
    '&:hover': {
      backgroundColor: colors.blueGrey[500]
    }
  },
}));

function ProjectBrowseView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const handleClick = () => {
    const anchor = document.querySelector('#Main');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (window.location.search) {
    handleClick();
  }

  const query = useQuery();

  const getPosts = useCallback(() => {
    query.delete('fbclid');
    if (!query.has('page')) {
      query.append('page', 1);
    }
    axios
      .get(`${process.env.REACT_APP_API}/posts/?${query.toString()}`)
      .then((response) => {
        if (isMountedRef.current) {
          setPostCount(response.data.postCount);
          setPosts(response.data.posts);
          console.log(response.data.posts);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div
      className={classes.rot}
    >
      <div
        className={classes.cover}
      >
        <Box
          className={classes.container}
        >
          <Typography
            variant="h1"
            className={classes.title}
          >
            Chào mừng đến
          </Typography>
          <Typography
            variant="h1"
            className={classes.span}
          >
            PetHub
          </Typography>
          <Button
            className={classes.inviteButton}
            variant="contained"
            startIcon={<PlayForWorkOutlinedIcon />}
            onClick={handleClick}
          >
            Tham gia với chúng tôi
          </Button>
        </Box>
      </div>
      <Page
        className={classes.root}
        title="PetHub"
        id="Main"
      >
        <Container maxWidth="lg">
          <Header />
          <Box mt={3}>
            <Filter />
          </Box>
          <Box mt={6}>
            <Results posts={posts} getPosts={getPosts} postCount={postCount} />
          </Box>
        </Container>
      </Page>
      <Divider />
      <Footer />
    </div>
  );
}

export default ProjectBrowseView;
