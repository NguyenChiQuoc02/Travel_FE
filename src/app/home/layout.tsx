import HFooter from "@/components/home/footer/footer";
import HomeHeader from "@/components/home/header/header";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeHeader />
      {children}
      <HFooter />
    </>
  );
}
