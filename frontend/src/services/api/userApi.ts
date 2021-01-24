import { axios } from '../../core/axios';
import { IFormInputs } from '../../pages/singIn/components/LoginModal';
import { IFormInputsRegister } from '../../pages/singIn/components/RegisterPopup';

interface IResponseDataSingIn {
  confirmHash: string,
  confirmed: boolean,
  email: string,
  fullName: string,
  password: string,
  token: string,
  userName: string
}

interface IResponseDataSingUp {
  confirmHash: string,
  confirmed: boolean,
  email: string,
  fullName: string,
  password: string,
  userName: string
}

interface IAuthResponse {
  status: string,
  data?: IResponseDataSingIn | IResponseDataSingUp
}

export const userApi = {
  async singIn(postData: IFormInputs): Promise<IAuthResponse> {
    const { data } = await axios.post<IAuthResponse>('/auth/login', {username: postData.email, password: postData.password});
    return data;
  },

  async singUp(postData: IFormInputsRegister): Promise<IAuthResponse> {
    const { data } = await axios.post<IAuthResponse>('/auth/register', {
      email: postData.email, 
      fullName: postData.fullName,
      userName: postData.userName, 
      password: postData.password,
      password2: postData.password2
    });
    console.log(data);
    return data;
  },
  
  async getMe(): Promise<IAuthResponse> {
    const { data } = await axios.get('/users/me');
    return data;
  }
}