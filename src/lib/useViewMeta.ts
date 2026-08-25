import { useLocation, useParams } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { VIEWS, FOOT, DETAIL_FOOT } from './nav';

export function useViewMeta() {
  const location = useLocation();
  const params = useParams();

  const project = location.pathname.startsWith('/projects/')
    ? PROJECTS.find((p) => p.id === params.slug) ?? null
    : null;
  const inDetail = !!project;

  /* A project detail page still belongs to Work as far as the nav pill is
   * concerned, so the indicator stays put while you step through projects. */
  const view = inDetail
    ? VIEWS[0]
    : VIEWS.find((v) => v.path === location.pathname) ?? VIEWS[0];

  return {
    view,
    project,
    inDetail,
    footNote: inDetail ? DETAIL_FOOT : FOOT[view.path],
  };
}
