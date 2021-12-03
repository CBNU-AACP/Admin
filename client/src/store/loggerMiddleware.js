const loggerMiddleware = store => next => action => {
  console.log("PREV STATE:", store.getState());
  console.log("action:", action);
  const result = next(action);
  console.log("NEXT STATE:", store.getState());
  return result;
};

export default loggerMiddleware;
