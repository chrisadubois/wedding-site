import {NavRoute} from '../types/global';

export const routes: Array<NavRoute> = [
  {title: 'main', path: '/'},
  {title: `logistics`, path: `/logistics`},
  {title: `social`, path: `/social`},
  {title: `gift`, path: `https://www.honeyfund.com/wedding/crauer-dubois-07-16-2022`, external: true},
  {title: `music`, path: `/music`},
  {
    title: `RSVP`,
    path: 'https://www.eventbrite.com/e/dubois-crauer-wedding-tickets-206185224557?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=cp&aff=escb',
    external: true,
  },
];
