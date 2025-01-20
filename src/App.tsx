import './App.scss'
import { Header } from "./components/Header";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, FavouritesPage } from "./pages";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
        <Routes>
            <Route path="/" element={ <MainPage /> }></Route>
            <Route path="/favourites" element={ <FavouritesPage /> }></Route>
        </Routes>
    </Router>
  )
}

export default App;
