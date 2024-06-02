export default function setupAxios(axios: any, store: any) {
  axios.defaults.headers.Accept = 'application/json';
  axios.defaults.headers['ngrok-skip-browser-warning'] = 'true';

  axios.interceptors.request.use(
    (config: any) => {
      try {
        const accessToken = sessionStorage.getItem('token');
        console.log("AccessToken from sessionStorage:", accessToken);

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          console.log("Authorization header set:", config.headers.Authorization);
        } else {
          console.warn("No access token found in sessionStorage.");
        }

        console.log("Request config:", config);
      } catch (error) {
        console.error("Error in request interceptor:", error);
      }

      return config;
    },
    (err: any) => {
      console.error("Request error:", err);
      return Promise.reject(err);
    }
  );
}
