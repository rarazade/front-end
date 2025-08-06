import { useState } from "react";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    console.log("Email subscribed:", email);

    setIsSuccess(true);
    setEmail("");

    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section className="bg-[#292F36] py-16 px-6 text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-[#4ECDC4] mb-4">
          Let’s Subscribe!
        </h2>
        <p className="text-base text-white mb-6">
          To keep up to date with all our new releases, news, and nothing else,
          sign up to our newsletter. See our{" "}
          <a href="#" className="underline hover:text-orange-300">
            Privacy Policy
          </a>
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mt-4"
        >
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 w-full sm:w-80 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <button
            type="submit"
            className="bg-[#4ECDC4] text-[#292F36] font-bold px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition"
          >
            SUBSCRIBE
          </button>
        </form>

        {/* Pesan berhasil */}
        {isSuccess && (
          <p className="mt-4 text-green-400 font-semibold">
            Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
}
