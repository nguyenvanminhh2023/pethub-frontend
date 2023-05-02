import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tabs,
  Tab,
  makeStyles
} from '@material-ui/core';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import { useParams } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import Overview from './Overview';
import Reviews from './Reviews';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function PostDetailView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { pid } = useParams();
  const [currentTab, setCurrentTab] = useState('overview');
  const [post, setPost] = useState(null);
  const [creator, setCreator] = useState(null);
  const tabs = [
    { value: 'overview', label: 'Thông tin' },
    { value: 'reviews', label: 'Đánh giá' },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getPost = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/posts/${pid}`)
      .then((response) => {
        if (isMountedRef.current) {
          setCreator(response.data.creator);
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

  const approvePost = (id) => {
    axios
      .patch(`${process.env.REACT_APP_API}/posts/${id}/approve`)
      .then(() => {
        enqueueSnackbar('Duyệt bài thành công', {
          variant: 'success'
        });
        getPost();
      })
      .catch(() => {
        enqueueSnackbar('Duyệt bài không thành công', {
          variant: 'error'
        });
      });
  };

  const setAvailablePost = (id) => {
    axios
      .patch(`${process.env.REACT_APP_API}/posts/${id}/available`)
      .then(() => {
        enqueueSnackbar('Thay đổi trạng thái thành công', {
          variant: 'success'
        });
        getPost();
      })
      .catch(() => {
        enqueueSnackbar('Thay đổi trạng thái không thành công', {
          variant: 'error'
        });
      });
  };

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (!post) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={post.title}
    >
      <Container maxWidth="lg">
        <Header post={post} approvePost={approvePost} setAvailablePost={setAvailablePost} />
        <Box mt={3}>
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
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'overview' && <Overview post={post} creator={creator} />}
          {currentTab === 'reviews' && <Reviews reviews={post.reviews} />}
        </Box>
      </Container>
    </Page>
  );
}

export default PostDetailView;
