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