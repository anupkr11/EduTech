import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import CategoriesSection from '../components/CategoriesSection';
import CoursesSection from '../components/CoursesSection';
import OutcomesSection from '../components/OutcomesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import InstructorsSection from '../components/InstructorsSection';
import FAQSection from '../components/FAQSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsSection />
      <CategoriesSection />
      <CoursesSection />
      <OutcomesSection />
      <TestimonialsSection />
      <InstructorsSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}