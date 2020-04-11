export const searchReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      console.log(action);
      return {
        Movie: action.Movie,
        MovieTrailer: action.MovieTrailer,
        isLoaded: action.isLoaded,
        Test: action.Test,
      };
    default:
      throw new Error();
  }
};
