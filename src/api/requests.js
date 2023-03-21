import ky from 'ky'

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
    return strapFrontiApi.post('users/me', {
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
}
