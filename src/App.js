
import Layout from './Layout';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import AuthStore from './Store/AuthStore';

function App() {

  const store = configureStore({
    reducer:{
      auth:AuthStore
    }
  })
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
