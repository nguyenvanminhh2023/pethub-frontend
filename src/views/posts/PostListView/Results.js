import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  ToggleButtonGroup,
  ToggleButton,
  Pagination
} from '@material-ui/lab';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PostCard from 'src/components/PostCard';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  sortButton: {
    textTransform: 'none',
    letterSpacing: 0,
    marginRight: theme.spacing(2)
  }
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Results({
  className, getPosts, posts, postCount, ...rest
}) {
  const classes = useStyles();
  const sortRef = useRef(null);
  const history = useHistory();
  const sortOptions = [
    'Gần đây nhất',
    'Đánh giá cao nhất',
    'Giá cao nhất',
    'Giá thấp nhất',
    'Nhiều lượt xem nhất'
  ];
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Sắp xếp');
  const [mode, setMode] = useState('grid');
  const query = useQuery();
  const page = parseInt(query.get('page'), 10) || 1;

  const handleSortOpen = () => {
    setOpenSort(true);
  };

  const handleSortClose = () => {
    setOpenSort(false);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  useEffect(() => {

  }, []);

  const handleSortSelect = (value) => {
    setSelectedSort(value);
    setOpenSort(false);
    switch (value) {
      case 'Đánh giá cao nhất':
        if (query.has('page')) {
          query.set('page', 1);
        } else {
          query.append('page', 1);
        }
        if (query.has('orderBy')) {
          query.set('orderBy', 'star');
        } else {
          query.append('orderBy', 'star');
        }
        if (query.has('order')) {
          query.set('order', 'desc');
        } else {
          query.append('order', 'desc');
        }
        history.replace(`/?${query.toString()}`);
        break;
      case 'Giá cao nhất':
        if (query.has('page')) {
          query.set('page', 1);
        } else {
          query.append('page', 1);
        }
        if (query.has('orderBy')) {
          query.set('orderBy', 'price');
        } else {
          query.append('orderBy', 'price');
        }
        if (query.has('order')) {
          query.set('order', 'desc');
        } else {
          query.append('order', 'desc');
        }
        history.replace(`/?${query.toString()}`);
        break;
      case 'Giá thấp nhất':
        if (query.has('page')) {
          query.set('page', 1);
        } else {
          query.append('page', 1);
        }
        if (query.has('orderBy')) {
          query.set('orderBy', 'price');
        } else {
          query.append('orderBy', 'price');
        }
        if (query.has('order')) {
          query.set('order', 'asc');
        } else {
          query.append('order', 'asc');
        }
        history.push(`/?${query.toString()}`);
        break;
      case 'Nhiều lượt xem nhất':
        if (query.has('page')) {
          query.set('page', 1);
        } else {
          query.append('page', 1);
        }
        if (query.has('orderBy')) {
          query.set('orderBy', 'views');
        } else {
          query.append('orderBy', 'views');
        }
        if (query.has('order')) {
          query.set('order', 'desc');
        } else {
          query.append('order', 'desc');
        }
        history.push(`/?${query.toString()}`);
        break;
      default:
        query.delete('orderBy');
        query.delete('order');
        history.push(`/?${query.toString()}`);
    }
  };

  const handleModeChange = (event, value) => {
    setMode(value);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={2}
      >
        <Typography
          className={classes.title}
          variant="h5"
          color="textPrimary"
        >
          Showing
          {' '}
          {posts.length}
          {' '}
          posts
        </Typography>
        <Box
          display="flex"
          alignItems="center"
        >
          <Button
            className={classes.sortButton}
            onClick={handleSortOpen}
            ref={sortRef}
          >
            {selectedSort}
            <ArrowDropDownIcon />
          </Button>
          <ToggleButtonGroup
            exclusive
            onChange={handleModeChange}
            size="small"
            value={mode}
          >
            <ToggleButton value="grid">
              <ViewModuleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Grid
        container
        spacing={3}
      >
        {posts.map((post) => (
          <Grid
            item
            key={post.id}
            md={mode === 'grid' ? 4 : 12}
            sm={mode === 'grid' ? 6 : 12}
            xs={12}
          >
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
      <Box
        mt={6}
        display="flex"
        justifyContent="center"
      >
        <Pagination
          count={Math.ceil(postCount / 6)}
          defaultPage={page}
          onChange={(event, value) => {
            query.set('page', value);
            history.push(`/?${query.toString()}`);
          }}
        />
      </Box>
      <Menu
        anchorEl={sortRef.current}
        className={classes.menu}
        onChange={handleSortChange}
        onClose={handleSortClose}
        open={openSort}
        elevation={1}
      >
        {sortOptions.map(
          (option) => (
            <MenuItem
              key={option}
              value={option}
              onClick={() => handleSortSelect(option)}
            >
              <ListItemText primary={option} />
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  getPosts: PropTypes.func,
  posts: PropTypes.array.isRequired,
  postCount: PropTypes.number.isRequired
};

export default Results;
