import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import background from "../../assets/bg2.jpg";

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
    <section
      className="relative text-white flex justify-center items-center"
    >
      <motion.div
      className="bg-[#292F36]/70 p-20 rounded-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >

        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
          className="text-4xl font-extrabold text-[#4ECDC4]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          Let’s Subscribe!
        </motion.h2>


          <motion.p
            className="text-lg text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            Stay up to date with our latest releases, news, and nothing else.
            Sign up for our newsletter and never miss an update. See our{" "}
            <a href="#" className="underline hover:text-orange-300">
              Privacy Policy
            </a>.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 w-full sm:w-80 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
              required
              whileFocus={{ scale: 1.02 }}
              
            />
            <motion.button
              type="submit"
              className="bg-[#4ECDC4] text-[#1F1F1F] font-bold px-6 py-3 rounded-lg shadow hover:bg-[#3fb3aa] transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SUBSCRIBE
            </motion.button>
          </motion.form>

          <AnimatePresence>
            {isSuccess && (
              <motion.p
                className="mt-6 text-green-400 font-semibold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                ✅ Thank you for subscribing!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
