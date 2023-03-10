export const button = {
  minWidth: 120,
  minHeight: 70,
  fontSize: 28,
  borderRadius: 4,
  fontWeight: 700,
  // background: "conic-gradient(at bottom left, #F2994A, #a34f04)",
  background: "conic-gradient(at bottom left, #53bce0, #0f1c26)",
  boxShadow: "0px 5px 10px -2px rgb(0 0 0 / 20%)",
  transition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  "&.MuiButton-containedWarning": {
    pointerEvents: "none",
    background: "conic-gradient(at bottom left, #e05353, #e8ffff)",
    opacity: 0.75,
    boxShadow: "0px 0px 0px 7px rgb(43 29 23 / 30%)",
    color: "rgb(19 6 1 / 63%)",
    transform: "scale(0.85)",
  },
  "&.MuiButton-containedSuccess": {
    background: "conic-gradient(at bottom left, #22ac13, #015e5e)",
    boxShadow: "0px 0px 16px 4px rgb(255 255 255 / 100%)",
  },
  "&:hover": {
    boxShadow: "0px 0px 16px 4px #99d0ef",
  },
};

export const lock_l = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "50%",
  height: "100%",
  background: "rgba(255,255,255,0.1)",
  zIndex: 10,
};
export const lock_r = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "50%",
  height: "100%",
  background: "rgba(255,255,255,0.1)",
  zIndex: 10,
};
