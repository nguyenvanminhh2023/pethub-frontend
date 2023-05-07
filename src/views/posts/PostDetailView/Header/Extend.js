import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// import { Alert } from '@material-ui/lab';
import {
  Box,
  Button,
  Dialog,
  Typography,
  makeStyles
} from '@material-ui/core';
import _ from 'lodash';
import * as Yup from 'yup';
import axios from 'src/utils/axios';
import { Formik } from 'formik';
import { KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  datePicker: {
    marginTop: 25
  }
}));

function Extend({
  open,
  onClose,
  onApply,
  className,
  post,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
    >
      <Formik
        initialValues={_.omit(post, ['address', 'images', 'id', 'approved', 'available', 'creator', 'views', 'star'])}
        validationSchema={Yup.object().shape({
          endDate: Yup.date().min(post.endDate, 'Không thể lùi thời hạn đăng bài').required('End date is required'),
        })}
        onSubmit={(values) => {
          axios
            .patch(`${process.env.REACT_APP_API}/posts/${post.id}/extend`, {
              extendDate: values.endDate,
              pid: post.id
            })
            .then(() => enqueueSnackbar('Gia hạn bài thành công', {
              variant: 'success'
            }))
            .catch((err) => {
              enqueueSnackbar(err.response.data.message || 'Không thể gia hạn', {
                variant: 'error'
              });
            })
            .finally(() => onApply());
        }}
      >
        {({
          errors,
          setFieldValue,
          setFieldTouched,
          touched,
          values,
          handleSubmit
        }) => (
          <form
            onSubmit={handleSubmit}
            className={clsx(classes.root, className)}
            {...rest}
          >
            <Typography
              align="center"
              className={classes.title}
              gutterBottom
              variant="h3"
              color="textPrimary"
            >
              Gia hạn bài đăng
            </Typography>
            <Box mt={3}>
              <KeyboardDatePicker
                className={classes.datePicker}
                error={Boolean(touched.endDate && errors.endDate)}
                helperText={touched.endDate && errors.endDate}
                label="Thời gian hiển thị"
                format="DD/MM/YYYY"
                name="endDate"
                inputVariant="outlined"
                variant="inline"
                autoOk
                fullWidth
                value={values.endDate}
                onBlur={() => setFieldTouched('endDate')}
                onClose={() => setFieldTouched('endDate')}
                onAccept={() => setFieldTouched('endDate')}
                onChange={(d) => {
                  setFieldValue('endDate', d);
                }}
              />
            </Box>
            <Box
              mt={3}
              p={3}
            >
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
              >
                Hoàn tất
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

Extend.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

Extend.defaultProps = {
  onApply: () => {},
  onClose: () => {}
};

export default Extend;
