import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project-imports
import IconButton from 'components/@extended/IconButton';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { ThemeMode } from 'config';

// assets
import { Camera, Trash } from 'iconsax-react';
import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';

// constant
const getInitialValues = (customer) => {
  const newCustomer = {
    name: '',
    email: '',
    location: '',
    orderStatus: ''
  };

  if (customer) {
    newCustomer.name = customer.fatherName;
    newCustomer.location = customer.address;
    return _.merge({}, newCustomer, customer);
  }

  return newCustomer;
};

const allStatus = ['Tamil Nadu', 'Kerala', 'Karnataka'];

// ==============================|| CUSTOMER - ADD / EDIT ||============================== //

const CustomerListPage = ({ customer, onCancel }) => {
  const theme = useTheme();
  const isCreating = !customer;

  const [selectedImage, setSelectedImage] = useState(undefined);

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const CustomerSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Name is required'),
    orderStatus: Yup.string().required('Status is required'),
    phone: Yup.string().required('Phone number is required'),
    postal: Yup.string().required('Postal Code is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    address: Yup.string().required('Street line is required'),
    bank: Yup.string().required('Bank Name is required'),
    branch: Yup.string().required('Branch is required'),
    accno: Yup.string().required('Account Number is required'),
    accounter: Yup.string().required('Accounter Name is required'),
    ifsc: Yup.string().required('IFSC code is required'),
    email: Yup.string().max(255).required('Email is required').email('Must be a valid email'),
    location: Yup.string().max(500)
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    onCancel();
  };

  const formik = useFormik({
    initialValues: getInitialValues(customer),
    validationSchema: CustomerSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        if (customer) {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Customer update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Customer added successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        }

        setSubmitting(false);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container>
                <Grid item xs={12} md={1.5}>
                  <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <FormLabel
                      htmlFor="change-avtar"
                      sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        '&:hover .MuiBox-root': { opacity: 1 },
                        cursor: 'pointer'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Stack spacing={0.5} alignItems="center">
                          <Camera style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                          <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                        </Stack>
                      </Box>
                    </FormLabel>
                    <TextField
                      type="file"
                      id="change-avtar"
                      placeholder="Outlined"
                      variant="outlined"
                      sx={{ display: 'none' }}
                      onChange={(e) => setSelectedImage(e.target.files?.[0])}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" style={{ textDecoration: 'underline', marginBottom: '5px' }}>
                    Company Contact Information
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-name">Organization/Business Name</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-name"
                          placeholder="Enter Organization/Business name"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                    </Grid>
                    <Divider />
                    <Typography variant="subtitle1" style={{ textDecoration: 'underline', marginBottom: '5px', marginTop: '15px' }}>
                      Company Address
                    </Typography>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">Street address</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter Street address"
                          {...getFieldProps('address')}
                          error={Boolean(touched.address && errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">Street address line 2</InputLabel>
                        <TextField fullWidth id="customer-email" placeholder="Enter Street address line 2" />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-orderStatus">District</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding"
                            displayEmpty
                            {...getFieldProps('orderStatus')}
                            onChange={(event) => setFieldValue('orderStatus', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle1">Select District</Typography>;
                              }

                              return <Typography variant="subtitle2">{selected}</Typography>;
                            }}
                          >
                            {allStatus.map((column) => (
                              <MenuItem key={column} value={column}>
                                <ListItemText primary={column} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.state && errors.state && (
                          <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                            {errors.state}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">City</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter city"
                          {...getFieldProps('city')}
                          error={Boolean(touched.city && errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">Postal/(Zip) Code</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter postal code"
                          {...getFieldProps('postal')}
                          error={Boolean(touched.postal && errors.postal)}
                          helperText={touched.postal && errors.postal}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="subtitle1" style={{ textDecoration: 'underline', marginBottom: '10px', marginTop: '15px' }}>
                        Point of Contact
                      </Typography>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">First Name</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter first name"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={6} marginTop={'45px'}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">Last Name</InputLabel>
                        <TextField fullWidth id="customer-email" placeholder="Enter last name" />
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">Phone Number</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter phone number"
                          {...getFieldProps('phone')}
                          error={Boolean(touched.phone && errors.phone)}
                          helperText={touched.phone && errors.phone}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">Email Address</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter email address"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" style={{ textDecoration: 'underline', marginBottom: '10px', marginTop: '15px' }}>
                        Banking Information
                      </Typography>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">Bank Name</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter Bank name"
                          {...getFieldProps('bank')}
                          error={Boolean(touched.bank && errors.bank)}
                          helperText={touched.bank && errors.bank}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={6} marginTop={'45px'}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">Branch Name</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter Branch name"
                          {...getFieldProps('branch')}
                          error={Boolean(touched.branch && errors.branch)}
                          helperText={touched.branch && errors.branch}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">Account Number</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter account number"
                          {...getFieldProps('accno')}
                          error={Boolean(touched.accno && errors.accno)}
                          helperText={touched.accno && errors.accno}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">Accounter Name</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter Accounter name"
                          {...getFieldProps('email')}
                          error={Boolean(touched.accounter && errors.accounter)}
                          helperText={touched.accounter && errors.accounter}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">IFSC Code</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-email"
                          placeholder="Enter IFSC code"
                          {...getFieldProps('ifsc')}
                          error={Boolean(touched.ifsc && errors.ifsc)}
                          helperText={touched.ifsc && errors.ifsc}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="customer-email">Upi id (optional)</InputLabel>
                        <TextField fullWidth id="customer-email" placeholder="Enter Upi Id" />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} marginTop={'20px'}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle1">Make Contact Info Public</Typography>
                          <Typography variant="caption" color="textSecondary">
                            Means that anyone viewing your profile will be able to see your contacts details
                          </Typography>
                        </Stack>
                        <FormControlLabel control={<Switch defaultChecked sx={{ mt: 0 }} />} label="" labelPlacement="start" />
                      </Stack>
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {!isCreating && (
                    <Tooltip title="Delete Customer" placement="top">
                      <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                        <Trash variant="Bold" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      {customer ? 'Edit' : 'Submit'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {!isCreating && <AlertCustomerDelete title={customer.fatherName} open={openAlert} handleClose={handleAlertClose} />}
    </>
  );
};

CustomerListPage.propTypes = {
  customer: PropTypes.any,
  onCancel: PropTypes.func
};
export default CustomerListPage;
