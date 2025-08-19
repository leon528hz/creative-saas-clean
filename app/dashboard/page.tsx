import { redirect } from "next/navigation";
import { getSessionServer } from "@/lib/sessionServer";
import Notes from "./sections/Notes";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSessionServer();
  if (!session) redirect("/");

  return (
    <main>
      <h2>dashboard</h2>
      <p>you are logged in as <b>{session.user.email}</b></p>
      <div style={{margin:"16px 0"}}>
        <form action="/dashboard/signout" method="post">
          <button type="submit">log out</button>
        </form>
      </div>
      <section>
        <h3>notes (placeholder for onboarding / tasks)</h3>
        <Notes userId={session.user.id}/>
      </section>
      <section style={{marginTop:24}}>
        <h3>next steps</h3>
        <ul>
          <li>add “clients”, “briefs”, “assets/UGC”, “campaigns” entities</li>
          <li>connect Shopify/Meta/TikTok/Klaviyo later</li>
          <li>invite agents as separate role</li>
        </ul>
        <p><Link href="/">← back home</Link></p>
      </section>
    </main>
  );
}
