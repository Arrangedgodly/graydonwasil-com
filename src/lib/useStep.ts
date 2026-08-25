import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { VIEWS } from './nav';
import { useViewMeta } from './useViewMeta';

export function useStep() {
  const navigate = useNavigate();
  const { inDetail, project, view } = useViewMeta();

  return (d: 1 | -1) => {
    if (inDetail && project) {
      const i = PROJECTS.findIndex((p) => p.id === project.id);
      const next = PROJECTS[(i + d + PROJECTS.length) % PROJECTS.length];
      navigate(`/projects/${next.id}`);
      return;
    }
    const i = VIEWS.findIndex((v) => v.path === view.path);
    const next = VIEWS[(i + d + VIEWS.length) % VIEWS.length];
    navigate(next.path);
  };
}
