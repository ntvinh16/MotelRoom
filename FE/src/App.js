import {Routes, Route} from 'react-router-dom';
import './assets/styles/App.scss';
import Home from './views/Home';
import RoomDetail from './views/RoomDetail';
import Map from './views/Map';
import Header from './layouts/header/Header';
import Footer from './layouts/footer/footer';
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css"; 

function App() {
  return (
    <div className="App">
      <Header />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roomdetail" element={<RoomDetail />} />
        <Route path="/map" element={<Map />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
