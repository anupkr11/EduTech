export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 shadow bg-white">
      <h1 className="text-2xl font-bold text-blue-600">EduLearn</h1>

      <div className="space-x-6 hidden md:block">
        <a href="#" className="hover:text-blue-600">Home</a>
        <a href="#" className="hover:text-blue-600">Courses</a>
        <a href="#" className="hover:text-blue-600">About</a>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Login
      </button>
    </div>
  );
}