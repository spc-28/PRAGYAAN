import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignupInput } from "@spc-28/pragyaan-common";
import { ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { motion } from "motion/react";
import { ArrowRight, Mail, Lock, User, ArrowLeft } from "lucide-react";

export function SignUp() {
  const navigate = useNavigate();
  const toastOptions: ToastOptions = { position: "bottom-right" };
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<SignupInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInputs
      );
      localStorage.setItem("token", res.data);
      navigate("/blogs");
    } catch {
      toast.error("Something went wrong!", toastOptions);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Left — Decorative panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-500 rounded-full blur-[120px]"
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 20, -25, 0],
              scale: [1, 1.08, 0.95, 1],
            }}
            transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-rose-500 rounded-full blur-[120px]"
            animate={{
              x: [0, 25, -20, 0],
              y: [0, -20, 15, 0],
              scale: [1, 0.95, 1.08, 1],
            }}
            transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
          />
        </div>

        <div className="relative flex flex-col justify-end p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <blockquote className="text-2xl md:text-3xl font-playfair font-semibold text-white leading-snug mb-6">
              "A reader lives a thousand lives before he dies. The man who never
              reads lives only one."
            </blockquote>
            <div>
              <p className="font-space font-medium text-white/80">
                George R.R. Martin
              </p>
              <p className="font-space text-sm text-white/40">Author</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right — Form */}
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
            Create an account
          </h1>
          <p className="font-space text-stone-400 mb-10">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-stone-900 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-space font-medium text-stone-600 mb-1.5">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="John"
                    value={postInputs.firstName}
                    onChange={(e) =>
                      setPostInputs((c) => ({
                        ...c,
                        firstName: e.target.value,
                      }))
                    }
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 bg-white font-space text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-space font-medium text-stone-600 mb-1.5">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Doe"
                    value={postInputs.lastName}
                    onChange={(e) =>
                      setPostInputs((c) => ({
                        ...c,
                        lastName: e.target.value,
                      }))
                    }
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 bg-white font-space text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 transition-all"
                  />
                </div>
              </div>
            </div>

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
                  placeholder="Create a password"
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
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>

          <p className="mt-6 text-xs font-space text-stone-400 text-center">
            By creating an account, you agree to our Terms and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
