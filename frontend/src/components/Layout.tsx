import { Bar } from "@ui5/webcomponents-react";
import styles from "./layout.module.scss";

export function Layout(props) {
  return (
    <>
      <Bar
        className={styles.bar}
        design="Header"
        startContent={<h2>NTT</h2>}
      />
      <div className={styles.content}>{props.children}</div>
    </>
  );
}
