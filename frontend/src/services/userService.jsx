import apiClient from "./services";

const userService = {
  getAllProduct: async () => {
    const response = await apiClient.get("/product");
    return response.data;
  },
};

export default userService;
