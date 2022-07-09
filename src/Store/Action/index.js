import { isInaccessible } from "@testing-library/react";

export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

export const decrement = (isi) => {
  return {
    type: "DECREMENT",
    payload: isi,
  };
};

export const storedata = (data) => {
  return {
    type: "STOREDATA",
    payload: data,
  };
};
