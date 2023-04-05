import { StrictMode, useState } from "react";
import Auth from "./pages/auth/Auth";
import UnAuth from "@unAuth/UnAuth";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <main>{isSignIn ? <Auth /> : <UnAuth setSign={setIsSignIn} />}</main>;
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
