import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import HomepageFeatures from '../components/HomepageFeatures';
import SwiperCarousel from '../components/SwiperCarousel';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>

      <div className={styles.heroCarousel}>
        <SwiperCarousel />
      </div>

      <div className={styles.buttons}>
        <Link
          className="button button--secondary button--lg"
          to="/docs/getting-started"
        >
          Install Now!
        </Link>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout description="Powerful CLI tool to take control of the Spotify client.">
      <div className={styles.sponsor}>
        Dive deeper into your top artists with&nbsp;
        <a href="https://anthems.framer.website/?utm_source=spicetify&utm_medium=top-fan">
          Anthems →
          <span className={styles.tooltipMsg}>
            Anthems is a sponsor of Spicetify
          </span>
        </a>
      </div>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
