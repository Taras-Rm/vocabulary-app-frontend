import API from "./api";

export const getUsers = async () => {
    const response = await API.get("/statistic/users")
    return response.data
}

export const getCollections = async () => {
    const response = await API.get("/statistic/collections")
    return response.data
}

export const getAllWordsCount = async () => {
    const response = await API.get("/statistic/words/count")
    return response.data
}

export const getCountOfWordsPerTime = async ({ time }) => {
    const response = await API.get("/statistic/words/perTime", {
        params: {
            time: time
        }
    })
    return response.data
}


export const searchWordsInAllCollections = async ({
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
    const response = await API.get(`/statistic/words/search`, {
      params: params,
    });
    return response.data.words;
  };
  