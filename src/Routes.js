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
              </Switch>
            </MainLayout>
          )}
        />
      </Switch>
    </Suspense>
  );
}

export default Routes;
