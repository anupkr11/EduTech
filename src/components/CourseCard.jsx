export default function CourseCard({ title, desc }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-2xl transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
      <button className="mt-4 text-blue-600 font-medium">
        View Course →
      </button>
    </div>
  );
}