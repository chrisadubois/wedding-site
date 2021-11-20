import {NavRoute} from '../types/global';
import {GIFT_REGISTRY} from './constants';

export const routes: Array<NavRoute> = [
  {title: `home`, path: `/`},
  {title: `details`, path: `/details`},
  {title: 'rsvp', path: '/rsvp'},
  {title: `gift`, path: GIFT_REGISTRY, external: true},
  {title: `music`, path: `/music`},
  {title: `social`, path: `/social`},
];
