const auth = (state = { user: "", access: "", logged_in: false }, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: action.payload.user,
        access: action.payload.access,
        logged_in: true,
      };

    default:
      return state;
  }
};

export default auth;
