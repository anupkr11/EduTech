import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    
    <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 bg-opacity-20 backdrop-blur-lg px-4 py-2 rounded-full mb-6"
            data-testid="hero-badge"
          >
            <Sparkles size={20} />
            <span className="text-sm font-medium">
              Join 50,000+ Happy Learners
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            data-testid="hero-title"
          >
            Learn Without Limits,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              Achieve Without Boundaries
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto"
            data-testid="hero-description"
          >
            Build in-demand skills with expert-led courses, hands-on projects,
            and industry-recognized certifications. Your dream career starts
            here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button onClick={()=>navigate(`/courses`)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition flex items-center gap-2 shadow-xl"
              data-testid="hero-cta-explore"
            >
              Explore Courses <ArrowRight size={20} />
            </button>

            <button
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition flex items-center gap-2"
              data-testid="hero-cta-watch"
            >
              <Play size={20} /> Watch Demo
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live Classes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <span>Job Assistance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}