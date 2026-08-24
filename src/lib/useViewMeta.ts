import { useLocation, useParams } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { VIEWS, FOOT } from './nav';

export function useViewMeta() {
  const location = useLocation();
  const params = useParams();

  const project = location.pathname.startsWith('/work/')
    ? PROJECTS.find((p) => p.id === params.slug) ?? null
    : null;
  const inDetail = !!project;

  const view = inDetail
    ? VIEWS.find((v) => v.path === '/work')!
    : VIEWS.find((v) => v.path === location.pathname) ?? VIEWS[0];

  return {
    view,
    project,
    inDetail,
    crumbNum: inDetail ? project!.num : view.num,
    crumbTitle: inDetail ? `Work / ${project!.title}` : view.label,
    hint: inDetail ? '← → between projects' : '← → between sections',
    footNote: inDetail ? 'Esc goes back to all work.' : FOOT[view.path],
    pageCount: inDetail ? `${project!.num} / 03` : `${view.num} / 05`,
  };
}
