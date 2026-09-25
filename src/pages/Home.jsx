import { SearchBar } from "../components/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter";
import { CATEGORIES } from "../data/products";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex-1 pb-20">
        <div className="mx-auto w-full max-w-app px-4 sm:px-6">
          <SearchBar />
          <CategoryFilter categories={CATEGORIES} />
          <p>Listar los productos</p>
        </div>
      </div>
      <Footer />
    </>
  );
};
