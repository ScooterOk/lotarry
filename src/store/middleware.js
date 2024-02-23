import { snackActions } from "../utils/SnackBarUtils";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import logout from "../utils/logout";

export const logoutNotifications = () => (next) => async (action) => {
  if (isRejectedWithValue(action)) {
    if (action?.payload?.status === 401) {
      snackActions.error("Ви не залогінені!");
      logout();
      return;
    }
    // if (action.payload?.data?.errors?.length) {
    //   action.payload?.data?.errors?.forEach((error) => {
    //     snackActions.error(error.detail);
    //   });
    // } else {
    //   snackActions.error(action.payload?.data?.message);
    // }
    // if (action.payload.status === 401 || action.payload.status === 403) {
    //   snackActions.error('Failed to fetch projects');
    // }
  }
  return next(action);
};
