"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

type Note = { id: string; content: string; user_id: string; created_at: string };

export default function Notes({ userId }: { userId: string }) {
  const supabase = createClient();
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");

  const load = async () => {
    const { data } = await supabase
      .from("notes").select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    setNotes((data || []) as Note[]);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const { error } = await supabase.from("notes").insert({ content, user_id: userId });
    if (!error) { setContent(""); load(); }
  };

  return (
    <div>
      <form onSubmit={add} style={{display:"grid", gap:8, maxWidth:520}}>
        <textarea rows={3} placeholder="add a note (e.g., client onboarding step)" value={content} onChange={e=>setContent(e.target.value)} />
        <button type="submit">add note</button>
      </form>
      <ul style={{marginTop:16, paddingLeft:16}}>
        {notes.map(n => (
          <li key={n.id} style={{marginBottom:8}}>
            <div style={{fontSize:14, opacity:0.7}}>{new Date(n.created_at).toLocaleString()}</div>
            <div>{n.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
