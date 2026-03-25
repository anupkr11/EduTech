export default function Features() {
  const features = [
    {
      title: "Expert Instructors",
      desc: "Learn from industry professionals",
    },
    {
      title: "Flexible Learning",
      desc: "Learn anytime, anywhere",
    },
    {
      title: "AI Assistance",
      desc: "Smart chatbot guidance",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why Choose EduLearn?
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}