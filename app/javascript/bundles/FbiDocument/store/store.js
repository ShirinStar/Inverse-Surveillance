import { createStore, combineReducers } from 'redux';

const initialState = {
  foo: 0,
  fieldEdit: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'FOO':
      return {
        ...state,
        foo: state.foo + 1,
      };
    case 'FINISH_EDIT':
      return initialState;
    case 'RESET':
      return initialState;
    case 'BEGIN_UPDATE':
      const {
        textBody,
        textLabel,
        id,
      } = action.payload;
      return {
        ...state,
        fieldEdit: {
          textBody,
          textLabel,
          id,
        },
      };
    default:
      return initialState;
  }
}

export default createStore(combineReducers({main: rootReducer})); 
