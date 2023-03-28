import ky from 'ky'
import { headers } from '../../next.config'

// const strapBackiApi = got.extend({
//     prefixUrl: 'http://localhost:1337/api',
// })

const strapFrontiApi = ky.create({
    prefixUrl: 'http://localhost:1337/api/',
})

export const postQuestionRequest = (question) => {
    return strapFrontiApi.post('questions', {
        json: {
            data: question,
        },
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
    return strapFrontiApi
        .get('users/me?populate=*', {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .json()
}

export const changePassword = async (token, passwordData) => {
    return await strapFrontiApi
        .post('auth/change-password', {
            json: {
                currentPassword: passwordData.password,
                password: passwordData.newPassword,
                passwordConfirmation: passwordData.passwordConfirmation,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json()
}

export const editUserInfo = async (token, id, data) => {
    return await strapFrontiApi
        .put(`users/${id}`, {
            json: data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json()
}
