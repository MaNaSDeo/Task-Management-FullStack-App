"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, register } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(name, email, password);
      router.push("/dashboard");
      toast.success("Registration Successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(
            `Registration failed: ${
              error.response.data.error || "An error occurred."
            }`
          );
        } else {
          toast.error(
            "Registration failed: Network error. Please try again later."
          );
        }
      } else {
        toast.error("Registration failed: An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !name || !email || !password || loading;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#FFFFFF_0%,_#AFA3FF_100%)] flex items-center justify-center">
      <div className="bg-white p-16 rounded-lg shadow-md w-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Welcome to <span className="text-[#4534AC]">Workflo</span>!
        </h2>
        <Input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showToggle={true}
        />
        <Button
          text="Sign up"
          onClick={handleRegister}
          loading={loading}
          disabled={isButtonDisabled}
        />
        <p className="mt-6 text-center text-md text-[#606060]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0054A1] hover:underline">
            Log in
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
