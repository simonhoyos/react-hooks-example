import { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../store';

const imagesService = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 2000,
});

// action types
const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';

// { type: 'SET_DATA', payload: [...] }
function reducer(state, action) {
  switch(action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    default:
      return state;
  }
}

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export function useApi() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { page } = useContext(Context);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    dispatch({ type: TOGGLE_LOADING });
    imagesService.get('/photos', {
      params: {
        _page: page,
        _limit: 9,
      },
      cancelToken: source.token,
    })
      .then(({ data }) => {
        dispatch({ type: SET_DATA, payload: data });
        dispatch({ type: TOGGLE_LOADING });
      })
      .catch(error => {
        dispatch({ type: SET_ERROR, payload: error });
        dispatch({ type: TOGGLE_LOADING });
      });

      return () => {
        source.cancel('Petición cancelada')
      };
  }, [page]);

  // { data, error, loading }
  return state;
}
