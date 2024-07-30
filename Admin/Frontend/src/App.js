import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Home from "./components/GeneralScreens/Home"
import AddBook from './components/BookScreens/AddBook';
// import Header from './components/GeneralScreens/Header';
// import Footer from './components/GeneralScreens/Footer';
import AddCategory from './components/BookScreens/AddCategory';
const App = () => {

      return (
            <Router>

                  <div className="App">

                        <Routes>
                              <Route path="/" element={<LayoutsWithHeader />}>


                                    
                                    <Route exact path='/' element={<Home />} />
                                    


                                    <Route exact path='/addBook' element={<AddBook />} />

                                    <Route exact path='/addCategory' element={<AddCategory />} />
                                    

                              </Route>



                        </Routes>

                  </div>

            </Router>

      );

}

const LayoutsWithHeader = () => {
      return (
            <>
                  {/* <Header /> */}
                  <Outlet />
                  {/* <Footer /> */}
            </>
      );
}

export default App;
