import axios from 'axios';
import { TagsState } from '../../store/ducks/themes/state';

export const ThemesApi = {
  fetchTags(): Promise<TagsState['items']> {
    return axios.get('/themes').then(res => res.data);
  }
}