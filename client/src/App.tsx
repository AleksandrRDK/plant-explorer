import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './pages/Main/Main';
import Search from './pages/Search/Search';
import Identify from './pages/Identify/Identify';
import Rare from './pages/Rare/Rare';
// import MapPage from './pages/Map/Map';
// import Favorites from './pages/Favorites/Favorites';
// import About from './pages/About/About';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/search" element={<Search />} />
                <Route path="/identify" element={<Identify />} />
                <Route path="/rare" element={<Rare />} />
                {/* <Route path="/map" element={<MapPage />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
