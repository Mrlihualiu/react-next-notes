import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { getTranslation } from "@/app/i18n/index.js"
import SidebarSearchField from '@/components/Sidebar/SidebarSearchField';
import SidebarNoteList from "@/components/Sidebar/SidebarNoteList";
import EditButton from '@/components/Common/EditButton';
import NoteListSkeleton from "@/components/Note/NoteListSkeleton";

import "@/public/style.css";

export default async function Sidebar ({ lng }) {
  const { t } = await getTranslation(lng)

  return (
    <>
      <section className="col sidebar">
        <Link href="/" className="link--unstyled">
          <section className="sidebar-header">
            <Image
              src="/logo.svg"
              width={22}
              height={22}
              alt="logo"
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField />
          <EditButton noteId={null}>{t('new')}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}
