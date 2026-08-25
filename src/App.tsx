import { Navigate, Route, Routes } from 'react-router-dom';
import { Shell } from './components/Shell';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
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

        {/* Home absorbed the work index; Toolkit folded into About. */}
        <Route path="/work" element={<Navigate to="/" replace />} />
        <Route path="/toolkit" element={<Navigate to="/about" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
