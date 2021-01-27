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
    const { data } = await axios.get<IResponse<Tweet>>(`/tweets/${id}`);
    return data.data;
  },
  async addTweet(payload: {text: string, images: string[]}): Promise<Tweet> {
    const {data} = await axios.post<IResponse<Tweet>>('/tweets', payload);
    return  data.data;
  },
  async deleteTweet(id: string): Promise<void> {
    await axios.delete<IResponse<Tweet>>(`/tweets/${id}`);
  },
  async fetchUserTweets(payload: string): Promise<Tweet[]> {
    const {data} = await axios.get<IResponse<Tweet[]>>(`/tweets/user/${payload}`);
    return data.data;
  }
}