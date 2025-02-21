export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700">Strona nie znaleziona</h2>
        <p className="text-gray-500">Przepraszamy, nie mogliśmy znaleźć strony, której szukasz.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 text-base font-medium text-white bg-[#09403A] hover:bg-[#09403A]/90 rounded-md shadow-sm transition-colors"
        >
          Wróć do strony głównej
        </a>
      </div>
    </div>
  );
}
