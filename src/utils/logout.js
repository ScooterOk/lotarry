import { rm } from "lockr";
import { actions } from "../core/services/data";
import { store } from "../store";
// import servises from "../core/services";

const logout = () => {
  store.dispatch(actions.setToken(), undefined);
  rm("_lt");
  store.dispatch(actions.setIsUser(), null);
  rm("_lu");
  store.dispatch(actions.setIsSession(), null);
  rm("_ls");
};

export default logout;
