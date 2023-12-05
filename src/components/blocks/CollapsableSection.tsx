import React, { ReactElement, useState } from "react";
import styles from "./CollapsableSection.module.scss";

interface IProps {
  title: ReactElement;
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
      <div
        className={styles.title}
        onClick={() => {
          setShowContent((v) => !v);
        }}
      >
        {title}
        <svg
          className={`${styles.caret} ${showContent && styles.rotate180}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.2929 8.79289C11.6834 8.40237 12.3166 8.40237 12.7071 8.79289L17.7071 13.7929C18.0976 14.1834 18.0976 14.8166 17.7071 15.2071C17.3166 15.5976 16.6834 15.5976 16.2929 15.2071L12 10.9142L7.70711 15.2071C7.31658 15.5976 6.68342 15.5976 6.29289 15.2071C5.90237 14.8166 5.90237 14.1834 6.29289 13.7929L11.2929 8.79289Z"
          />
        </svg>
      </div>
      <div className={`${styles.content} ${showContent && styles.show}`}>
        {content}
      </div>
    </section>
  );
};

export default CollapsableSection;
