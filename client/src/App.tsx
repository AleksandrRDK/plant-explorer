import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './pages/Main/Main';
import Search from './pages/Search/Search';
import Identify from './pages/Identify/Identify';
import Rare from './pages/Rare/Rare';
import MapPlants from './pages/MapPlants/MapPlants';
import About from './pages/About/About';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/search" element={<Search />} />
                <Route path="/identify" element={<Identify />} />
                <Route path="/rare" element={<Rare />} />
                <Route path="/map" element={<MapPlants />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
