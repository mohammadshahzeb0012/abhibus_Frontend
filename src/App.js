import { Provider } from "react-redux";
import "./App.css";
import SearchPage from "./Pages/SearchPage";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SearchPage />
      </div>
    </Provider>
  );
}

export default App;
