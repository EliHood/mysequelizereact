import Axios from 'axios'

let AxiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // withCredentials: true,
  // headers : {
  //   'Content-Type' : 'application/json',
  //   'Accept' : 'application/json',
  // }

})



AxiosInstance.interceptors.response.use(function(response) {
  // const token = localStorage.getItem('auth');
  // response.headers.Authorization =  token ? `Bearer ${token}` : '';
  // console.log(token);
  return response;
})

export default AxiosInstance


