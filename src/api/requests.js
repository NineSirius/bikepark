import ky from 'ky'
import { headers } from '../../next.config'

// const strapBackiApi = got.extend({
//     prefixUrl: 'http://localhost:1337/api',
// })

const strapFrontiApi = ky.create({
    prefixUrl: 'http://localhost:1337/api/',
})

export const postQuestionRequest = (data) => {
    return strapFrontiApi.post('https://localhost:1337/api/questions', {
        json: data,
    })
}

export const addNewUser = (data) => {
    return strapFrontiApi.post('auth/local/register', {
        json: data,
    })
}

export const loginUser = (data) => {
    return strapFrontiApi.post('auth/local?populate=*', {
        json: data,
    })
}

export const getFullUserInfo = (token) => {
    return strapFrontiApi.post('users/me', {
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
}
