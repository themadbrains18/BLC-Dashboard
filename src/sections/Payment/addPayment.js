
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';

import * as yup from 'yup'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { paymentListCreate } from '../../Actions/paymentActions';


const AddPayment = ({ abc, tokenid }) => {
  // empty data for form
  const dispatch = useDispatch()
 
  const schema = yup.object().shape({
    payment_method: yup.string().required('This field is required'),

    icon: yup.mixed().required('Icon is required'),
    numberOfFields: yup.string()
      .required('Number of tickets is required'),
    paymentFields: yup.array().of(
      yup.object().shape({
        label: yup.string(),
        type: yup.string(),
        required: yup.string(),
        ifOptional: yup.string(),
        name: yup.string(),
        placeholder: yup.string(),
        errorMsg: yup.string(),
      })),
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema)
  })

  const { fields, append, remove } = useFieldArray({ name: 'paymentFields', control });
  const numberOfFields = watch('numberOfFields');

  useEffect(() => {
    // update field array when ticket number changed
    console.log(numberOfFields, "===========numberOfFields");
    const newVal = parseInt(numberOfFields || 0);
    const oldVal = fields.length;
    if (newVal > oldVal) {
      // append tickets to field array
      for (let i = oldVal; i < newVal; i++) {
        append({ label: '', type: '',required: '', ifOptional: '', name: '', placeholder: '', errorMsg: '' });
      }
    } else {
      // remove tickets from field array
      for (let i = oldVal; i > newVal; i--) {
        remove(i - 1);
      }
    }
  }, [numberOfFields]);

  const [logo, setlogo] = useState(false)

  const changeLogo = () => {
    setlogo(true)
  }

  let submitForm = async (data, e) => {
    console.log("===========data",data.icon.name);
    e.preventDefault(e)

    if (Object.entries(data['paymentFields']).length > 0) {
      Object.entries(data['paymentFields']).forEach(entry => {
        console.log("===========entry",entry)
      })
    }
    let fields = []
    let obj = {
      label: data.label,
      type: data.type,
      required: data.required,
      ifOptional: data.ifOptional,
      name: data.name,
      placeholder: data.placeholder,
      errorMsg: data.errorMsg,

    }

    fields.push(obj)
    data['region'] = 'india'
    data['fields'] = data.paymentFields;

    //   /** create new record record */
    // let formData = new FormData(e.target);
    // let uploadFiles = formData.get('icon');
    // var reader = new FileReader();
    // reader.readAsDataURL(uploadFiles);
    // reader.onload = function () {
      data.icon = data.icon.name;
      dispatch(paymentListCreate(data)).then((response) => {
        reset();
        console.log("response", response)
      }).catch(err => {
        console.log("err", err)
      });

    // }

  

  }



  return (
    <Paper
      sx={{
        margin: 'auto',
        marginTop: '20px'
      }}
    >
      <Box
        component="form"
        px={3}
        py={2}
        maxWidth="750px"
        width="100%"
        alignContent="center"
        onSubmit={handleSubmit(submitForm)}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '10px 30px',
          }}
        >
          <Typography variant="h6" align="center" margin="dense">
            Add Payment Method
          </Typography>
          <IconButton onClick={() => abc(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>

            <TextField
              id="payment_method"
              label=" Add Payment Name"
              fullWidth
              margin="dense"

              {...register('payment_method')}
              error={errors.payment_method ? true : false}
            />


            <Typography variant="inherit" color="textSecondary">
              {errors.payment_method?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <>
              {!logo ? (
                <>
                  <Typography variant="inherit" color="textSecondary">
                    Add Icon
                  </Typography>
                  <Button
                    variant="contained"
                    endIcon={<EditIcon />}
                    onClick={changeLogo}
                  >
                    Change Logo
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    id="icon"
                    name="icon"
                    label="Icon"
                    type="file"
                    fullWidth
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setValue('icon', e.target.files[0], {
                        shouldValidate: true,
                      })
                    }}
                    error={errors.icon ? true : false}
                  />
                </>
              )}
            </>


            <Typography variant="inherit" color="textSecondary">
              {errors.icon?.message}
            </Typography>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '10px 10px',
              width: '100%'
            }}
          >
            <Typography variant="h6" align="center" margin="dense">
              Add Fields
            </Typography>
            <IconButton onClick={() => abc(false)}>
              <AddIcon />
            </IconButton>
          </Box>
          <div className="card-body " style={{
            width: "100%",
            marginBottom: "20px"
          }}>
            <div className="form-row">
              <div className="form-group">
                <label style={{marginRight:'20px'}}>Number of Fields</label>
                <select name="numberOfFields" {...register('numberOfFields')} className={`form-control ${errors.numberOfFields ? 'is-invalid' : ''}`}>
                  {['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
                    <option key={i} value={i}>{i}</option>
                  )}
                </select>
                <div className="invalid-feedback">{errors.numberOfFields?.message}</div>
              </div>
            </div>
          </div>
          {fields.map((item, i) => (
            <><Typography>Add Fields {i+1}</Typography>
              <Grid container spacing={1}>


                <Grid item xs={12} sm={3}>
                  <TextField
                    sx={{
                      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                        display: 'none',
                      },
                    }}
                    type="label"
                    {...register(`paymentFields.${i}.label`)}
                    name={`paymentFields[${i}][label]`}
                    required
                    id='label'
                    label="label"
                    fullWidth
                    margin="dense" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    sx={{
                      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                        display: 'none',
                      },
                    }}
                    {...register(`paymentFields.${i}.type`)}
                    name={`paymentFields[${i}][type]`}
                    type="text"
                    required
                    id="type"
                    label="type"
                    fullWidth
                    margin="dense" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    {...register(`paymentFields.${i}.required`)}
                    name={`paymentFields[${i}][required]`}
                    id='required'
                    label="Required"
                    fullWidth
                    margin="dense" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id='ifOptional'
                    required
                    {...register(`paymentFields.${i}.ifOptional`)}
                    name={`paymentFields[${i}][ifOptional]`}
                    label="ifOptional"
                    fullWidth
                    margin="dense" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id='name'
                    required
                    {...register(`paymentFields.${i}.name`)}
                    name={`paymentFields[${i}][name]`}
                    label="name"
                    fullWidth
                    margin="dense" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id='placeholder'
                    required
                    {...register(`paymentFields.${i}.placeholder`)}
                    name={`paymentFields[${i}][placeholder]`}
                    label="placeholder"
                    fullWidth
                    margin="dense" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id='errorMsg'
                    required
                    {...register(`paymentFields.${i}.errorMsg`)}
                    name={`paymentFields[${i}][errorMsg]`}
                    label="errorMsg"
                    fullWidth
                    margin="dense" />
                </Grid>
              </Grid></>
          ))}
        </Grid>

        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Paper>
  )
}
export default AddPayment
