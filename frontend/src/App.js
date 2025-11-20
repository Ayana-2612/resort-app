//component based approach
//src/App.js
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import BookingsPage from "./components/BookingsPage";


function App() {
  return (

     <Routes>
      <Route path="/" element={
          <>
            <Hero />
            <Services />
            <Gallery />
            <BookingForm />
            <Footer />
          </>
        }
      />

      {/* Contact page */}
      <Route path="/contact" element={<Footer />} />
      {/* BookingsPage */}
      <Route path="/bookings" element={<BookingsPage />} />

    </Routes>
    
    // <div>
    //   <Hero />
    //   <Services />
    //   <Gallery />
    //   <BookingForm />
    //   <Footer />
    // </div>
  );
}

export default App;
