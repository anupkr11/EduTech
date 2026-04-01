import { outcomes } from "../data/mockData";
import {
  Trophy,
  Briefcase,
  DollarSign,
  Award,
  Star,
} from "lucide-react";

const iconMap = {
  Trophy,
  Briefcase,
  DollarSign,
  Award,
};

export default function OutcomesSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Why Students Choose Us
          </h2>
          <p className="text-blue-200 text-lg">
            Real outcomes, real success, real career transformation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {outcomes.map((outcome, index) => {
            const Icon = iconMap[outcome.icon] || Star;

            return (
              <div
                key={index}
                className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <Icon size={32} className="text-blue-300" />
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  {outcome.title}
                </h3>

                <p className="text-blue-200">
                  {outcome.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}