import {NavRoute} from '../types/global';
import {GIFT_REGISTRY, RSVP_EVENT} from './constants';

export const routes: Array<NavRoute> = [
  {title: `home`, path: `/`},
  {title: `details`, path: `/details`},
  {
    title: `RSVP`,
    path: RSVP_EVENT,
    external: true,
  },
  // {title: `music`, path: `/music`},
  {title: `gift`, path: GIFT_REGISTRY, external: true},
  {title: `social`, path: `/social`},
];
