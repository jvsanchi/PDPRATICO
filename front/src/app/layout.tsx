import Sidebar from "./components/Sidebar";

import './styles/global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "30px", flex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}