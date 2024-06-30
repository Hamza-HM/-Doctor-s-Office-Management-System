import { AppDispatch } from "@src/store";
import { listenToAuthChanges } from "@src/store/actions/authActions";
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
    dispatch(listenToAuthChanges()).then(() => {
      setIsInitialized(true);
    });
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="global-loader-container">
        <div className="loader "></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GlobalAuthProvider;
