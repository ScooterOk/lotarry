import { store } from "../../store";
import { actions as data } from "./data";

import bindActionCreators from "react-redux/lib/utils/bindActionCreators";

const dispatch = store.dispatch;
const actions = {
  ...data,
};

const servises = bindActionCreators(actions, dispatch);

export default servises;
