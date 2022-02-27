import {InitialStateType} from '../context';

export const generateRouterClassName = (
  styles: {readonly [key: string]: string},
  title: string,
  state: InitialStateType,
  path?: string
): string => {
  if (title.toLowerCase() === 'rsvp' && !state.rsvp.submitted && path?.toLowerCase() !== '/rsvp') {
    return styles?.wiggler || '';
  }
  return '';
};
