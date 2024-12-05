import CHeader from "@/components/customer/header/header";
import HFooter from "@/components/home/footer/footer";

export default function Customer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CHeader />
      {children}
      <HFooter />
    </>
  );
}
