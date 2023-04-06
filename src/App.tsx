import { StrictMode, useReducer, useState } from "react";
import Auth from "./pages/auth/Auth";
import UnAuth from "@unAuth/UnAuth";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext } from "@hooks/UserContext";
import authReducer from "@hooks/authReducer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  const [authState, authDispatch] = useReducer(authReducer, {
    isSignIn: false,
    username: "",
    token: "",
  });

  const authContext = { authState, authDispatch };
  // context 잘 설정되어 있는지 확인용 로그
  console.log(authState);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={authContext}>
          <main>{authState.isSignIn ? <Auth /> : <UnAuth />}</main>;
        </AuthContext.Provider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
