import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>

    // <div>
    //   <AppRouterCacheProvider options={{ key: "css" }}>
    //     {children}
    //   </AppRouterCacheProvider>
    // </div>
  );
}
