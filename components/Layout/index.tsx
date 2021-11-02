import {NextPage} from 'next';

import styles from '../../styles/modules/layout.module.scss';
import {LayoutProps} from '../../types/ui';

const Layout: NextPage<LayoutProps> = (props: LayoutProps) => {
  const {children} = props;
  return <main className={styles.main}>{children}</main>;
};

export default Layout;
