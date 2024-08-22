import AllCourses from "@/components/AllCourses";
import axios, { AxiosResponse } from "axios";
export const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

//Dummy

enum REST_METHODS {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PATCH = "patch",
}

axios.defaults.validateStatus = function () {
  return true;
};

axios.interceptors.response.use(function (response) {
  if (response.status === 401) {
    if (
      response.request.responseURL.includes("login-otp") ||
      response.request.responseURL.includes("login-password")
    )
      return response;
  }

  return response;
});

const apiCaller = async (
  {
    method,
    params,
    url,
    data,
    headers,
    excludeAuthToken,
  }: {
    method: REST_METHODS;
    params?: Record<string, unknown>;
    url: string;
    data?: Record<string, unknown> | FormData;
    headers?: Record<string, unknown>;
    excludeAuthToken?: boolean;
  } = {
    method: REST_METHODS.GET,
    params: {},
    data: {},
    headers: {},
    url: "",
    excludeAuthToken: false,
  }
) => {
  if (method === REST_METHODS.GET) {
    //@ts-ignore
    return axios.get(url, { params, headers });
  }

  //@ts-ignore
  return axios({
    method: method,
    url,
    data,
    headers,
    params,
  });
};

const API = {
  validators: {
    checkSuccessCode: (response: AxiosResponse): boolean => {
      return Math.floor(response.status / 100) === 2;
    },
    matchStatusCode: (response: AxiosResponse, statusCode: number): boolean => {
      return response.status === statusCode ? true : false;
    },
  },
  user: {
    AllCourses: () => {
      return apiCaller({
        method: REST_METHODS.GET,
        url: `${API_URL}/?sortBy=id&order=desc&limit=10`,
      });
    },
    CourseDetails: ({id}:{id:string}) => {
      return apiCaller({
        method: REST_METHODS.GET,
        url: `${API_URL}/${id}`,
      });
    },
    AddCourse: (formData:any) => {
      return apiCaller({
        method: REST_METHODS.POST,
        url: `${API_URL}`,
        data: formData,
      });
    },

  },
};

export default API;
