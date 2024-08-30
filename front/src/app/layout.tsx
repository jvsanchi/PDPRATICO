import Sidebar from "./components/Sidebar";

import './styles/global.css';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <main style={{ marginLeft: "200px", padding: "20px", flexGrow: 1 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
