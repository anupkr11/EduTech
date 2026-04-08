import Navbar from "../components/Navbar";
import CoursesSection from "../components/CoursesSection";
import Footer from "../components/Footer";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20">
        <CoursesSection />
      </div>

      <Footer />
    </div>
  );
}