import {ImageList, ImageListItem, Link} from '@mui/material';
import {Box} from '@mui/system';
import type {NextPage} from 'next';
import Image from 'next/image';
import StyledLink from '../components/StyledLink';

const Info: NextPage = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'}}>
      <p>I built this site from scratch using JAMstack - NextJS, Contentful, Sass, MaterialUI</p>
      <p>The RSVP service is basic and is using a supabase PostgreSQL DB</p>
      <p>The authentication is built with NextAuth plain credentials</p>
      <p>It has CI/CD with Github Actions, Cypress, Jest Tests, and Vercel Deployment</p>
      <p>It is using all completely free services (besides domain hosting)</p>
      <p>Let me know if you want to talk about it !</p>
      <StyledLink href="https://www.linkedin.com/in/chrisadubois/" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </StyledLink>
    </Box>
  );
};

export default Info;
