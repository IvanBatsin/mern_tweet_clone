import React, { useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button/Button';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import TextField from '@material-ui/core/TextField/TextField';
import { ModalPopup } from '../../../components';
import { useSingInStyles } from '../singInClasses';
import {  selectUserStatus } from '../../../store/ducks/user/selector';
import { fetchSingIn } from '../../../store//ducks/user/actionCreators';
import { LoadingState } from '../../../interfaces/LoadingState';

// React Hook From
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// import { authApi } from '../../../services/api/authApi';
import { Notification } from '../../../components/Notification';
import { Color } from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';

interface ILoginProps {
  open: boolean, 
  onClose: () => void
}

export interface IFormInputs {
  email: string
  password: number
}

const loginFormSchema = yup.object().shape({
  email: yup.string().email('Неверная почта').required('Введите почту'),
  password: yup.string().min(6, 'Минимальная длина пароля - 6 символов').required(),
});

const LoginPopup: React.FC<ILoginProps> = ({open, onClose}: ILoginProps) => {
  const classes = useSingInStyles();
  const openNotification = useRef<(text: string, type: Color) => void>(() => {});
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserStatus);

  const { control, handleSubmit, errors } = useForm<IFormInputs>({
    resolver: yupResolver(loginFormSchema)
  });

  const handleFormSubmit = async (data: IFormInputs) => {
    try {
      dispatch(fetchSingIn(data));
      onClose();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (loadingStatus === LoadingState.LOADED) {
      openNotification.current('Успешная авторизация', 'success');
    } else if (loadingStatus === LoadingState.ERROR) {
      openNotification.current('Неудалось войти', 'error');
    }
  }, [loadingStatus]);
  
  return <Notification>
    {
      callback => {
        openNotification.current = callback;
        return (
          <ModalPopup visible={open} onClose={onClose} title="Войти в Twitter" classes={classes}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormControl className={classes.registerFormControl}  component="fieldset" fullWidth>
                <FormGroup aria-label="position" row>
                  <Controller
                    as={TextField}
                    control={control}
                    defaultValue=""
                    autoFocus
                    name="email"
                    variant="filled"
                    margin="dense"
                    id="email"
                    label="Email address"  
                    type="email"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                  />
                  <Controller
                    as={TextField}
                    control={control}
                    defaultValue=""
                    name="password"
                    variant="filled"
                    margin="dense"
                    id="password"
                    label="Password"  
                    type="password"
                    fullWidth
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                  />
                  <Button disabled={loadingStatus === LoadingState.LOADING} type="submit" color="primary" fullWidth variant="contained">Войти</Button>
                </FormGroup>
              </FormControl>
            </form>
          </ModalPopup>
        )
      }
    }
  </Notification>
}

export { LoginPopup };