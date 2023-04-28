import React from 'react';
// import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'src/utils/axios';
import moment from 'moment';
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
import { KeyboardDatePicker } from '@material-ui/pickers';
import FilesDropzone from 'src/components/FilesDropzone';

const useStyles = makeStyles(() => ({
  root: {},
  datePicker: {
    marginTop: 25
  }
}));

function PostCreateForm({ className, ...rest }) {
  const classes = useStyles();
  // const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        title: '',
        province: 'Bắc Ninh',
        district: 'Yên Phong',
        commune: 'Văn Môn',
        address: 'thôn Mẫn Xá',
        species: '',
        genre: '',
        price: '',
        weight: '',
        age: '',
        vaccination: false,
        description: '',
        images: [],
        endDate: moment(new Date()).add(1, 'weeks'),
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required('Vui lòng nhập tiêu đề'),
        species: Yup.string().oneOf(['Chó', 'Mèo', 'Chuột Hamster', 'Khác']).required('Vui lòng chọn loài'),
        address: Yup.string(),
        genre: Yup.string().oneOf(['Đực', 'Cái']).required('Vui lòng chọn giới tính'),
        price: Yup.number().positive('Must be a positive').required('Vui lòng nhập giá phòng'),
        weight: Yup.number().positive('Must be a positive').required('Vui lòng nhập cân nặng'),
        age: Yup.number().positive('Must be a positive').required('Vui lòng nhập số tuổi'),
        vaccination: Yup.boolean(),
        images: Yup.array().min(1, 'Upload tối thiểu 1 ảnh').required('Vui lòng đăng ảnh minh họa'),
        endDate: Yup.date().min(moment(new Date()).add(6, 'days'), 'Thời gian đăng bài tối thiểu 1 tuần').required('Vui lòng nhập ngày hết hạn'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        axios.post(`${process.env.REACT_APP_API}/posts/new`, values)
          .then(() => {
            setStatus({ success: true });
            setSubmitting(false);
            enqueueSnackbar('Đăng bài thành công', {
              variant: 'success'
            });
            console.log('Đăng bài thành công');
            // history.push(`/posts/${response.data.postId}`);
          })
          .catch((err) => {
            setErrors({ submit: err.message });
            setStatus({ success: false });
            setSubmitting(false);
            console.log(err);
            enqueueSnackbar(err.response.data.message || 'Không thể tạo bài đăng', {
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
        setFieldTouched,
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
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      className={classes.datePicker}
                      error={Boolean(touched.endDate && errors.endDate)}
                      helperText={touched.endDate && errors.endDate}
                      label="Thời gian hiển thị"
                      format="DD/MM/YYYY"
                      name="endDate"
                      inputVariant="outlined"
                      variant="inline"
                      fullWidth
                      value={values.endDate}
                      onBlur={() => setFieldTouched('endDate')}
                      onClose={() => setFieldTouched('endDate')}
                      onAccept={() => setFieldTouched('endDate')}
                      onChange={(date) => setFieldValue('endDate', date)}
                    />
                  </Grid>
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <TextField
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                      fullWidth
                      label="Mô tả (nên ghi rõ loài, giống,...)"
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
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.species && errors.species)}
                          helperText={touched.species && errors.species}
                          select
                          fullWidth
                          label="Loài"
                          defaultValue=""
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
                            endAdornment: <InputAdornment position="end">kilogram</InputAdornment>
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
                            endAdornment: <InputAdornment position="end">tháng tuổi</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.genre && errors.genre)}
                          helperText={touched.genre && errors.genre}
                          select
                          fullWidth
                          label="Giới tính"
                          value={values.genre}
                          onChange={(e) => setFieldValue('genre', e.target.value)}
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
              <Box mt={3}>
                <Card>
                  <CardHeader title="Địa chỉ" />
                  <Divider />
                  <CardContent>
                    <Grid
                      item
                    />
                  </CardContent>
                </Card>
              </Box>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Hình ảnh" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone onUploaded={(e) => {
                      setFieldValue('images', e);
                    }}
                    />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          {Boolean(touched.images && errors.images) && (
            <Box mt={3}>
              <FormHelperText error>
                {touched.images && errors.images}
              </FormHelperText>
            </Box>
          )}
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
              Đăng bài
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

PostCreateForm.propTypes = {
  className: PropTypes.string
};

export default PostCreateForm;
