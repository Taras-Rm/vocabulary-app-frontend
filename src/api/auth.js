import API from "./api";

export const login = async ({ email, password }) => {
  const response = await API.post("/user/login", {
    email,
    password,
  });
  return response.data;
};

export const registration = async ({ name, email, password }) => {
  const response = await API.post("/user/registration", {
    name,
    email,
    password,
  });
  return response.data;
};

export const getAuthenticatedUser = async () => {
  const response = await API.get("/user/me");
  return response.data;
};
