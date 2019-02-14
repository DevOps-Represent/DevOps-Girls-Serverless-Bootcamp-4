import React from 'react';
import {
  Section,
  Logo,
  Text,
  PageBlock,
  AsidedLayout
} from 'seek-style-guide/react';

import styles from './Header.less';

const renderTitle = () => (
  <div className={styles.titleWrapper}>
    <Text headline baseline={false} raw className={styles.titleText}>
      Todo List
    </Text>
  </div>
);

const Header = () => (
  <div className={styles.header}>
    <PageBlock>
      <Section>
        <AsidedLayout renderAside={renderTitle}>
          <Logo invert />
        </AsidedLayout>
      </Section>
    </PageBlock>
  </div>
);

export default Header;
