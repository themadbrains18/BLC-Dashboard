
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  IconButton,
  Checkbox as MuiCheckbox,
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'



import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import network from '../../networks.json'
import React, { useEffect, useState } from 'react'
import {
  tokenListCreate,
  tokenUpdateRequest,
  gettokenbyid,
} from '../../Actions/tokenActions'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom';

const tokens = [
  {
    value: 'global',
    label: 'Global',
  },
  {
    value: 'mannual',
    label: 'Mannual',
  },
]

const TokenForm = ({ abc, tokenid }) => {
  // empty data for form

  const redirect = useNavigate()

  const [emptyData, SetEmptyData] = useState({
    coinName: '',
    confirmations: 0,
    decimals: 0,
    image: '',
    fullName: '',
    tokenType: '',
    minimum_withdraw: 0,
    networks: {}
  })

  const dispatch = useDispatch()
  const [open, setOpen] = useState({
    '63218947d2e3551816b9b8b0': false,
    '6329776b201dd027dee16342': false,
    '63218707d2e3551816b9b8af': false,
  })

  const createForm=React.useCallback(()=>{
    if (tokenid !== '') {
      ; (async () => {
        let data = await dispatch(gettokenbyid(tokenid))

        let group = {}
        let openField = open

        if (data[0].networks.length > 0) {
          data[0].networks.forEach((ele, index) => {
            open[ele._id] = true

            setValue(ele._id, true);
            setValue(`networks.${ele._id}.abi`, ele?.abi)
            setValue(`networks.${ele._id}.contract`, ele?.contract)
            setValue(`networks.${ele._id}.decimalNum`, ele?.decimalNum)
            setValue(`networks.${ele._id}.fee`, ele?.fee)

            group[ele._id] = {
              abi: ele?.abi,
              contract: ele?.contract,
              decimalNum: ele?.decimalNum,
              fee: ele?.fee
            }

          })
        }
        data[0].networks = group
        setOpen(openField)
        SetEmptyData(data[0])
        Object.entries(data[0]).forEach(entry => {
          const [key, value] = entry;
          if (key === 'networks') return;
          console.log(key, value);
          setValue(key, value)
        });

      })()
    }
  },[dispatch,open,tokenid])
  useEffect(() => {

    /// fill form when user update request
    createForm()
  
  }, [createForm])



  const schema = yup.object().shape({
    coinName: yup.string().required('This field is required'),
    confirmations: yup.number().positive().typeError('Amount must be a number'),
    decimals: yup.number().positive().typeError('Amount must be a number'),
    image: yup.mixed().required('Image is required'),
    fullName: yup.string().required('This field is required'),
    minimum_withdraw: yup
      .number()
      .positive()
      .typeError('Amount must be a number'),
    tokenType: yup.string().required('This field is required'),
    Binance: yup.object().shape({
      name: yup.string(),
      decimalNum: yup.number().positive(),
      fee: yup.number().positive(),
      contract: yup.string(),
      abi: yup.string(),
    }),
    Ethereum: yup.object().shape({
      name: yup.string(),
      decimalNum: yup.number().positive(),
      fee: yup.number().positive(),
      contract: yup.string(),
      abi: yup.string(),
    }),
    Tron: yup.object().shape({
      name: yup.string(),
      decimalNum: yup.number().positive(),
      fee: yup.number().positive(),
      contract: yup.string(),
      abi: yup.string(),
    }),

    // chooseCb: yup.array().required("Field must have at least 1 item").min(1).nullable(),
  })

  const {
    register,
    handleSubmit,
    setValue,

    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: emptyData
  })

  const handleChange = (event, feildName) => {
    setOpen((prevalue) => {
      return {
        ...prevalue,
        [feildName]: event.target.checked,
      }
    })
  }

  const [logo, setlogo] = useState(false)

  const changeLogo = () => {
    setlogo(true)
  }

  let submitForm = async (data, e) => {
    e.preventDefault(e)
    // console.log(data)
    // return;

    /**
     * unnecessary  record deleted 
     */
    delete data['6329776b201dd027dee16342'];
    delete data['63218707d2e3551816b9b8af'];
    delete data['63218947d2e3551816b9b8b0'];
    delete data['Binance'];
    delete data['Ethereum'];
    delete data['Tron'];




    let networks = []

    if (Object.entries(data['networks']).length > 0) {
      Object.entries(data['networks']).forEach(entry => {
        const [key, value] = entry;
        if (key === "Binance" || key === "Tron" || key === "Ethereum") return
        networks.push({ ...value, _id: key })
      })
    }

    data['networks'] = networks;
    if (tokenid === '') {

      /** create new record record */
      let formData = new FormData(e.target);
      let uploadFiles = formData.get('image');
      var reader = new FileReader();
      reader.readAsDataURL(uploadFiles);
      reader.onload = function () {
        data.image = reader.result;
        dispatch(tokenListCreate(data)).then((response) => {
          console.log("response", response)
        }).catch(err => {
          console.log("err", err)
        });

      }


    } else {
      /** update existing record */
      delete data['_id'];
      delete data['updatedAt'];
      delete data['__v'];
      delete data['createdAt'];
      let formData = new FormData(e.target);
      let uploadFile = formData.get('image');
      var reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onload = function () {
        data.image = reader.result;
        dispatch(tokenUpdateRequest(tokenid, data)).then((response) => {
          console.log("response", response)
        }).catch(err => {
          console.log("err", err)
        });

      }


    }
    setTimeout(() => {
      redirect('/token')
    }, 1000);

    reset();

  }


  // const updateValues = (event) => {
  //   console.log('adasdasdasd', event.target.value)
  //   //{ ...emptyData, coinName : e.target.value}
  // }

  return (
    <Paper
      sx={{
        margin: 'auto',
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
            Token Form
          </Typography>
          <IconButton onClick={() => abc(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>

            {tokenid !== '' ? (
              <>
                <TextField
                  id="coinName"
                  label="Coin Name"
                  fullWidth
                  defaultValue={emptyData?.coinName}
                  margin="dense"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('coinName')}
                  error={errors.coinName ? true : false}
                />
              </>
            ) : (
              <TextField
                id="coinName"
                label="Coin Name"
                fullWidth
                defaultValue={emptyData?.coinName}
                margin="dense"

                {...register('coinName')}
                error={errors.coinName ? true : false}
              />
            )}


            <Typography variant="inherit" color="textSecondary">
              {errors.coinName?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  display: 'none',
                },
              }}
              type="number"
              id="confirmations"
              defaultValue={emptyData?.confirmations}
              name="confirmations"
              label="Confirmation Number"
              fullWidth
              margin="dense"
              {...register('confirmations')}
              error={errors.confirmations ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.confirmations?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  display: 'none',
                },
              }}
              type="number"
              id="decimals"
              name="decimals"
              defaultValue={emptyData?.decimals}
              label="Decimal"
              fullWidth
              margin="dense"
              {...register('decimals')}
              error={errors.decimals ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.decimals?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            {tokenid !== '' ? (
              <>
                {!logo ? (
                  <>
                    <Typography variant="inherit" color="textSecondary">
                      Change Logo
                    </Typography>
                    <img src={emptyData?.image} alt='' />
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
                      id="image"
                      name="image"
                      label="Image"
                      type="file"
                      fullWidth
                      margin="dense"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setValue('image', e.target.files[0], {
                          shouldValidate: true,
                        })
                      }}
                      error={errors.image ? true : false}
                    />
                  </>
                )}
              </>
            ) : (
              <TextField
                id="image"
                name="image"
                label="Image"
                type="file"
                fullWidth
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setValue('image', e.target.files[0], {
                    shouldValidate: true,
                  })
                }}
                error={errors.image ? true : false}
              />
            )}

            <Typography variant="inherit" color="textSecondary">
              {errors.image?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>

            {tokenid !== '' ? (
              <>
                <TextField
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  defaultValue={emptyData?.fullName}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                  {...register('fullName')}
                  error={errors.fullName ? true : false}
                />
              </>
            ) : (
              <TextField
                id="fullName"
                name="fullName"
                label="Full Name"
                defaultValue={emptyData?.fullName}
                fullWidth
                margin="dense"
                {...register('fullName')}
                error={errors.fullName ? true : false}
              />
            )}

            <Typography variant="inherit" color="textSecondary">
              {errors.fullName?.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  display: 'none',
                },
              }}
              type="number"
              id="minimum_withdraw"
              name="minimum_withdraw"
              label="Minimum Withdraw"
              fullWidth
              margin="dense"
              {...register('minimum_withdraw')}
              error={errors.minimum_withdraw ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.minimum_withdraw?.message}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="tokenType"
              select
              fullWidth
              margin="dense"
              // value={emptyData.tokenType}
              label="Token Type"
              helperText="Please select your Token Type"
              {...register('tokenType')}
              error={errors.tokenType ? true : false}
            >
              <Typography variant="inherit" color="textSecondary">
                {errors.tokenType?.message}
              </Typography>
              {tokens.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Box fullWidth margin="dense">
              <FormControl
                component="fieldset"
                variant="standard"
                error={errors.chooseCb ? true : false}
              >
                <FormLabel component="legend">Networks</FormLabel>
                <FormGroup>
                  {network.map((check, index) => {
                    return (
                      <FormControlLabel
                        key={check.network_id}
                        sx={{ display: 'block' }}
                        label={
                          <Box>
                            {open[check.network_id] && (
                              <Box id={check.Network}>
                                <Grid container spacing={1}>
                                  <Grid item xs={12} sm={3}>
                                    <TextField
                                      sx={{
                                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                          display: 'none',
                                        },
                                      }}
                                      onChange={(event) => {
                                        setValue(
                                          `networks.${check.network_id}.decimalNum`,
                                          `${event.target.value}`,
                                        )
                                      }}
                                      type="number"
                                      {...register(`networks.${check.network_id}.decimalNum`)}
                                      name={`networks.${check.network_id}.decimalNum`}
                                      required
                                      id={`decimalsnum${index}`}
                                      label="Decimal"
                                      fullWidth
                                      margin="dense"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={3}>
                                    <TextField
                                      sx={{
                                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                          display: 'none',
                                        },
                                      }}
                                      onChange={(event) => {
                                        setValue(
                                          `networks.${check.network_id}.fee`,
                                          `${event.target.value}`,
                                        )
                                      }}
                                      // ref={register}
                                      {...register(`networks.${check.network_id}.fee`)}
                                      name={`networks.${check.network_id}.fee`}
                                      type="number"
                                      required
                                      id={`fee${index}`}
                                      label="fee"
                                      fullWidth
                                      margin="dense"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={3}>
                                    <TextField
                                      onChange={(event) => {
                                        setValue(
                                          `networks.${check.network_id}.contract`,
                                          `${event.target.value}`,
                                        )
                                      }}
                                      required
                                      {...register(`networks.${check.network_id}.contract`)}
                                      name={`networks.${check.network_id}.contract`}
                                      id={`contract${index}`}
                                      label="Contract"
                                      fullWidth
                                      margin="dense"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={3}>
                                    <TextField
                                      onChange={(event) => {
                                        setValue(
                                          `networks.${check.network_id}.abi`,
                                          `${event.target.value}`,
                                        )
                                      }}
                                      id={`abi${index}`}
                                      required
                                      {...register(`networks.${check.network_id}.abi`)}
                                      name={`networks.${check.network_id}.abi`}
                                      // value={ emptyData.networks.hasOwnProperty(check.network_id) ? emptyData?.networks[check.network_id]?.abi : '' }
                                      label="ABI"
                                      fullWidth
                                      margin="dense"
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                            )}
                          </Box>
                        }
                        control={
                          <Controller
                            name={check.network_id}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, ...field } }) => {
                              return (
                                <Box
                                  sx={{
                                    display: 'block',
                                  }}
                                >
                                  <MuiCheckbox
                                    {...field}
                                    checked={!!value}
                                    onChange={(event) => {
                                      field.onChange(event)
                                      setValue(
                                        `${check.network_id}.name`,
                                        `${event.target.value}`,
                                      )
                                      handleChange(event, check.network_id)
                                    }}
                                  />
                                  {check.Network}
                                </Box>
                              )
                            }}
                          />
                        }
                      />
                    )
                  })}
                </FormGroup>
              </FormControl>
              <Typography variant="inherit" color="textSecondary">
                {errors.chooseCb?.message}
              </Typography>
            </Box>
          </Grid>
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
export default TokenForm
