import Link from "next/link";

import { login } from "@/actions/auth";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-2 text-slate-500">
          Login to continue your journey.
        </p>
      </div>

      <form
        action={login}
        className="space-y-5"
      >

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            required
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            required
            className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-blue-600 font-medium text-white transition hover:bg-blue-700"
        >
          Login
        </button>

      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}

        <Link
          href="/signup"
          className="font-medium text-blue-600"
        >
          Sign up
        </Link>
      </p>

    </div>
  );
}