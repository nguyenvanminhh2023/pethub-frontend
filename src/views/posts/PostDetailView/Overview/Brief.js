import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  makeStyles,
  CardHeader,
  CardMedia,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GitHubIcon from '@material-ui/icons/GitHub';
import PetsIcon from '@material-ui/icons/Pets';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ColorizeIcon from '@material-ui/icons/Colorize';

const useStyles = makeStyles((theme) => ({
  root: {},
  chip: {
    marginBottom: 8
  },
  image: {
    height: 350
  },
  imageRoot: {
    position: 'relative',
    '&:before': {
      position: 'absolute',
      backgroundImage: 'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)'
    }
  },
  image1Container: {
    height: 400,
    [theme.breakpoints.down('md')]: {
      height: 500
    },
    [theme.breakpoints.down('xs')]: {
      height: 250
    }
  },
  image2Container: {
    height: 200,
    [theme.breakpoints.down('md')]: {
      height: 0
    }
  },
  image3Container: {
    height: 200,
    [theme.breakpoints.down('md')]: {
      height: 0
    },
  },
  allWiewButton: {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: '#ffffff',
    color: theme.palette.common.dark,
    [theme.breakpoints.down('md')]: {
      bot: theme.spacing(2),
      top: 'auto'
    },
    '&:hover': {
      backgroundColor: '#66c2ff'
    }
  },
  image1: {
    maxWidth: '99%',
    minWidth: '99%',
    height: 400,
    [theme.breakpoints.down('md')]: {
      height: 500
    },
    [theme.breakpoints.down('xs')]: {
      height: 250
    },
  },
  image2: {
    maxWidth: '100%',
    minWidth: '100%',
    height: 196,
    [theme.breakpoints.down('md')]: {
      minHeight: 0,
      height: 0
    },
  },
  image3: {
    maxWidth: '100%',
    minWidth: '100%',
    height: 200,
    [theme.breakpoints.down('md')]: {
      minHeight: 0,
      height: 0
    },
  },
}));

function Brief({
  post, handleImageOpen, className, ...rest
}) {
  const classes = useStyles();

  return (
    <>
      <Box mb={3}>
        <Card
          className={clsx(classes.root, className)}
          {...rest}
        >
          <CardHeader
            title="Hình ảnh"
          >
            <Typography
              variant="h4"
              color="textPrimary"
            >
              Hình ảnh
            </Typography>
          </CardHeader>
          <CardContent>
            <Grid
              container
              className={clsx(classes.imageRoot, className)}
            >
              <Grid
                item
                className={clsx(classes.image1Container, className)}
                xl={7}
                lg={7}
                xs={12}
              >
                <CardMedia
                  className={classes.image1}
                  image={post.images[0]}
                />
              </Grid>
              <Grid
                item
                xl={5}
                lg={5}
                xs={12}
              >
                <Grid
                  container
                >
                  <Grid
                    item
                    className={clsx(classes.image2Container, className)}
                    md={12}
                  >
                    <CardMedia
                      className={classes.image2}
                      image={post.images[1]}
                    />
                  </Grid>
                  <Grid
                    item
                    className={clsx(classes.image3Container, className)}
                    md={12}
                  >
                    <CardMedia
                      className={classes.image3}
                      image={post.images[2]}
                    />
                  </Grid>
                </Grid>
                <Button
                  className={classes.allWiewButton}
                  variant="contained"
                  startIcon={<ViewComfyIcon className={classes.ViewComfyIcon} />}
                  onClick={handleImageOpen}
                >
                  Hiển thị tất cả
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <Typography
                  variant="h4"
                  color="textPrimary"
                >
                  Địa chỉ
                </Typography>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ marginTop: 3 }}
                >
                  {post.address}
                </Typography>
                <Box mt={1}>
                  <Typography
                    variant="h4"
                    color="textPrimary"
                  >
                    Thông tin chung
                  </Typography>
                  <Grid
                    container
                  >
                    <Grid
                      item
                      sm={6}
                      md={6}
                    >
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <GitHubIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Loài" secondary={post.species} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <DragIndicatorIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Số lượng" secondary={post.quantity} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <PetsIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Giới tính" secondary={`${post.gender} kg`} />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid
                      item
                      sm={6}
                      md={6}
                    >
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <LinearScaleIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Cân nặng" secondary={`${post.weight} kg`} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <DateRangeIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Tuổi" secondary={`${post.age} tháng`} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <AttachMoneyIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Giá tiền" secondary={`${post.price} VNĐ`} />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid>
                    {post.vaccination && (
                    <Chip
                      className={clsx(classes.chip, className)}
                      icon={<ColorizeIcon />}
                      label="Đã tiêm phòng"
                      clickable
                      color="primary"
                      variant="outlined"
                    />
                    )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Box mt={0.6}>
              <Typography
                variant="h4"
                color="textPrimary"
              >
                Thông tin thêm
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                style={{ marginTop: 3 }}
              >
                {post.description}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography
              variant="h3"
              color="textPrimary"
              style={{ marginBottom: 5 }}
            >
              Vị trí
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginBottom: 10 }}
            >
              {post.address}
            </Typography>
            {/* <Maps marker={place.location} /> */}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

Brief.propTypes = {
  post: PropTypes.object.isRequired,
  handleImageOpen: PropTypes.func,
  className: PropTypes.string
};

export default Brief;
