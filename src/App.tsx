import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import LabCategories from './pages/LabCategories';
import ExperimentDetail from './pages/ExperimentDetail';
import SimulationWorkspace from './pages/SimulationWorkspace';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="labs" element={<LabCategories />} />
          <Route path="labs/:experimentId" element={<ExperimentDetail />} />
          <Route path="simulation/:experimentId" element={<SimulationWorkspace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
