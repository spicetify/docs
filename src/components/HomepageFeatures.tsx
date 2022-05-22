// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Themes',
    Svg: require('../../static/images/undraw_docusaurus_mountain.svg').default,
    description: <>The customization you&apos;ve always needed, but didn&apos;t know you wanted.</>,
  },
  {
    title: 'Extensions',
    Svg: require('../../static/images/undraw_docusaurus_tree.svg').default,
    description: <>Small bonus little features that can be sprinkled across Spotify.</>,
  },
  {
    title: 'Custom Apps',
    Svg: require('../../static/images/undraw_docusaurus_react.svg').default,
    description: <>Whole new pages that complement Spotify&apos;s missing ones.</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
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
