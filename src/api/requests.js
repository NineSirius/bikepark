import ky from "ky";
import { headers } from "../../next.config";

// const strapBackiApi = got.extend({
//     prefixUrl: 'http://localhost:1337/api',
// })

const strapFrontiApi = ky.create({
  prefixUrl: "https://bike-park-api.onrender.com/api",
});

export const postQuestionRequest = (question) => {
  return strapFrontiApi.post("questions", {
    json: {
      data: question,
    },
  });
};

export const addNewUser = (data) => {
  return strapFrontiApi.post("auth/local/register", {
    json: data,
  });
};

export const loginUser = (data) => {
  return strapFrontiApi.post("auth/local?populate=*", {
    json: data,
  });
};

export const getFullUserInfo = (token) => {
  return strapFrontiApi
    .get("users/me?populate=*", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .json();
};

export const changePassword = async (token, passwordData) => {
  return await strapFrontiApi
    .post("auth/change-password", {
      json: {
        currentPassword: passwordData.password,
        password: passwordData.newPassword,
        passwordConfirmation: passwordData.passwordConfirmation,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json();
};

export const editUserInfo = async (token, id, data) => {
  return await strapFrontiApi
    .put(`users/${id}`, {
      json: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json();
};

export const getTypes = async () => {
  return strapFrontiApi.get("types?populate=preview_image").json();
};

export const getProducts = async (type) => {
  if (type.length >= 1 && type) {
    return strapFrontiApi
      .get(
        `products?populate=preview_image${
          type.length >= 1 && `&filters[type]=${type.join("&filters[type]=")}`
        }`
      )
      .json();
  } else {
    return strapFrontiApi.get(`products?populate=preview_image`).json();
  }
};

export const getFullBikeInfo = async (id) => {
  return strapFrontiApi.get(`products/${id}?populate=*`).json();
};

export const sendOrder = async (data) => {
  return strapFrontiApi
    .post("orders?populate=*", {
      json: {
        data: data,
      },
    })
    .json();
};

export const updateUserOrders = async (order, token) => {
  return strapFrontiApi.put(`users/${order.customer.id}`, {
    json: order,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// export const getBikeInfoById = async (id) => {
//   return strapFrontiApi.get(`products/${id}?populate=*&filters[id][$eq]=${id}`);
// };
