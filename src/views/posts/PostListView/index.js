import React from 'react';
import {
  Box,
  makeStyles,
  Button,
  colors,
  Typography,
} from '@material-ui/core';
import PlayForWorkOutlinedIcon from '@material-ui/icons/PlayForWorkOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
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
  return (
    <div
      className={classes.root}
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
          >
            Tham gia với chúng tôi
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default ProjectBrowseView;
