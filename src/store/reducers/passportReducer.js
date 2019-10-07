import * as types from '../../constants/actionType';

const initState = {
  accounts: [],
  documents: [],
  error: null,
  pending: false
};

const passportReducer = (state = initState, action) => {
  switch (action.type) {
    case types.FETCH_ACCOUNTS_PENDING:
      return {
        ...state,
        pending: true,
        error: null
      };
    case types.FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        accounts: action.accounts
      };
    case types.FETCH_ACCOUNTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
        acconts: []
      };
    case types.FETCH_DOCUMENTS_PENDING:
      return {
        ...state,
        pending: true,
        error: null
      };
    case types.FETCH_DOCUMENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        documents: action.documents
      };
    case types.FETCH_DOCUMNETS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
        documents: []
      };

    default:
      return state;
  }
};

export default passportReducer;
