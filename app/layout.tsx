import "./globals.css";

export const metadata = { title: "Creative SaaS", description: "UGC & growth OS" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{maxWidth:960, margin:"0 auto", padding:"24px"}}>
          <header style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24}}>
            <h1 style={{margin:0, fontSize:20}}>Creative SaaS</h1>
            <nav>
              <a href="/" style={{marginRight:16}}>home</a>
              <a href="/dashboard">dashboard</a>
            </nav>
          </header>
          {children}
          <footer style={{marginTop:40, opacity:0.6, fontSize:12}}>© {new Date().getFullYear()} Creative SaaS</footer>
        </div>
      </body>
    </html>
  );
}
