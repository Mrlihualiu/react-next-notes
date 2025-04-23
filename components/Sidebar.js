import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import SidebarSearchField from '@/components/SidebarSearchField';
import SidebarNoteList from "@/components/SidebarNoteList";
import EditButton from '@/components/EditButton';
import NoteListSkeleton from "@/components/NoteListSkeleton";

import "../public/style.css";

export default async function Sidebar () {
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
          <EditButton noteId={null}>New</EditButton>
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
