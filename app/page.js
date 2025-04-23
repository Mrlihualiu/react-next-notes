import styles from "./page.module.css";

export default function Home () {
  return (
    <div className={styles.page}>
      <span className="note-text--empty-state">
        Click a note on the left to view somthing!
      </span>
    </div>
  );
}
