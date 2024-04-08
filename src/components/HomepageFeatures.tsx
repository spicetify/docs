import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Themes',
    image: require('@site/static/images/theme.png').default,
    description: (
      <>
        The customization you&apos;ve always needed, but didn&apos;t know you
        wanted.
      </>
    ),
  },
  {
    title: 'Extensions',
    image: require('@site/static/images/extension.png').default,
    description: (
      <>Small bonus little features that can be sprinkled across Spotify.</>
    ),
  },
  {
    title: 'Custom Apps',
    image: require('@site/static/images/app.png').default,
    description: (
      <>Whole new pages that complement Spotify&apos;s missing ones.</>
    ),
  },
];

function Feature({ image, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureImage} src={image} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
