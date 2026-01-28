import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Loader from './components/Loader/Loader';
const Main = lazy(() => import('./pages/Main/Main'));
const Search = lazy(() => import('./pages/Search/Search'));
const Identify = lazy(() => import('./pages/Identify/Identify'));
const Rare = lazy(() => import('./pages/Rare/Rare'));
const MapPlants = lazy(() => import('./pages/MapPlants/MapPlants'));
// const About = lazy(() => import('./pages/About/About'));

function App() {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/identify" element={<Identify />} />
                    <Route path="/rare" element={<Rare />} />
                    <Route path="/map" element={<MapPlants />} />
                    {/* <Route path="/about" element={<About />} /> */}
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
