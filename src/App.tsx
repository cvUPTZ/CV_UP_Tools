import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import AppRoutes from "./components/routes";
import routes from "tempo-routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <AppRoutes />
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
