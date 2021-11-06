import {Theme} from '@mui/material';

export interface ThemeContainer {
  theme?: Theme;
}

export type NavRoute = {
  title: string;
  path: string;
  external?: boolean;
};
