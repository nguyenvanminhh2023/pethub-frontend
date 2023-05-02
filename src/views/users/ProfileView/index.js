import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import Header from './Header';
import Posts from './Posts';

const tabs = [
  { value: 'favorite', label: 'Yêu thích' },
  { value: 'posts', label: 'Bài đăng của tôi' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

function ProfileView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { uid } = useParams();
  const [currentTab, setCurrentTab] = useState('favorite');
  const [user, setUser] = useState(null);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
    event.preventDefault();
  };

  const getPosts = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/users/${uid}`)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {

      });
  }, [isMountedRef]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!user) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Profile"
    >
      <Header user={user} />
      <Container maxWidth="lg">
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            textColor="secondary"
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
        <Box
          py={3}
          pb={6}
        >
          {currentTab === 'posts' && <Posts uid={uid} variant="posts" />}
          {currentTab === 'favorite' && <Posts uid={uid} variant="favorite" />}
        </Box>
      </Container>
    </Page>
  );
}

export default ProfileView;
