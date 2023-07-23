import { Middleware } from "redux";

export const loggerMiddleware = (props: boolean): Middleware => {
  return (store) => {
    return (next) => {
      return (action) => {
        props && console.warn(`dispatching ${action.type}`);
        const result = next(action);
        props && console.log(store.getState()[action.type.split("/")[0]]);
        return result;
      };
    };
  };
};
