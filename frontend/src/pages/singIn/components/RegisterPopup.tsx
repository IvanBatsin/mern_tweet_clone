import React, { useEffect, useRef } from 'react';
import FormControl from '@material-ui/core/FormControl/FormControl';
import { ModalPopup } from '../../../components';
import { useSingInStyles } from '../singInClasses';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserStatus } from '../../../store/ducks/user/selector';
import { fetchSingUp } from '../../../store/ducks/user/actionCreators';
import { LoadingState } from '../../../store/ducks/tweets/contracts/state';
 
// React Hook From
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// import { authApi } from '../../../services/api/authApi';
import { Notification } from '../../../components/Notification';
import { Color } from '@material-ui/lab/Alert';


interface IRegisterProps {
  open: boolean,
  onClose: () => void
}

export interface IFormInputsRegister {
  fullName: string
  userName: string
  email: string
  password: string
  password2: string
}

const loginFormSchema = yup.object().shape({
  fullName: yup.string().min(2, 'Неверно указано имя').required('Введите имя'),
  userName: yup.string().min(2, 'Неверно указан логин').required('Введите имя'),
  email: yup.string().email('Неверная почта').required('Введите почту'),
  password: yup.string().min(6, 'Минимальная длина пароля - 6 символов').required(),
  password2: yup.string().min(6, 'Минимальная длина пароля - 6 символов').required().oneOf([yup.ref("password")], "Пароли несовпадают")
});

const RegisterPopup: React.FC<IRegisterProps> = ({onClose, open}: IRegisterProps) => {
  const classes = useSingInStyles();
  const openNotification = useRef<(text: string, type: Color) => void>(() => {});
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserStatus);

  const { control, handleSubmit, errors } = useForm<IFormInputsRegister>({
    resolver: yupResolver(loginFormSchema)
  });

  const handleFormSubmit = async (data: IFormInputsRegister) => {
    try {
      dispatch(fetchSingUp(data));
      onClose();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (loadingStatus === LoadingState.LOADED){
      openNotification.current('Регистрация прошла успешно', 'success');
    } else if (loadingStatus === LoadingState.ERROR) {
      openNotification.current('Произошла ошибка', 'error');
    }
  }, [loadingStatus]);
  return <Notification>
    {
      callback => {
        return (
          <ModalPopup visible={open} onClose={onClose} title="Создайте учетную запись" classes={classes}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormControl component="fieldset" fullWidth>
                <FormGroup aria-label="position" row>
                  <Controller
                    as={TextField}
                    control={control}
                    defaultValue=""
                    className={classes.registerField}
                    autoFocus
                    name="fullName"
                    variant="filled"
                    margin="dense"
                    id="fullName"
                    label="Имя"  
                    type="text"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    error={!!errors.fullName?.message}
                    helperText={errors.fullName?.message}
                  />
                  <Controller
                    as={TextField}
                    control={control}
                    defaultValue=""
                    className={classes.registerField}
                    autoFocus
                    name="userName"
                    variant="filled"
                    margin="dense"
                    id="userName"
                    label="Login"  
                    type="text"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    error={!!errors.userName?.message}
                    helperText={errors.userName?.message}
                  />
                  <Controller
                    as={TextField}
                    control={control}
                    defaultValue=""
                    name="email"
                    className={classes.registerField}
                    autoFocus
                    variant="filled"
                    margin="dense"
                    id="email"
                    label="E-mail"  
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
                    className={classes.registerField}
                    autoFocus
                    variant="filled"
                    margin="dense"
                    id="password"
                    label="Пароль"  
                    type="password"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    error={!!errors.password?.message}
                    helperText={errors.password?.message}
                  />
                  <Controller
                    as={TextField}
                    control={control}
                    defaultValue=""
                    name="password2"
                    className={classes.registerField}
                    autoFocus
                    variant="filled"
                    margin="dense"
                    id="password2"
                    label="Подтвердить пароль"  
                    type="password"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    error={!!errors.password2?.message}
                    helperText={errors.password2?.message}
                  />
                  <Button disabled={loadingStatus === LoadingState.LOADING} type="submit" color="primary" fullWidth variant="contained">Регистрация</Button>
                </FormGroup>
              </FormControl>
            </form>
          </ModalPopup> 
        )
      }
    }
  </Notification>
}

export { RegisterPopup };