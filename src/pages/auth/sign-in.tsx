import { useState } from "react";
import { signIn } from "@/lib/api/auth/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const data = await signIn(email, password);
      localStorage.setItem("authToken", data.result.token);

      window.location.href = "/dashboard/home";
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred."); // Fallback for unknown types
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Sign In</h1>
          <p color="blue-gray" className="text-lg font-normal">
            Enter your email and password to Sign In.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">
            <label
              htmlFor="email"
              color="blue-gray"
              className="z-10 font-medium"
            >
              Your email
            </label>
            <input
              id="email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-3 border border-gray-300 rounded-md"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="password"
              color="blue-gray"
              className="z-10 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="*******"
              value={password}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 p-3 border border-gray-300 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-center text-white mt-4 rounded-xl w-full p-3"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-screen w-full object-fit rounded-3xl"
        />
      </div>
    </section>
  );
};

export default SignIn;
