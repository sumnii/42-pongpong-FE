import { useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getToken, isAuth } from "userAuth";
import loadable from "@loadable/component";
import axios from "axios";
import { AuthContext } from "hooks/context/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const Auth = loadable(() => {
  return import("@page/Auth");
});

const Unauth = loadable(() => {
  return import("@unauth/Unauth");
});

function App() {
  const [isSignIn, setIsSignIn] = useState(isAuth());

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:81";
    if (isSignIn) axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
  }, [isSignIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={setIsSignIn}>
        <main style={{ height: "100%" }}>{isSignIn ? <Auth /> : <Unauth />}</main>;
      </AuthContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
