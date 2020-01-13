import * as types from '../../constants/actionType';

const initState = {
  applications: [],
  searchData: [],
  pages: 0,
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
        applications: action.applications,
        pages: action.pages
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
        documents: [],
        pending: true,
        error: null
      };
    case types.FETCH_DOCUMENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        documents: action.payload
      };
    case types.FETCH_DOCUMNETS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };

    case types.FETCH_ACCOUNTS_SEARCH_PENDING:
      return {
        ...state,
        applications: [],
        pending: true,
        error: null
      };
    case types.FETCH_ACCOUNTS_SEARCH_SUCCESS:
      let applicationss = [...state.applications];

      return {
        ...state,
        pending: false,
        applications: applicationss.concat(action.payload)
      };

    case types.FETCH_ACCOUNTS_SEARCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case types.DELETE_DOCUMENT:
      var documents = [...state.documents];
      documents = documents.filter(
        document => document.ID !== action.documentID
      );

      return {
        ...state,
        documents
      };

    case types.APPLICATION_DELETE:
      var applications = [...state.applications];
      applications = applications.filter(
        application => application.ID !== action.applicationID
      );

      return {
        ...state,
        applications
      };

    default:
      return state;
  }
};

export default passportReducer;
