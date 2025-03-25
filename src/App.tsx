
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronRight, Share2, Users } from 'lucide-react'

interface WaitlistEntry {
  email: string
  referralCode: string
  referralCount: number
}

export default function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [waitlistEntry, setWaitlistEntry] = useState<WaitlistEntry | null>(null)
  const [waitlistCount] = useState(1337) // Simulated count
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const referralCode = Math.random().toString(36).substring(7)
    setWaitlistEntry({
      email,
      referralCode,
      referralCount: 0
    })
    setSubmitted(true)
  }

  const copyReferralLink = () => {
    if (!waitlistEntry) return
    navigator.clipboard.writeText(
      `${window.location.origin}?ref=${waitlistEntry.referralCode}`
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-8">
              <span className="gradient-text">The Next Big Thing</span>
              <br /> is Coming Soon
            </h1>
            
            <div className="animate-float mb-12">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                alt="Product Preview"
                className="rounded-2xl shadow-2xl mx-auto"
              />
            </div>

            <div className="max-w-xl mx-auto mb-8">
              <p className="text-xl text-muted-foreground mb-8">
                Join the waitlist to get early access and exclusive benefits.
                The sooner you join, the higher your position!
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-lg">{waitlistCount.toLocaleString()} joined</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 rounded-lg bg-muted px-4 py-3 text-foreground"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Join Now
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">You're In!</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Your position: #{waitlistCount}
              </p>
            </div>

            <div className="max-w-md mx-auto bg-muted rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Share & Move Up</h3>
              <p className="text-muted-foreground mb-4">
                Share your referral link and move up the waitlist! Each referral moves you up 5 spots.
              </p>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={`${window.location.origin}?ref=${waitlistEntry?.referralCode}`}
                  readOnly
                  className="flex-1 bg-background rounded-lg px-4 py-2"
                />
                <button
                  onClick={copyReferralLink}
                  className="bg-accent hover:bg-accent/80 text-accent-foreground px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Copy
                </button>
              </div>

              <div className="flex justify-center gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    "I just joined the waitlist for the next big thing! Join me using my referral link:"
                  )}&url=${encodeURIComponent(
                    `${window.location.origin}?ref=${waitlistEntry?.referralCode}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1DA1F2] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Share on Twitter
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}