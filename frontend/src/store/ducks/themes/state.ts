import { LoadingState } from '../../../interfaces/LoadingState';
import { Tag } from '../../../interfaces/Theme';

export interface TagsState {
  items: Tag[],
  loadingState: LoadingState
}