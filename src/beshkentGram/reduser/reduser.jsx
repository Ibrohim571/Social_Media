export const initialState = null;

export const reduser = (state, { type, payload }) => {
  if (type == "USER") {
    return {
      ...state,
      state: payload,
    };
  }
  if (type == "CLEAR") {
    return (state = null);
  }
  if (type == "FOLLOWER") {
    return {
      ...state,
      followers: payload.followers,
      following: payload.following,
    };
  }
  return state;
};
