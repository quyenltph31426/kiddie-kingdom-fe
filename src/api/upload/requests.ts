import request from '../axios';

export const uploadSingleFile = async (formData: FormData, onProgress?: (progress: number) => void): Promise<any> => {
  const { data } = await request({
    url: '/api/s3/upload-file',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const progress = Math.round((progressEvent.loaded / Number(progressEvent.total || 0)) * 100);
        onProgress(progress);
      }
    },
    data: formData,
  });

  return data?.data;
};
