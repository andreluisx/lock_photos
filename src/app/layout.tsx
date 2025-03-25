"use client"
import './globals.css';
import { ToastContainer } from 'react-toastify';
import { usePathname } from 'next/navigation';
import NavbarLogged from '@/components/NavBarLogged';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const UserPage = pathname === "/login" || pathname === "/register" || pathname === "/";

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.theme;
              const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              if (theme === "dark" || (!theme && prefersDark)) {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            `,
          }}
        />
      </head>
      <body className={`bg-slate-950 text-slate-200`}>
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
          {!UserPage && 
            <div className='pb-18'>
              <NavbarLogged/>
            </div>
          }
          {children}
          
          

      </body>
    </html>
  );
}
