import {Theme} from '@mui/material';

export interface ThemeContainer {
  theme?: Theme;
}

export type NavRoute = {
  title: string;
  path: string;
  external?: boolean;
};

export type Artist = {name: string};

export type Artists = Array<Artist>;

export type Track = {name: string; artists: Artists; uri: string};

export type Tracks = {tracks: {items: Array<Track>}};
