import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          Chat with your <span className="text-blue-600">PDF documents</span>
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto mb-8">
          Upload your PDF files and ask questions in natural language.
          Get fast, accurate answers powered by AI — no manual searching.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/upload"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Upload Your First PDF
          </Link>

          <Link
            to="/chat"
            className="px-6 py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-50"
          >
            Try the Chat
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FeatureCard
          title="Upload Any PDF"
          text="Simply drag and drop your PDF files to get started instantly."
        />
        <FeatureCard
          title="Natural Conversations"
          text="Ask questions in plain English and get contextual answers."
        />
        <FeatureCard
          title="Fast & Accurate"
          text="Powered by embeddings and LLMs for precise results."
        />
        <FeatureCard
          title="Private & Secure"
          text="Your documents stay local and are never shared."
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="bg-white border rounded-xl p-6 text-center">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
}
