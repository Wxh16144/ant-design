import React, { useContext } from 'react';
import RcFooter from 'rc-footer';
import { css } from '@emotion/react';
import { TinyColor } from '@ctrl/tinycolor';
import getAlphaColor from 'antd/es/theme/util/getAlphaColor';
import useLocale from '../../../hooks/useLocale';
import useSiteToken from '../../../hooks/useSiteToken';
import AdditionalInfo from './AdditionalInfo';
import SiteContext from '../SiteContext';
import useLinks from './links';

const locales = {
  cn: {
    owner: '蚂蚁集团和 Ant Design 开源社区',
  },
  en: {
    owner: 'Ant Group and Ant Design Community',
  },
};

const useStyle = () => {
  const { token } = useSiteToken();
  const { isMobile } = useContext(SiteContext);
  const background = new TinyColor(getAlphaColor('#f0f3fa', '#fff'))
    .onBackground(token.colorBgContainer)
    .toHexString();

  return {
    holder: css`
      background: ${background};
    `,

    footer: css`
      background: ${background};
      color: ${token.colorTextSecondary};
      box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);

      * {
        box-sizing: border-box;
      }

      h2,
      a {
        color: ${token.colorText};
      }

      .rc-footer-column {
        margin-bottom: ${isMobile ? 60 : 0}px;
        :last-child {
          margin-bottom: ${isMobile ? 20 : 0}px;
        }
      }

      .rc-footer-item-icon {
        top: -1.5px;
      }

      .rc-footer-container {
        max-width: 1208px;
        margin-inline: auto;
        padding-inline: ${token.marginXXL}px;
      }

      .rc-footer-bottom {
        box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);
        .rc-footer-bottom-container {
          font-size: ${token.fontSize}px;
        }
      }
    `,
  };
};

const Footer = () => {
  const [locale] = useLocale(locales);
  const style = useStyle();

  const columns = useLinks();

  return (
    <>
      <RcFooter
        // columns={getColumns}
        columns={columns}
        css={style.footer}
        bottom={
          <>
            <div style={{ opacity: '0.4' }}>
              Made with <span style={{ color: '#fff' }}>❤</span> by
            </div>
            <div>{locale.owner}</div>
          </>
        }
      />
      <AdditionalInfo />
    </>
  );
};

export default Footer;
