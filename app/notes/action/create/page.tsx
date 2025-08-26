import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "CreateNote",
  description: "Here you can create new notes.",
  openGraph: {
    title: "CreateNote",
    description: "Here you can create new notes.",
    url: "http://localhost:3000/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "CreateNote",
      },
    ],
  },
};

export default function CreateNote() {
  const tag = ["Work", "Personal", "Meeting", "Shopping", "Todo"];
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm tag={tag} />
      </div>
    </main>
  );
}
