import './App.scss'
import { Header } from "./components/Header";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, FavouritesPage } from "./pages";
import {Provider as ReduxProvider} from "react-redux";
import {store} from "./store/store.ts";
import {RegisterPage} from "./pages/RegisterPage/";

function App() {
  // const [count, setCount] = useState(0)

  return (
      <ReduxProvider store={store}>
          <Router>
              <Header />
              <Routes>
                  <Route path="/" element={ <MainPage /> }></Route>
                  <Route path="/favourites" element={ <FavouritesPage /> }></Route>
                  <Route path="/register" element={ <RegisterPage /> }></Route>
              </Routes>
          </Router>
      </ReduxProvider>
  )
}

export default App;
