import {NavRoute} from '../types/global';
import {GIFT_REGISTRY} from './constants';

export const routes: Array<NavRoute> = [
  {title: `home`, path: `/`},
  {title: 'rsvp', path: '/rsvp'},
  {title: `details`, path: `/details`},
  {title: `gift`, path: GIFT_REGISTRY, external: true},
  {title: `music`, path: `/music`},
  {title: `social`, path: `/social`},
  {title: `engagement`, path: '/engagement'},
];

export const minimal: Array<NavRoute> = [
  {title: 'rsvp', path: '/rsvp'},
  {title: `gift`, path: GIFT_REGISTRY, external: true},
];
