import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/mockData';

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            data-testid="testimonials-section-title"
          >
            Success Stories
          </h2>
          <p className="text-gray-600 text-lg">
            Hear from our students who transformed their careers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              data-testid={`testimonial-card-${testimonial.id}`}
            >
              <Quote className="text-blue-600 mb-4" size={32} />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-500 fill-yellow-500"
                    size={16}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p
                    className="font-bold"
                    data-testid={`testimonial-name-${testimonial.id}`}
                  >
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}