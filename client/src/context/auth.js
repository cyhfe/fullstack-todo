import { Children, createContext } from "react";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider({ children }) {
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
