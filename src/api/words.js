import API from "./api";

export const createWord = async ({
  word,
  translation,
  partOfSpeech,
  scentance,
  collectionId,
}) => {
  const response = await API.post("/word", {
    word,
    translation,
    partOfSpeech,
    scentance,
    collectionId,
  });
  return response.data;
};

export const createWords = async ({ words, collectionId }) => {
  const response = await API.post("word/bulk", {
    words,
    collectionId,
  });
  return response.data;
};

export const getAllWords = async ({ collectionId, size = 0, page = 0 }) => {
  const response = await API.get(`/word/collection/${collectionId}`, {
    params: {
      size: size,
      page: page,
    },
  });
  return response.data;
};

export const getWord = async ({ id, collectionId }) => {
  const response = await API.get(`/word/${id}/collection/${collectionId}`);
  return response.data.word;
};

export const updateWord = async ({
  id,
  collectionId,
  word,
  translation,
  partOfSpeech,
  scentance,
}) => {
  const response = await API.put(`/word/${id}/collection/${collectionId}`, {
    word,
    translation,
    partOfSpeech,
    scentance,
  });
  return response.data;
};

export const deleteWord = async ({ id, collectionId }) => {
  const response = await API.delete(`/word/${id}/collection/${collectionId}`);
  return response.data;
};

export const translateWord = async ({ word, index, langFrom, langTo }) => {
  const response = await API.post(
    `/word/translate`,
    {
      word,
      index,
    },
    {
      params: {
        langFrom: langFrom,
        langTo: langTo,
      },
    }
  );
  return response.data;
};
