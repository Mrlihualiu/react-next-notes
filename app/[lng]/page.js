import { getTranslation } from "@/app/i18n/index.js"
import styles from "./page.module.css";

export default async function Home ({ params }) {
  const { lng } = await params;

  const { t } = await getTranslation(lng)

  return (
    <div className={styles.page}>
      <span className="note-text--empty-state">
        {t('initText')}
      </span>
    </div>
  );
}
