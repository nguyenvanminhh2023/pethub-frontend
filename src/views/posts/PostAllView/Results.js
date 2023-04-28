import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  Link,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  makeStyles,
  TableContainer
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import getInitials from 'src/utils/getInitials';
import Label from 'src/components/Label';

const tabs = [
  {
    value: 'all',
    label: 'Tất cả'
  },
  {
    value: 'unApproved',
    label: 'Chưa duyệt'
  },
];

function applyFilters(posts, filters) {
  return posts.filter((post) => {
    let matches = true;

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && post.isApproved === value) {
        matches = false;
      }
    });

    return matches;
  });
}
const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

function Results({
  className, posts, approvePost, ...rest
}) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');
  const [filters, setFilters] = useState({
    unapproved: null,
  });

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      unapproved: null,
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }
    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const filteredPosts = applyFilters(posts, filters);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
          />
        ))}
      </Tabs>
      <Divider />
      <PerfectScrollbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Tên bài
                </TableCell>
                <TableCell>
                  Chủ sở hữu
                </TableCell>
                <TableCell>
                  Địa chỉ
                </TableCell>
                <TableCell>
                  Trạng Thái
                </TableCell>
                <TableCell>
                  Số lượng
                </TableCell>
                <TableCell>
                  Lượt xem
                </TableCell>
                <TableCell>
                  Sao
                </TableCell>
                <TableCell align="right">
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow
                  hover
                  key={post.id}
                >
                  <TableCell>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      to={`/posts/${post.id}`}
                      variant="h6"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      alignItems="center"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={post.creator.avatar}
                      >
                        {getInitials(post.creator.avatar)}
                      </Avatar>
                      <div>
                        <Link
                          color="inherit"
                          component={RouterLink}
                          to={`/users/${post.creator.id}`}
                          variant="h6"
                        >
                          {post.creator.username}
                        </Link>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {post.creator.email}
                        </Typography>
                      </div>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {post.address}
                  </TableCell>
                  <TableCell>
                    <Label color={(!post.isApproved) ? 'error' : 'success'}>
                      {(!post.isApproved)
                        ? 'Chưa duyệt'
                        : 'Đã duyệt'}
                    </Label>
                  </TableCell>
                  <TableCell>
                    <Label color={(!post.available) ? 'error' : 'success'}>
                      {(!post.available)
                        ? 'Hết'
                        : 'Còn'}
                    </Label>
                  </TableCell>
                  <TableCell>
                    {/* {post.views} */}
                    0
                  </TableCell>
                  <TableCell>
                    {/* {post.star} */}
                    0
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => approvePost(post.id)}
                    >
                      <CheckIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PerfectScrollbar>
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  approvePost: PropTypes.func,
  posts: PropTypes.array
};

Results.defaultProps = {
  posts: []
};

export default Results;
