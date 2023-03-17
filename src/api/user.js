import API from "./api";

export const updateLanguage = async ({ language }) => {
  const response = await API.put(`/user/settings/language`, {
    language,
  });
  return response.data;
};
