import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import LoginScreen from "./components/AuthScreens/LoginScreen"
import RegisterScreen from "./components/AuthScreens/RegisterScreen"
import DetailBook from './components/BookScreens/DetailBook';
import Header from './components/GeneralScreens/Header';
import Footer from './components/GeneralScreens/Footer';
import NotFound from './components/GeneralScreens/NotFound';
import ReadListPage from './components/ProfileScreens/ReadListPage';
import Book from './components/GeneralScreens/Book';
const App = () => {

      return (
            <Router>

                  <div className="App">

                        <Routes>
                              <Route path="/" element={<LayoutsWithHeader />}>

                                    <Route path='*' element={<NotFound />} />

                                    
                                    <Route exact path='/' element={<Book />} />
                                    

                                    <Route exact path="/book/:slug" element={<DetailBook />} />

                                    <Route exact path='/book/:slug/addComment' element={<DetailBook />} />

                                    <Route exact path='/readList' element={<ReadListPage />} />
                                    
                                    

                              </Route>

                              <Route exact path="/login" element={<LoginScreen />} />
                              <Route exact path="/register" element={<RegisterScreen />} />


                        </Routes>

                  </div>

            </Router>

      );

}

const LayoutsWithHeader = () => {
      return (
            <>
                  <Header />
                  <Outlet />
                  <Footer />
            </>
      );
}

export default App;
