import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Simulator from './pages/Simulator';
import Comparison from './pages/Comparison';
import MapPage from './pages/MapPage';

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/simulator" element={<Simulator />} />
                    <Route path="/comparison" element={<Comparison />} />
                    <Route path="/map" element={<MapPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
