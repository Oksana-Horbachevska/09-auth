"use client";

import type { Note, NewNoteData } from "@/types/note";
import { User } from "@/types/user";
import { nextServer } from "./api";

interface NoteResponse {
  notes: Note[];
  page?: number;
  perPage?: number;
  totalPages: number;
}

export type AuthRequestData = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export async function fetchNotes(
  query: string,
  page: number,
  perPage = 12,
  tag?: string
): Promise<NoteResponse> {
  const options = {
    params: {
      ...(query.trim() !== "" && { search: query }),
      page,
      perPage,
      tag,
    },
  };
  const response = await nextServer.get<NoteResponse>("/notes", options);
  return response.data;
}

export async function createNote(noteData: NewNoteData): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", noteData);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export async function register(payload: AuthRequestData) {
  const res = await nextServer.post<User>("/auth/register", payload);
  return res.data;
}

export async function login(payload: AuthRequestData) {
  const res = await nextServer.post<User>("/auth/login", payload);
  return res.data;
}

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export async function updateMe(data: Partial<User>) {
  const response = await nextServer.patch<User>("/users/me", data);
  return response.data;
}
