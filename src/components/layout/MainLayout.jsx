import Navbar from "./elements/Navbar";
import Footer from "./elements/Footer";

const MainLayout = ({ children }) => {

  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-md border mx-auto py-20">
        {children}
      </main>
      <Footer />
    </>
  );

};

export default MainLayout;