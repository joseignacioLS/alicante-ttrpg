import React, { ReactElement, useState } from "react";
import styles from "./CollapsableSection.module.scss";

interface IProps {
  title: string;
  content: ReactElement;
}

const CollapsableSection = ({ title, content }: IProps) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  return (
    <section className={styles.wrapper}>
      <h2
        className={styles.title}
        onClick={() => {
          setShowContent((v) => !v);
        }}
      >
        {title}
      </h2>
      <div className={`${styles.content} ${showContent && styles.show}`}>
        {content}
      </div>
    </section>
  );
};

export default CollapsableSection;
