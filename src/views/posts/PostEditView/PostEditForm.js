import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'src/utils/axios';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  datePicker: {
    marginTop: 25
  }
}));

function PostEditForm({ className, post, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Formik
      initialValues={_.omit(post, ['address', 'images', 'id', 'approved', 'available', 'creator', 'views', 'star'])}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required('Title is required'),
        species: Yup.string().oneOf(['Chó', 'Mèo', 'Chuột Hamster', 'Khác']).required('Species is required'),
        quantity: Yup.number().positive('Must be a positive').required('Number is required'),
        price: Yup.number().positive('Must be a positive').required('Price is required'),
        weight: Yup.number().positive('Must be a positive').required('Weight is required'),
        age: Yup.number().positive('Must be a positive').required('Age is required'),
        gender: Yup.string().oneOf(['Đực', 'Cái']).required('Gender is required'),
        vaccination: Yup.boolean(),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        axios.put(`${process.env.REACT_APP_API}/posts/${post.id}/edit`, values)
          .then(() => {
            setStatus({ success: true });
            setSubmitting(false);
            enqueueSnackbar('Chỉnh sửa bài thành công', {
              variant: 'success'
            });
            history.push(`/posts/${post.id}`);
          })
          .catch((err) => {
            setErrors({ submit: err.message });
            setStatus({ success: false });
            setSubmitting(false);
            enqueueSnackbar(err.response.data.message || 'Không thể sửa bài', {
              variant: 'error'
            });
          });
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={12}
            >
              <Card>
                <CardContent>
                  <TextField
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    fullWidth
                    label="Tên bài đăng"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    variant="outlined"
                  />
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <TextField
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                      fullWidth
                      label="Mô tả"
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </Box>
                  {(touched.description && errors.description) && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.description}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Thông tin chung" />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        xs={12}
                        md={12}
                      />
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.species && errors.species)}
                          helperText={touched.species && errors.species}
                          select
                          fullWidth
                          label="Loài"
                          value={values.species}
                          onChange={(e) => setFieldValue('species', e.target.value)}
                          variant="outlined"
                        >
                          <MenuItem value="Chó">Chó</MenuItem>
                          <MenuItem value="Mèo">Mèo</MenuItem>
                          <MenuItem value="Chuột Hamster">Chuột Hamster</MenuItem>
                          <MenuItem value="Khác">Khác</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.quantity && errors.quantity)}
                          helperText={touched.quantity && errors.quantity}
                          fullWidth
                          label="Số lượng"
                          name="quantity"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.quantity}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.price && errors.price)}
                          helperText={touched.price && errors.price}
                          fullWidth
                          label="Giá cả"
                          name="price"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.price}
                          variant="outlined"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.weight && errors.weight)}
                          helperText={touched.weight && errors.weight}
                          fullWidth
                          label="Cân nặng"
                          name="weight"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.weight}
                          variant="outlined"
                          InputProps={{
                            // eslint-disable-next-line react/jsx-one-expression-per-line
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.age && errors.age)}
                          helperText={touched.age && errors.age}
                          fullWidth
                          label="Tuổi"
                          name="age"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.age}
                          variant="outlined"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">tháng</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.gender && errors.gender)}
                          helperText={touched.gender && errors.gender}
                          select
                          fullWidth
                          label="Giới tính"
                          value={values.gender}
                          onChange={(e) => setFieldValue('gender', e.target.value)}
                          variant="outlined"
                        >
                          <MenuItem value="Đực">Đực</MenuItem>
                          <MenuItem value="Cái">Cái</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <Box>
                          <FormControlLabel
                            control={(
                              <Checkbox
                                checked={values.vaccination}
                                onChange={handleChange}
                                value={values.vaccination}
                                name="vaccination"
                              />
                            )}
                            label="Đã tiêm phòng"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Hoàn tất
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

PostEditForm.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object
};

export default PostEditForm;
