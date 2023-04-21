import qs from "qs";
import API from "./api";

export const getAllCollections = async () => {
  const response = await API.get("/collection/all");
  return response.data.collections;
};

export const createCollection = async ({ name, langFrom, langTo }) => {
  const response = await API.post("/collection", {
    name,
    langFrom,
    langTo,
  });
  return response.data;
};

export const getCollection = async ({ collectionId }) => {
  const response = await API.get(`/collection/${collectionId}`);
  return response.data.collection;
};

export const generateCollectionPdfFile = async ({ collectionId }) => {
  const response = await API.post(
    `/collection/${collectionId}/generatePdf`,
    {},
    {
      responseType: "blob",
    }
  );

  return { data: response.data, headers: response.headers };
};

export const updateCollection = async ({ id, name }) => {
  const response = await API.put(`/collection/${id}`, {
    name,
  });
  return response.data;
};

export const deleteCollection = async ({ id }) => {
  const response = await API.delete(`/collection/${id}`);
  return response.data;
};

export const searchWordsInCollection = async ({
  collectionId,
  text,
  searchBy,
  partsOfSpeech,
}) => {
  let params = {
    text: text,
    searchBy: searchBy,
  };
  if (partsOfSpeech.length) {
    params.partsOfSpeech = partsOfSpeech.reduce((f, s) => `${f},${s}`);
  }
  const response = await API.get(`/collection/${collectionId}/search`, {
    params: params,
  });
  return response.data.words;
};
