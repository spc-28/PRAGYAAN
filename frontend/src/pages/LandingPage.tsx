import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, Cpu, DollarSign, FlaskConical, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useEffect } from "react";

const categories = [
  {
    title: "Artificial Intelligence",
    subtitle: "The Future is Now",
    description: "Explore breakthroughs in machine learning, neural networks, and the AI revolution reshaping our world.",
    icon: <Sparkles className="w-5 h-5" />,
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    tag: "AI",
    articles: 128,
    span: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Technology",
    subtitle: "Innovation & Beyond",
    description: "From quantum computing to space tech — dive into the innovations defining tomorrow.",
    icon: <Cpu className="w-5 h-5" />,
    gradient: "from-cyan-600 via-blue-600 to-blue-800",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    tag: "TECH",
    articles: 256,
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Finance",
    subtitle: "Markets & Money",
    description: "Crypto, markets, and fintech insights for the modern investor.",
    icon: <DollarSign className="w-5 h-5" />,
    gradient: "from-emerald-600 via-green-600 to-teal-700",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    tag: "FINANCE",
    articles: 94,
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Science",
    subtitle: "Discover & Learn",
    description: "Unravel the mysteries of the universe — from quantum physics to biotech breakthroughs.",
    icon: <FlaskConical className="w-5 h-5" />,
    gradient: "from-orange-500 via-amber-600 to-yellow-600",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
    tag: "SCIENCE",
    articles: 73,
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Trending Now",
    subtitle: "What's Hot",
    description: "The most-read stories this week across all categories.",
    icon: <TrendingUp className="w-5 h-5" />,
    gradient: "from-rose-600 via-pink-600 to-fuchsia-700",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&q=80",
    tag: "TRENDING",
    articles: 42,
    span: "md:col-span-1 md:row-span-1",
  },
];

const featuredPosts = [
  {
    title: "GPT-5 and the Race to AGI: What We Know So Far",
    category: "AI",
    readTime: "8 min",
    author: "Sarah Chen",
  },
  {
    title: "Why Rust is Replacing C++ in Systems Programming",
    category: "TECH",
    readTime: "6 min",
    author: "Alex Rivera",
  },
  {
    title: "The Bitcoin Halving Effect on Global Markets",
    category: "FINANCE",
    readTime: "5 min",
    author: "James Morton",
  },
];

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-[0.86rem] flex items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl md:text-3xl font-robotoCondensed font-bold tracking-tight text-stone-900">
              PRAGYAAN
            </h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-space text-sm text-stone-500">
            <a href="#explore" className="hover:text-stone-900 transition-colors">Explore</a>
            <a href="#featured" className="hover:text-stone-900 transition-colors">Featured</a>
            <a href="#categories" className="hover:text-stone-900 transition-colors">Categories</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/signin">
              <button className="text-sm font-space text-stone-500 hover:text-stone-900 transition-colors px-4 py-2">
                Sign in
              </button>
            </Link>
            <Link to="/signup">
              <button className="text-sm font-space bg-stone-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-stone-800 transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section — video background */}
      <section className="w-full relative overflow-hidden text-white">
        {/* Video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero-bg.mp4"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36 flex h-screen flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Left content */}
          <div className="flex-1 pb-20 max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-playfair font-semibold leading-[1.08] tracking-tight">
              Stories that
              <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-violet-300">
                inspire
              </span>{" "}
              thinking.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-zinc-400 font-space leading-relaxed max-w-xl">
              Curated insights on AI, technology, finance, and science — written by
              thinkers, for thinkers.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/blogs">
                <button className="group flex items-center gap-2 bg-white text-zinc-900 px-7 py-3.5 rounded-full font-space font-medium text-sm hover:bg-zinc-100 transition-all">
                  Start Reading
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="#explore">
                <button className="flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-full font-space font-medium text-sm hover:bg-white/10 transition-all">
                  Explore Topics
                </button>
              </a>
            </div>
          </div>

          {/* Right — decorative mini bento preview
          <div className="hidden md:grid grid-cols-2 gap-3 flex-1 max-w-md">
            {[
              { label: "AI", color: "from-violet-500 to-purple-700", img: categories[0].image },
              { label: "Tech", color: "from-cyan-500 to-blue-700", img: categories[1].image },
              { label: "Finance", color: "from-emerald-500 to-teal-700", img: categories[2].image },
              { label: "Science", color: "from-orange-400 to-amber-600", img: categories[3].image },
            ].map((item) => (
              <div key={item.label} className="relative rounded-2xl overflow-hidden aspect-square group">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-60 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-sm font-space font-medium text-white/90">{item.label}</span>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Bento Grid */}
      <section id="explore" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-space uppercase tracking-[0.2em] text-stone-400 mb-2">
              Browse by topic
            </p>
            <h3 className="text-3xl md:text-4xl font-playfair font-semibold text-stone-900">
              Explore Categories
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
          {categories.map((cat) => (
            <Link
              to="/blogs"
              key={cat.tag}
              className={`${cat.span} group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-70 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-space font-medium uppercase tracking-wider text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
                    {cat.icon}
                    {cat.tag}
                  </span>
                  <span className="text-xs font-space text-white/50">
                    {cat.articles} articles
                  </span>
                </div>

                <div>
                  <p className="text-sm font-space text-white/60 mb-1">{cat.subtitle}</p>
                  <h4 className="text-2xl md:text-3xl font-playfair font-semibold leading-tight mb-2">
                    {cat.title}
                  </h4>
                  <p className="text-sm font-space text-white/60 leading-relaxed max-w-md line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-space text-white/80 group-hover:text-white transition-colors">
                    Read articles
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Explore More Card */}
          <Link
            to="/blogs"
            className="md:col-span-1 md:row-span-1 group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all"
          >
            <div className="absolute inset-0 opacity-[0.07]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full blur-[80px]" />
            </div>
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-stone-500" />
              </div>
              <h4 className="text-2xl font-playfair font-semibold text-stone-900 mb-2">
                Explore All
              </h4>
              <p className="text-sm font-space text-stone-400 mb-6">
                Discover 500+ articles across every topic
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-space text-white bg-stone-900 px-5 py-2.5 rounded-full group-hover:bg-stone-800 transition-colors">
                Browse All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section id="featured" className="bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-space uppercase tracking-[0.2em] text-stone-400 mb-2">
                Editor's picks
              </p>
              <h3 className="text-3xl md:text-4xl font-playfair font-semibold text-stone-900">
                Featured Stories
              </h3>
            </div>
            <Link
              to="/blogs"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-space text-stone-500 hover:text-stone-900 transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredPosts.map((post, i) => (
              <Link
                to="/blogs"
                key={i}
                className="group p-6 rounded-2xl bg-stone-50 border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all"
              >
                <span className="inline-block text-xs font-space font-semibold uppercase tracking-wider text-stone-400 mb-4">
                  {post.category}
                </span>
                <h4 className="text-lg font-playfair font-semibold leading-snug mb-4 text-stone-800 group-hover:text-stone-950 transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center justify-between text-xs font-space text-stone-400">
                  <span>{post.author}</span>
                  <span>{post.readTime} read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 p-12 md:p-20 text-center text-white">
          <div className="absolute inset-0 opacity-15">
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500 rounded-full blur-[120px]"
              animate={{
                x: [0, 30, -20, 15, 0],
                y: [0, -20, 15, 25, 0],
                scale: [1, 1.05, 0.95, 1.02, 1],
              }}
              transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[120px]"
              animate={{
                x: [0, -25, 20, -15, 0],
                y: [0, 20, -15, -25, 0],
                scale: [1, 0.97, 1.04, 1, 1],
              }}
              transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
          <div className="relative">
            <h3 className="text-3xl md:text-5xl font-playfair font-semibold mb-4">
              Ready to start reading?
            </h3>
            <p className="text-stone-400 font-space text-lg max-w-lg mx-auto mb-8">
              Join thousands of curious minds exploring ideas that matter.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <button className="group flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-full font-space font-medium hover:bg-stone-100 transition-all">
                  Create Free Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/blogs">
                <button className="border border-white/20 text-white px-8 py-4 rounded-full font-space font-medium hover:bg-white/10 transition-all">
                  Browse Without Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-robotoCondensed font-bold text-lg text-stone-900">PRAGYAAN</p>
          <p className="text-xs font-space text-stone-400">
            Curated content for curious minds.
          </p>
        </div>
      </footer>
    </div>
  );
}
