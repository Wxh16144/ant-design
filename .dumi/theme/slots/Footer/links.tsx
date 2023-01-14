import React from 'react';
import { Link, FormattedMessage } from 'dumi';
import {
  AntDesignOutlined,
  BgColorsOutlined,
  BugOutlined,
  GithubOutlined,
  HistoryOutlined,
  IssuesCloseOutlined,
  MediumOutlined,
  QuestionCircleOutlined,
  TwitterOutlined,
  UsergroupAddOutlined,
  ZhihuOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import type { FooterColumn, FooterColumnItem } from 'rc-footer/lib/column';
import useLocale from '../../../hooks/useLocale';
import useLocation from '../../../hooks/useLocation';

type LocaleUrl = {
  en: string;
  cn?: string;
};

type LinkItem = Omit<FooterColumnItem, 'url'> & {
  url: string | LocaleUrl;
};

function getLocaleUrl(url: string | LocaleUrl, locale: keyof LocaleUrl) {
  if (typeof url === 'string') {
    return url;
  }
  return url[locale] || url.en;
}

const useLinks = () => {
  const { getLink } = useLocation();
  const [, locale] = useLocale();
  const isZhCN = locale === 'cn';

  function processItem(items: LinkItem[]) {
    return items.map<FooterColumnItem>((item) => ({
      ...item,
      url: getLocaleUrl(item.url, locale),
    }));
  }

  const resourcesItems: LinkItem[] = [
    {
      title: 'Ant Design Charts',
      url: 'https://charts.ant.design',
      openExternal: true,
    },
    {
      title: 'Ant Design Pro',
      url: 'https://pro.ant.design',
      openExternal: true,
    },
    {
      title: 'Ant Design Pro Components',
      url: 'https://procomponents.ant.design',
      openExternal: true,
    },
    {
      title: 'Ant Design Mobile',
      url: 'https://mobile.ant.design',
      openExternal: true,
    },
    {
      title: 'Ant Design Landing',
      description: <FormattedMessage id="app.footer.landing" />,
      url: 'https://landing.ant.design',
      openExternal: true,
    },
    {
      title: 'Scaffolds',
      description: <FormattedMessage id="app.footer.scaffolds" />,
      url: 'https://scaffold.ant.design',
      openExternal: true,
    },
    {
      title: 'Umi',
      description: <FormattedMessage id="app.footer.umi" />,
      url: 'https://umijs.org',
      openExternal: true,
    },
    {
      title: 'dumi',
      description: <FormattedMessage id="app.footer.dumi" />,
      url: 'https://d.umijs.org',
      openExternal: true,
    },
    {
      title: 'qiankun',
      description: <FormattedMessage id="app.footer.qiankun" />,
      url: 'https://qiankun.umijs.org',
      openExternal: true,
    },
    {
      title: 'ahooks',
      description: <FormattedMessage id="app.footer.hooks" />,
      url: 'https://github.com/alibaba/hooks',
      openExternal: true,
    },
    {
      title: 'Ant Motion',
      description: <FormattedMessage id="app.footer.motion" />,
      url: 'https://motion.ant.design',
      openExternal: true,
    },
    {
      title: <FormattedMessage id="app.footer.chinamirror" />,
      url: 'https://ant-design.antgroup.com',
    },
  ];

  const communityItems: LinkItem[] = [
    {
      icon: <AntDesignOutlined />,
      title: <FormattedMessage id="app.footer.awesome" />,
      url: 'https://github.com/websemantics/awesome-ant-design',
      openExternal: true,
    },
    {
      icon: <MediumOutlined />,
      title: 'Medium',
      url: 'http://medium.com/ant-design/',
      openExternal: true,
    },
    {
      icon: <TwitterOutlined style={{ color: '#1DA1F2' }} />,
      title: 'Twitter',
      url: 'http://twitter.com/antdesignui',
      openExternal: true,
    },
    {
      icon: (
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
          alt="yuque"
        />
      ),
      title: <FormattedMessage id="app.footer.yuque.repo" />,
      url: 'https://yuque.com/ant-design/ant-design',
      openExternal: true,
    },
    {
      icon: <ZhihuOutlined style={{ color: '#056de8' }} />,
      title: <FormattedMessage id="app.footer.zhihu" />,
      url: 'https://www.zhihu.com/column/c_1564262000561106944',
      openExternal: true,
    },
    {
      icon: <ZhihuOutlined style={{ color: '#056de8' }} />,
      title: <FormattedMessage id="app.footer.zhihu.xtech" />,
      url: 'http://zhuanlan.zhihu.com/xtech',
      openExternal: true,
    },
    {
      icon: (
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png"
          alt="seeconf"
        />
      ),
      title: 'SEE Conf',
      description: <FormattedMessage id="app.footer.seeconf" />,
      url: 'https://seeconf.antfin.com/',
      openExternal: true,
    },
  ];

  const helpItems: LinkItem[] = [
    {
      icon: <GithubOutlined />,
      title: 'GitHub',
      url: 'https://github.com/ant-design/ant-design',
      openExternal: true,
    },
    {
      icon: <HistoryOutlined />,
      title: <FormattedMessage id="app.footer.change-log" />,
      url: getLink('/changelog'),
      LinkComponent: Link,
    },
    {
      icon: <QuestionCircleOutlined />,
      title: <FormattedMessage id="app.footer.faq" />,
      url: getLink('/docs/react/faq'),
      LinkComponent: Link,
    },
    {
      icon: <BugOutlined />,
      title: <FormattedMessage id="app.footer.bug-report" />,
      url: 'https://new-issue.ant.design/',
      openExternal: true,
    },
    {
      icon: <IssuesCloseOutlined />,
      title: <FormattedMessage id="app.footer.issues" />,
      url: 'https://github.com/ant-design/ant-design/issues',
      openExternal: true,
    },
    {
      icon: <MessageOutlined />,
      title: <FormattedMessage id="app.footer.discussions" />,
      url: 'https://github.com/ant-design/ant-design/discussions',
      openExternal: true,
    },
    {
      icon: <QuestionCircleOutlined />,
      title: <FormattedMessage id="app.footer.stackoverflow" />,
      url: 'http://stackoverflow.com/questions/tagged/antd',
      openExternal: true,
    },
    {
      icon: <QuestionCircleOutlined />,
      title: <FormattedMessage id="app.footer.segmentfault" />,
      url: 'https://segmentfault.com/t/antd',
      openExternal: true,
    },
  ];

  const productItems: LinkItem[] = [
    {
      icon: (
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
          alt="yuque"
        />
      ),
      title: <FormattedMessage id="app.footer.yuque" />,
      url: 'https://yuque.com',
      description: <FormattedMessage id="app.footer.yuque.slogan" />,
      openExternal: true,
    },
    {
      icon: (
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png"
          alt="AntV"
        />
      ),
      title: 'AntV',
      url: 'https://antv.vision',
      description: <FormattedMessage id="app.footer.antv.slogan" />,
      openExternal: true,
    },
    {
      icon: <img src="https://www.eggjs.org/logo.svg" alt="Egg" />,
      title: 'Egg',
      url: 'https://eggjs.org',
      description: <FormattedMessage id="app.footer.egg.slogan" />,
      openExternal: true,
    },
    {
      icon: (
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico"
          alt="kitchen"
        />
      ),
      title: 'Kitchen',
      description: <FormattedMessage id="app.footer.kitchen" />,
      url: 'https://kitchen.alipay.com',
      openExternal: true,
    },
    {
      icon: (
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
          alt="xtech"
        />
      ),
      title: <FormattedMessage id="app.footer.xtech" />,
      url: 'https://xtech.antfin.com/',
      openExternal: true,
    },
    {
      icon: <BgColorsOutlined />,
      title: <FormattedMessage id="app.footer.theme" />,
      url: getLink('/theme-editor'),
      LinkComponent: Link,
    },
  ];

  // ========= isZhCN =========
  if (isZhCN) {
    communityItems.push({
      icon: <UsergroupAddOutlined />,
      title: <FormattedMessage id="app.footer.work_with_us" />,
      url: getLink('/docs/resources', {
        cn: '加入我们',
        en: 'JoinUs',
      }),
      LinkComponent: Link,
    });
  }

  const resources: FooterColumn = {
    title: <FormattedMessage id="app.footer.resources" />,
    items: processItem(resourcesItems),
  };

  const community: FooterColumn = {
    title: <FormattedMessage id="app.footer.community" />,
    items: processItem(communityItems),
  };

  const help: FooterColumn = {
    title: <FormattedMessage id="app.footer.help" />,
    items: processItem(helpItems),
  };

  const product: FooterColumn = {
    icon: (
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
        alt="Ant XTech"
      />
    ),
    title: <FormattedMessage id="app.footer.more-product" />,
    items: processItem(productItems),
  };

  return [resources, community, help, product];
};

export default useLinks;
