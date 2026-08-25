import { Navigate, Route, Routes } from 'react-router-dom';
import { Shell } from './components/Shell';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { Toolkit } from './pages/Toolkit';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Toolkit is no longer a destination; its content folds into About in
            the next stage. Routed until then so nothing is stranded. */}
        <Route path="/toolkit" element={<Toolkit />} />

        {/* Home absorbed the work index. */}
        <Route path="/work" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
