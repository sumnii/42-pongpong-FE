import { StrictMode, useEffect, useReducer } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext } from "@hooks/AuthContext";
import authReducer from "@hooks/authReducer";
import loadable from "@loadable/component";
import axios from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const Auth = loadable(() => {
  return import("./pages/auth/Auth");
});

const Unauth = loadable(() => {
  return import("@unauth/Unauth");
});

const initialState = {
  isSignIn: false,
};

function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  const authContext = { authState, authDispatch };
  // context 잘 설정되어 있는지 확인용 로그
  console.log(authState);

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:81";
    if (authState.token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${authState.token}`;
  }, [authContext]);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={authContext}>
          <main>{authState.isSignIn ? <Auth /> : <Unauth />}</main>;
        </AuthContext.Provider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
