import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  Link,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import LockIcon from '@material-ui/icons/Lock';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    minHeight: '100%',
    paddingBottom: 80,
    paddingTop: 80
  },
  backButton: {
    marginLeft: theme.spacing(2)
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  icon: {
    backgroundColor: colors.green[500],
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64
  }
}));

function LoginView() {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitSuccess = () => {
    history.push('/');
  };
  const handleSubmitFail = (error) => {
    const errorMessage = error.message || 'Something went wrong';
    enqueueSnackbar(errorMessage, { variant: 'error' });
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Container maxWidth="sm">
        <Box
          mb={8}
          display="flex"
          alignItems="center"
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Button
            component={RouterLink}
            to="/"
            className={classes.backButton}
          >
            Trở về trang chủ
          </Button>
        </Box>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Avatar className={classes.icon}>
              <LockIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h2"
              color="textPrimary"
            >
              Đăng nhập
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
            >
              Nhập thông tin vào form bên dưới
            </Typography>
            <Box mt={4}>
              <LoginForm onSubmitSuccess={handleSubmitSuccess} onSubmitFail={handleSubmitFail} />
            </Box>
            <Box my={4}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              Tạo tài khoản mới
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default LoginView;
