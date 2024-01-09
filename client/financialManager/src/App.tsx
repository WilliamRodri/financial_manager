import React from "react";
import { AuthProvider } from "./contexts/auth";
import { Routers } from "./routes";

function App() {

  return (
    <AuthProvider>
      <Routers />
    </AuthProvider>
  );
}

export default App;