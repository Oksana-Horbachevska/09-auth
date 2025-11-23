"use client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { useRouter } from "next/navigation";
import { fetchNotes } from "@/lib/api/clientApi";
import css from "./page.module.css";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const limit = 12;

  const updateSearchQuery = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
    const tagPart = tag ? `/notes/filter/${tag}` : "/notes/filter/All";
    router.push(`${tagPart}?query=${newQuery}&page=1`);
  }, 300);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", query, currentPage, limit, tag],
    queryFn: () => fetchNotes(query, currentPage, limit, tag),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const tagPart = tag ? `/notes/filter/${tag}` : "/notes/filter/All";
    router.push(`${tagPart}?query=${query}&page=${page}`);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          onSearch={(val) => {
            setInputValue(val);
            updateSearchQuery(val);
          }}
          value={inputValue}
        />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <Loader />}
      {isError && <p>Error loading notes</p>}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isSuccess && data.notes.length === 0 && (
        <p className={css.empty}>No notes found</p>
      )}
    </div>
  );
}
