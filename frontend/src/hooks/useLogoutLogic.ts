import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store";
import { logout } from "@src/store/actions/authActions";

const useLogoutLogic = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    await dispatch(logout());
  };

  return { handleSubmit };
};

export default useLogoutLogic;
