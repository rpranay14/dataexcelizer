import logo from './logo.svg';
import './App.css';
import NavbarComponent from './Components/NavbarComponent';
import { Provider } from 'react-redux'
import HomePage from './Pages/HomePage';
import { configureStore } from './redux/configureStore';
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavbarComponent />
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;
