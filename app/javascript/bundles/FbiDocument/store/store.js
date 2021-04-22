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
        fieldType,
        tableFields,
        id,
        field,
      } = action.payload;
      return {
        ...state,
        fieldEdit: {
          field,
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
