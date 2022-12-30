import { Inter } from "@next/font/google";
import Header from "../Components/Header";
import Search from "../Components/Search";

//const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />

      <Search />
    </>
  );
}
