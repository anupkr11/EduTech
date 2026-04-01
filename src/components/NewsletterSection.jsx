import { Mail, Send } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <Mail className="mx-auto text-white mb-6" size={48} />

        <h2
          className="text-4xl font-bold text-white mb-4"
          data-testid="newsletter-section-title"
        >
          Stay Updated
        </h2>

        <p className="text-blue-100 text-lg mb-8">
          Subscribe to our newsletter for course updates, special offers,
          and learning tips
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
            required
            data-testid="newsletter-email-input"
          />

          <button
            type="submit"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
            data-testid="newsletter-submit-button"
          >
            Subscribe <Send size={20} />
          </button>
        </form>

        {subscribed && (
          <p
            className="mt-4 text-white font-medium"
            data-testid="newsletter-success-message"
          >
            ✓ Successfully subscribed!
          </p>
        )}
      </div>
    </section>
  );
}