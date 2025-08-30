import NotesClient from "./Notes.client";
import type { Metadata } from "next";
import { fetchNotesServer } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  return {
    title: `${tag} notes`,
    description: `Your ${tag} notes`,
    openGraph: {
      title: `${tag} notes`,
      description: `Your ${tag} notes`,
      url: `http://localhost:3000/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${tag} notes`,
        },
      ],
    },
  };
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const tag = slug[0] === "All" ? undefined : slug[0];
  const limit = 12;
  const currentPage = 1;
  await queryClient.prefetchQuery({
    queryKey: ["notes", currentPage, limit, tag],
    queryFn: () => fetchNotesServer("", 1, limit, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
