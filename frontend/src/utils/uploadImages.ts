import { axios } from '../core/axios';

interface Photo {
  url: string,
  size: number,
  height: number,
  width: number
}

interface UploadPhotoResponse {
  status: string,
  data: Photo
}

export const uploadPhotos= async (photo: File): Promise<UploadPhotoResponse> => {
  const formData = new FormData();
  formData.append('image', photo);
  const { data } = await axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
}