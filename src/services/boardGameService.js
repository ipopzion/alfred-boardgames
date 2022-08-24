import axios from 'axios'

const baseUrl = "https://boardgame-database.herokuapp.com/boardgames/api/v1"

const create = boardGame => {
    const request = axios.post(baseUrl, boardGame)
    return request.then(response => response.data)
}

const update = boardGame => {
    const request = axios.put(baseUrl, boardGame)
    return request.then(response => response.data)
}

const read = id => {
    const request = axios.get(`${baseUrl}/${id}/details`)
    return request.then(response => response.data)
}

const del = id => {
    const request = axios.delete(`${baseUrl}/${id}/details`)
    return request.then(response => response.data)
}

export default { create, update, read, del };