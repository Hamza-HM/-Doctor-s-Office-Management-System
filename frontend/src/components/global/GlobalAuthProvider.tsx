import { AppDispatch } from "@src/store";
import { checkAuthStatus } from "@src/store/actions/authActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface GlobalAuthProviderProps {
  children: React.ReactNode;
}

const GlobalAuthProvider: React.FC<GlobalAuthProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    dispatch(checkAuthStatus()).then(() => {
      setIsInitialized(true);
    });
  }, [dispatch]);

  if (!isInitialized) {
    return <div>Initializing...</div>; // or some loading indicator
  }

  return <>{children}</>;
};

export default GlobalAuthProvider;
