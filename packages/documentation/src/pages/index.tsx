/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import clsx from "clsx";

import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

type StoreItemProps = {
  href: string;
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
};

function StoreItem({ href, title, Svg }: StoreItemProps) {
  return (
    <a
      className={clsx("button button--secondary button--lg", styles.storeLink)}
      href={href}
      target="_blank"
    >
      <Svg className={styles.storeSvg} role="img" />
      <span>{title}</span>
    </a>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p>Available on</p>
        <div className={styles.storeLinks}>
          <StoreItem
            href="https://chrome.google.com/webstore/detail/hacker-news-pro/ihcblehlmbfeecfaiomaihjkeedjepoc"
            title="Chrome"
            Svg={require("@site/static/img/chrome_logo.svg").default}
          />
          <StoreItem
            href="https://addons.mozilla.org/en-US/firefox/addon/hacker-news-pro"
            title="Firefox"
            Svg={require("@site/static/img/firefox_logo.svg").default}
          />
        </div>
        <div className={clsx("hero__video", styles.heroVideo)}>
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            src="https://www.youtube-nocookie.com/embed/6DxLJQrKXa0?si=P7Jop1wUyiZwBnId"
            title="YouTube video player"
          />
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
