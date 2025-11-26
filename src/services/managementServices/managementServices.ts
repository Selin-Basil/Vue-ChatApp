import  axiosInstance from '@/services/axiosInstance';

export const getUserById = async (userId: number) => {
  const response = await axiosInstance.get(`/api/users/${userId}`);
  return response.data;
};

// Get all details: Sends a GET request to fetch all details
export const getDashboardDetails = async () => {
    const response = await axiosInstance.get(
      `/api/admin-dashboard`
    );
  console.log(response.data);

    return response.data;
  };