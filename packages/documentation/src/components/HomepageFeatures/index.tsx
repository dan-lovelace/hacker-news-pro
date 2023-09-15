/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";

import clsx from "clsx";

import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const featureList: FeatureItem[] = [
  {
    title: "Total Control",
    Svg: require("@site/static/img/undraw_hnp_building.svg").default,
    description: (
      <>Completely customize the Hacker News layout using Handlebars and CSS.</>
    ),
  },
  {
    title: "Integrated Code Editor",
    Svg: require("@site/static/img/undraw_hnp_programming.svg").default,
    description: (
      <>
        Edit and experiment with code directly within the extension for
        real-time changes.
      </>
    ),
  },
  {
    title: "Dark Mode Made Easy",
    Svg: require("@site/static/img/undraw_hnp_darkmode.svg").default,
    description: (
      <>Transform any theme into a sleek dark mode with a single click.</>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center margin-bottom--md">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--lg">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {featureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
