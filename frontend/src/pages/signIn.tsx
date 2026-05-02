import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SigninInput } from "@spc-28/pragyaan-common";
import { ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { motion } from "motion/react";
import { ArrowRight, Mail, Lock, ArrowLeft } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const toastOptions: ToastOptions = { position: "bottom-right" };
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });

  async function sendRequest() {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInputs
      );
      localStorage.setItem("token", res.data);
      navigate("/blogs");
    } catch {
      toast.error("Invalid Credentials!", toastOptions);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Left — Form */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-space text-stone-400 hover:text-stone-600 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-stone-900 mb-2">
            Welcome back
          </h1>
          <p className="font-space text-stone-400 mb-10">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-stone-900 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-space font-medium text-stone-600 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={postInputs.email}
                  onChange={(e) =>
                    setPostInputs((c) => ({ ...c, email: e.target.value }))
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 bg-white font-space text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-space font-medium text-stone-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={postInputs.password}
                  onChange={(e) =>
                    setPostInputs((c) => ({ ...c, password: e.target.value }))
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 bg-white font-space text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition-all"
                />
              </div>
            </div>

            <button
              onClick={sendRequest}
              disabled={loading}
              className="w-full group flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl font-space font-medium text-sm hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-stone-100 border border-stone-200">
            <p className="text-xs font-space font-medium text-stone-500 mb-1">
              Test Account
            </p>
            <p className="text-xs font-space text-stone-400">
              Email: user2@domain.com
            </p>
            <p className="text-xs font-space text-stone-400">
              Password: 1234567890
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right — Decorative panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-1/4 left-1/4 w-80 h-80 bg-violet-500 rounded-full blur-[120px]"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500 rounded-full blur-[120px]"
            animate={{
              x: [0, -25, 20, 0],
              y: [0, 20, -15, 0],
              scale: [1, 0.95, 1.1, 1],
            }}
            transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
          />
        </div>

        <div className="relative flex flex-col justify-end p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <blockquote className="text-2xl md:text-3xl font-playfair font-semibold text-white leading-snug mb-6">
              "Reading is to the mind what exercise is to the body."
            </blockquote>
            <div>
              <p className="font-space font-medium text-white/80">
                Joseph Addison
              </p>
              <p className="font-space text-sm text-white/40">
                Essayist & Poet
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
