import * as React from 'react';
import type { DirectionType } from 'antd/es/config-provider';
import type { ThemeName } from '../common/ThemeSwitch';

export interface SiteContextProps {
  isMobile: boolean;
  direction: DirectionType;
  theme: ThemeName[];
  updateSiteContext: (props: Partial<SiteContextProps>) => void;
}

const SiteContext = React.createContext<SiteContextProps>({
  isMobile: false,
  direction: 'ltr',
  theme: ['light'],
  updateSiteContext: () => {},
});

export default SiteContext;
