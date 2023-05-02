import React, {
  lazy,
  Suspense
} from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import GuestRoute from './components/GuestRoute';
import MainLayout from './mainlayout';
import ApproveRoute from './components/ApproveRoute';

function Routes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <GuestRoute
          exact
          path="/login"
          component={lazy(() => import('src/views/auth/LoginView'))}
        />
        <GuestRoute
          exact
          path="/register"
          component={lazy(() => import('src/views/auth/RegisterView'))}
        />
        <Route
          path="*"
          render={(props) => (
            <MainLayout {...props}>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={lazy(() => import('src/views/posts/PostListView'))}
                />
                <Route
                  exact
                  path="/users"
                  component={lazy(() => import('src/views/users/CustomerListView'))}
                />
                <Route
                  exact
                  path="/posts/"
                  component={lazy(() => import('src/views/posts/PostAllView'))}
                />
                <ApproveRoute
                  exact
                  path="/posts/new"
                  component={lazy(() => import('src/views/posts/PostCreateView'))}
                />
                <Route
                  exact
                  path="/posts/:pid"
                  component={lazy(() => import('src/views/posts/PostDetailView'))}
                />
                <Route
                  exact
                  path="/users/:uid"
                  component={lazy(() => import('src/views/users/ProfileView'))}
                />
              </Switch>
            </MainLayout>
          )}
        />
      </Switch>
    </Suspense>
  );
}

export default Routes;
