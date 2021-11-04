import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import {SimpleContainerProps} from '../../types/ui';
import {NextPage} from 'next';

const HideOnScroll: NextPage<SimpleContainerProps> = ({children}: SimpleContainerProps) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
