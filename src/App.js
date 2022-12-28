
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { MainRouter } from './router/MainRouter';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <MainRouter/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
