import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/mockData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            data-testid="faq-section-title"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Got questions? We've got answers
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
              data-testid={`faq-item-${index}`}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                data-testid={`faq-question-${index}`}
              >
                <span className="font-semibold text-lg pr-4">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>

              {openIndex === index && (
                <div
                  className="px-6 pb-6 text-gray-600"
                  data-testid={`faq-answer-${index}`}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}