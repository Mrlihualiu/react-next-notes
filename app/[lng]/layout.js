import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { locales } from "@/config";
import { getTranslation } from "@/app/i18n/index.js";

export const metadata = {
  title: "Next Notes",
  description: "编辑你的梦想笔记",
};

export async function generateStaticParams () {
  return locales.map((lng) => ({ lng }))
}

export default async function RootLayout ({
  children,
  params
}) {
  const { lng } = await params;
  const { t } = await getTranslation(lng)
  const i18nText = {
    new: t('new'),
  }

  return (
    <html lang={lng}>
      <body>
        <div className="container">
          <div className="main">
            <Sidebar i18nText={i18nText} />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
