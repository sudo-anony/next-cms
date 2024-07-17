import { toast } from 'react-toastify';

export default function setupAxios(axios: any, store: any) {
  axios.defaults.headers.Accept = 'application/json';
  axios.defaults.headers['ngrok-skip-browser-warning'] = 'true';

  axios.interceptors.request.use(
    (config: any) => {
      try {
        const accessToken = sessionStorage.getItem('token');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error("Error in request interceptor:", error);
      }
      return config;
    },
    (err: any) => {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error: any) => {
      if (error.response) {
        let errorMessage = 'An error occurred';
        switch (error.response.status) {
          case 400:
            errorMessage = 'Bad Request';
            break;
          case 401:
            errorMessage = 'Unauthorized';
            break;
          case 422:
            errorMessage = 'Unprocessable Entity';
            break;
          case 403:
            errorMessage = 'Forbidden';
            break;
          case 404:
            errorMessage = 'Not Found';
            break;
          case 500:
            errorMessage = 'Internal Server Error';
            break;
          default:
            errorMessage = 'Unhandled API response error';
        }
        toast.error(`${errorMessage}: ${error.response.data?.error || ''}`);
      } else if (error.request) {
        toast.error('No response received from server');
      } else {
        toast.error(`Error: ${error.message}`);
      }
      return Promise.reject(error);
    }
  );
}
