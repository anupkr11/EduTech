import CourseCard from "./CourseCard";

export default function Courses() {
  const courses = [
    { title: "React Development", desc: "Build modern web apps" },
    { title: "Java DSA", desc: "Crack coding interviews" },
    { title: "Full Stack Dev", desc: "Frontend + Backend mastery" },
  ];

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Popular Courses
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((c, i) => (
          <CourseCard key={i} {...c} />
        ))}
      </div>
    </section>
  );
}