import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import CategoriesSection from "../components/CategoriesSection";
import CoursesSection from "../components/CoursesSection";
import OutcomesSection from "../components/OutcomesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import InstructorsSection from "../components/InstructorsSection";
import FAQSection from "../components/FAQSection";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const coursesRef = useRef(null); // 🔥 reference

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    // 🔥 scroll to courses
    setTimeout(() => {
      coursesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20">
        <Hero />
        <StatsSection />

        {/* 🔥 Pass handler */}
        <CategoriesSection
          onCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
        />

        {/* 🔥 Attach ref */}
        <div ref={coursesRef}>
          <CoursesSection selectedCategory={selectedCategory} />
        </div>

        <OutcomesSection />
        <TestimonialsSection />
        <InstructorsSection />
        <FAQSection />
        <NewsletterSection />
        <Footer />
      </div>
    </div>
  );
}