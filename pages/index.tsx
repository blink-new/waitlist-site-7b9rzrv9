
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Sparkles, Share2, Users } from 'lucide-react';
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState(0);
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setPosition(Math.floor(Math.random() * 100) + 400);
    setReferralCode(`BLINK${Math.random().toString(36).substr(2, 8).toUpperCase()}`);
    setSubmitted(true);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://blink.ai?ref=${referralCode}`);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-white">
      <Head>
        <title>Join Blink Waitlist - AI Full Stack Engineer</title>
        <meta name="description" content="Join the waitlist for Blink - The world's #1 AI fullstack engineer. Build beautiful and functional apps faster than ever." />
      </Head>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="mb-8"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary-dark" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-dark to-secondary-dark text-transparent bg-clip-text">
            Meet Blink
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
            The world's #1 AI fullstack engineer that builds beautiful and functional apps.
          </p>

          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-dark outline-none"
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-primary-dark text-white font-medium hover:opacity-90 transition-opacity"
              >
                Join the Waitlist
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <div className="text-center">
                <p className="text-2xl font-bold mb-2">You're in! 🎉</p>
                <p className="text-gray-600 dark:text-gray-300">Position #{position}</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Share your referral link to move up the list:</p>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <code className="flex-1 text-sm">{`blink.ai?ref=${referralCode}`}</code>
                  <button
                    onClick={copyReferralLink}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=Join%20me%20on%20the%20waitlist%20for%20Blink%20-%20The%20AI%20that%20builds%20beautiful%20apps!%20%23BlinkAI%0A%0Ablink.ai?ref=${referralCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </a>
                <button
                  onClick={copyReferralLink}
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <Code className="w-4 h-4" />
                  Copy Link
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-24 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6">
            <Code className="w-8 h-8 mx-auto mb-4 text-primary-dark" />
            <h3 className="text-xl font-semibold mb-2">Beautiful Code</h3>
            <p className="text-gray-600 dark:text-gray-400">Write clean, maintainable code that follows best practices</p>
          </div>
          <div className="text-center p-6">
            <Sparkles className="w-8 h-8 mx-auto mb-4 text-primary-dark" />
            <h3 className="text-xl font-semibold mb-2">Stunning UI</h3>
            <p className="text-gray-600 dark:text-gray-400">Create beautiful interfaces with perfect animations</p>
          </div>
          <div className="text-center p-6">
            <Users className="w-8 h-8 mx-auto mb-4 text-primary-dark" />
            <h3 className="text-xl font-semibold mb-2">Full Stack</h3>
            <p className="text-gray-600 dark:text-gray-400">Handle everything from frontend to backend seamlessly</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}