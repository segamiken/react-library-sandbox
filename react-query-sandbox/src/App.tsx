import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { Example } from "./components/Example";
import { Example2 } from "./components/Example2";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <Example2 />
    </QueryClientProvider>
  );
}

export default App;
