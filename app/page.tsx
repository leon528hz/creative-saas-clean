"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login"|"signup">("login");
  const [msg, setMsg] = useState<string>("");
  const router = useRouter();
  const supabase = createClient();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) return setMsg(error.message);
      setMsg("check your email to confirm your account, then log in.");
      setMode("login");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);
    router.push("/dashboard");
  };

  return (
    <main>
      <h2>welcome</h2>
      <p>sign up or log in to access your dashboard.</p>
      <form onSubmit={submit} style={{display:"grid", gap:12, maxWidth:360}}>
        <input type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">{mode==="login"?"log in":"sign up"}</button>
        <button type="button" onClick={()=>setMode(mode==="login"?"signup":"login")} style={{background:"transparent", border:"1px solid #ddd"}}>
          {mode==="login"?"create an account":"have an account? log in"}
        </button>
      </form>
      {msg && <p style={{color:"#555", marginTop:12}}>{msg}</p>}
    </main>
  );
}
