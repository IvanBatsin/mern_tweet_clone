import { axios } from '../../core/axios';
import { Comment } from '../../interfaces/Comment';

interface CommentsResponse<T> {
  status: 'success' | 'error',
  data: T
}

export interface CommentCreateObj {
  text: string,
  owner: string,
  tweetId: string
}

export const commentAPi = {
  async getComments(tweetId: string): Promise<CommentsResponse<Comment[]>> {
    const { data } = await axios.get<CommentsResponse<Comment[]>>(`/comments/${tweetId}`);
    return data;
  },

  async create(payload: CommentCreateObj): Promise<CommentsResponse<Comment>> {
    const {data} = await axios.post<CommentsResponse<Comment>>(`/comments`, payload);
    return data;
  }
}