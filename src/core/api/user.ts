import axios from 'axios';

export const apiGetUserProfile = async (email: string): Promise<any> => {
  try {
    const { data } = await axios.get(`/user/${email}`);
    return data.body;
  } catch (error) {
    throw error;
  }
};

export const apiEditUserName = async (username: string): Promise<any> => {
  try {
    const { data } = await axios.put('/user', {
      username: username,
    });
    return data.body;
  } catch (error) {
    throw error;
  }
};

export const apiEditProfileImage = async (image: string): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('image', image);
    const { data } = await axios.put('/api/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.body;
  } catch (error) {
    throw error;
  }
};
