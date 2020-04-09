import React, {useEffect, useReducer, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function dataFetchReducer(state:any, action: any) {
  console.log("action", action);
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: action.data,
        loading: false
      };
    case 'FETCH_FAILED':
      return {
        ...state,
        data: null,
        loading: false,
        error: action.error
      }
  }
}
function App() {
  const [movie, setMovie] = useState("girls" as string);
  const [state, dispatch] = useReducer(
    dataFetchReducer,
    {
      data: null,
      error: null,
      loading: null,
    }
  );

  useEffect( () => {
    const myFetch = async () => {
      dispatch({ type: "FETCH_START"});

      try {
        const response = await fetch(`http://api.tvmaze.com/singlesearch/shows?q=${movie}`);
        const responseParsed = await response.json();
        console.log(responseParsed);
        dispatch({ type: "FETCH_SUCCESS", data: responseParsed})
      } catch (e) {
        dispatch({ type: "FETCH_FAILED", error: e})
      }
    };

    myFetch()
  }, [movie]);

  if (state.loading) {
    return <p>Loading... </p>
  }

  if (state.error) {
    return <p>Error</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button
          onClick={() => setMovie("*")}
        >
          Click Me
        </button>
      </header>
    </div>
  );
}

export default App;
