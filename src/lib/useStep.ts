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

/** Labels for where a step would land, so a swipe can name its destination
 *  while the gesture is still in progress. */
export function useStepTargets(): { next: string; prev: string } {
  const { inDetail, project, view } = useViewMeta();

  if (inDetail && project) {
    const i = PROJECTS.findIndex((p) => p.id === project.id);
    return {
      next: PROJECTS[(i + 1) % PROJECTS.length].title,
      prev: PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length].title,
    };
  }

  const i = VIEWS.findIndex((v) => v.path === view.path);
  return {
    next: VIEWS[(i + 1) % VIEWS.length].label,
    prev: VIEWS[(i - 1 + VIEWS.length) % VIEWS.length].label,
  };
}
