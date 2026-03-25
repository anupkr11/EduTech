export default function Analysis() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">EdTech Analysis</h1>

      <div className="bg-white shadow p-6 rounded-xl space-y-4">
        <p><b>Company:</b> Coursera</p>
        <p><b>Website:</b> https://coursera.org</p>
        <p><b>Description:</b> Online learning platform</p>
        <p><b>Target:</b> Students & professionals</p>

        <h2 className="text-xl font-semibold">UI/UX</h2>
        <ul className="list-disc ml-6">
          <li>Clean layout</li>
          <li>Responsive design</li>
        </ul>

        <h2 className="text-xl font-semibold">Improvements</h2>
        <ul className="list-disc ml-6">
          <li>Improve mobile UI</li>
        </ul>
      </div>
    </div>
  );
}