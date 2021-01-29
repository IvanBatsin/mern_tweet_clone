import { axios } from '../../core/axios';
import { User } from '../../interfaces/User';
import { IFormInputs } from '../../pages/singIn/components/LoginModal';
import { IFormInputsRegister } from '../../pages/singIn/components/RegisterPopup';

interface IResponseDataSingIn {
  token: string,
  user: User
}

interface IAuthResponse {
  status: string,
  data: IResponseDataSingIn | User
}

interface IGetMeResponse {
  status: string,
  data: User
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
  
  async getMe(): Promise<IGetMeResponse> {
    const { data } = await axios.get<IGetMeResponse>('/users/me');
    return data;
  },

  async getUserById(payload: string): Promise<IGetMeResponse> {
    const { data } = await axios.get<IGetMeResponse>('/users/' + payload);
    return data;
  }
}