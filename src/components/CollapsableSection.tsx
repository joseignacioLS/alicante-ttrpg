import React, { ReactElement, useState } from "react";
import styles from "./CollapsableSection.module.scss";

interface IProps {
  title: string;
  content: ReactElement;
  defaultState?: boolean;
}

const CollapsableSection = ({
  title,
  content,
  defaultState = false,
}: IProps) => {
  const [showContent, setShowContent] = useState<boolean>(defaultState);
  return (
    <section className={styles.wrapper}>
      <h2
        className={styles.title}
        onClick={() => {
          setShowContent((v) => !v);
        }}
      >
        {title} <img src={`/icons/caret-${showContent ? "down" : "up"}.svg`} />
      </h2>
      <div className={`${styles.content} ${showContent && styles.show}`}>
        {content}
      </div>
    </section>
  );
};

export default CollapsableSection;
