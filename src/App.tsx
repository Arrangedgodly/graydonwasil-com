import { Route, Routes } from 'react-router-dom';
import { Shell } from './components/Shell';
import { Intro } from './pages/Intro';
import { Work } from './pages/Work';
import { ProjectDetail } from './pages/ProjectDetail';
import { Toolkit } from './pages/Toolkit';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Intro />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/toolkit" element={<Toolkit />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
