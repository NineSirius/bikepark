import ky from 'ky'

// const strapBackiApi = got.extend({
//     prefixUrl: 'http://localhost:1337/api',
// })

// const strapFrontiApi = ky.create({
//     prefixUrl: 'https://localhost:1337/api/',
// })

export const postQuestionRequest = (data) => {
    return ky.post('https://localhost:1337/api/questions', data)
}
