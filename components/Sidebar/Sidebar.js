import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import SidebarSearchField from '@/components/Sidebar/SidebarSearchField';
import SidebarNoteList from "@/components/Sidebar/SidebarNoteList";
import EditButton from '@/components/Common/EditButton';
import NoteListSkeleton from "@/components/Note/NoteListSkeleton";
import SidebarImport from "./SidebarImport";

import "@/public/style.css";

export default function Sidebar ({ i18nText, lng }) {

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
          <EditButton noteId={null} lng={lng}>{i18nText.new}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
        <SidebarImport i18nText={i18nText} />
      </section>
    </>
  )
}
