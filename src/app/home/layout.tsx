"use client";
import HFooter from "@/components/home/footer/footer";
import HomeHeader from "@/components/home/header/header";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <HomeHeader />
        {children}
        <HFooter />
      </QueryClientProvider>
    </div>
  );
}
