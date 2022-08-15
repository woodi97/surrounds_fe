import siteMetadata from '@src/core/config/siteMetadata';

import GA from './GoogleAnalytics';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const isProduction = process.env.NODE_ENV === 'production';

const Analytics = () => {
  return <>{isProduction && siteMetadata.analytics.googleAnalyticsId && <GA />}</>;
};

export default Analytics;
