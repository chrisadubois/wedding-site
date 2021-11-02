import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {Info, Instagram} from '@mui/icons-material';
import StyledLink from '../StyledLink';
import {IconButton, Tooltip} from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{py: 1, bgcolor: 'secondary.main'}}>
      <Stack direction="row" justifyContent="center" spacing={4}>
        <StyledLink href="/info" target="_blank" rel="noopener noreferrer">
          <Tooltip title="About this Site">
            <IconButton>
              <Info fontSize="large" />
            </IconButton>
          </Tooltip>
        </StyledLink>
        <StyledLink href="https://www.instagram.com/saracrauer/" target="_blank" rel="noopener noreferrer">
          <Tooltip title="Sara's Instagram">
            <IconButton>
              <Instagram fontSize="large" />
            </IconButton>
          </Tooltip>
        </StyledLink>
      </Stack>
      <Typography align="center" color="primary.main">
        © 2021 - {new Date().getFullYear()}, Christopher DuBois
      </Typography>
    </Box>
  );
};

export default Footer;
