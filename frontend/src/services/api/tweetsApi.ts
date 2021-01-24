import { axios } from '../../core/axios';
import { Tweet } from '../../interfaces/Tweet';

interface IResponse<T> {
  status: string,
  data: T
}

export const TweetsApi = {
  async fetchTweets(): Promise<Tweet[]>{
    const {data} = await axios.get<IResponse<Tweet[]>>('/tweets');
    return data.data;
  },
  async fetchItemTweet(id: string): Promise<Tweet> {
    const {data} = await axios.get<IResponse<Tweet>>(`/tweets/${id}`);
    return data.data;
  },
  async addTweet(payload: string): Promise<Tweet> {
    const {data} = await axios.post<IResponse<Tweet>>('/tweets', {text: payload});
    return  data.data;
  }
}