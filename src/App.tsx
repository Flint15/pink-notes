import Aside from "./components/Aside";
import Main from "./components/Main";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import RenameModal from "./components/RenameModal";
import type { NoteData } from "./types/note.ts";
import InfoModal from "./components/InfoModal.tsx";
import Auth from "./components/Auth.tsx";
import { supabase } from "./lib/supabase.ts";
import type { Session } from "@supabase/supabase-js";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  const [notes, setNotes] = useState<NoteData[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string>("");
  const [renameModalOpen, setRenameModalOpen] = useState<boolean>(false);
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const [activeDropDownMenuId, setActiveDropDownMenuId] =
    useState<string>("none");
  const [activeImport, setActiveImport] = useState<boolean>(false);
  const [infoMenu, setInfoMenu] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSessionLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchNotes();
    }
  }, [session]);

  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetchin notes:", error);
    } else {
      const fetched: NoteData[] = data.map((note) => ({
        id: note.id,
        name: note.name,
        content: note.content,
        pinned: note.pinned,
      }));

      // pinned notes first
      const sorted = [
        ...fetched.filter((note) => note.pinned),
        ...fetched.filter((note) => !note.pinned),
      ];

      setNotes(sorted);
      if (sorted.length > 0) setCurrentNoteId(sorted[0].id);
    }
  };

  const createNote = async () => {
    if (!session) return;

    const { data, error } = await supabase
      .from("notes")
      .insert({
        user_id: session.user.id,
        name: "love",
        content: "",
        pinned: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating note:", error);
    } else {
      const newNote: NoteData = {
        id: data.id,
        name: data.name,
        content: data.content,
        pinned: data.pinned,
      };
      setNotes((prev) => [...prev, newNote]);
      setCurrentNoteId(data.id);
    }
  };

  const uploadNote = async (name: string, content: string) => {
    if (!session) return;

    const { data, error } = await supabase
      .from("notes")
      .insert({
        user_id: session.user.id,
        name,
        content,
        pinned: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Error uploading note:", error);
    } else {
      const newNote: NoteData = {
        id: data.id,
        name: data.name,
        content: data.content,
        pinned: data.pinned,
      };
      setNotes((prev) => [...prev, newNote]);
      setCurrentNoteId(data.id);
    }
  };

  const updateNote = async (updatedNote: NoteData) => {
    // update UI instantly
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)),
    );

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(async () => {
      const { error } = await supabase
        .from("notes")
        .update({
          name: updatedNote.name,
          content: updatedNote.content,
          pinned: updatedNote.pinned,
        })
        .eq("id", updatedNote.id);

      if (error) console.error("Error updating note:", error);
    }, 500);
  };

  const deleteNote = async (noteId: string) => {
    const { error } = await supabase.from("notes").delete().eq("id", noteId);

    if (error) {
      console.error("Error deleting note:", error);
      return;
    }

    const remaining = notes.filter((notes) => notes.id !== noteId);
    setNotes(remaining);
    if (remaining.length > 0) setCurrentNoteId(remaining[0].id);
  };

  const pinNote = async (noteId: string) => {
    const note = notes.find((note) => note.id === noteId);
    if (!note) return;

    const updatedNote = { ...note, pinned: !note.pinned };
    await updateNote(updatedNote);

    setNotes((prev) => {
      const updated = prev.map((note) =>
        note.id === noteId ? updatedNote : note,
      );
      return [
        ...updated.filter((note) => note.pinned),
        ...updated.filter((note) => !note.pinned),
      ];
    });
  };

  if (sessionLoading) return null;
  if (!session) return <Auth />;

  return (
    <div className="app">
      <Aside
        notes={notes}
        currentNoteId={currentNoteId}
        setCurrentNoteId={setCurrentNoteId}
        setRenameModalOpen={setRenameModalOpen}
        activeDropDownMenuId={activeDropDownMenuId}
        setActiveDropDownMenuId={setActiveDropDownMenuId}
        activeImport={activeImport}
        setActiveImport={setActiveImport}
        setInfoModal={setInfoModal}
        infoMenu={infoMenu}
        setInfoMenu={setInfoMenu}
        onCreateNote={createNote}
        onDeleteNote={deleteNote}
        onPinNote={pinNote}
        onUploadNote={uploadNote}
      />
      <Main
        notes={notes}
        currentNoteId={currentNoteId}
        onUpdateNote={updateNote}
      />
      <RenameModal
        notes={notes}
        activeDropDownMenuId={activeDropDownMenuId}
        renameModalOpen={renameModalOpen}
        closeModal={() => {
          setRenameModalOpen(false);
        }}
        onUpdateNote={updateNote}
      />
      <InfoModal
        infoModal={infoModal}
        closeModal={() => {
          setInfoModal(false);
        }}
      />
    </div>
  );
}
