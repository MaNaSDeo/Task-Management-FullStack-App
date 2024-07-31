'use client'
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
      toast.success('Login Successful!');
    } catch (error) {
      console.error('Login failed:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(`Login failed: ${error.response.data.error || 'An error occurred.'}`);
        } else {
          toast.error('Login failed: Network error. Please try again later.');
        }
      } else {
        toast.error('Login failed: An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !email || !password || loading;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#FFFFFF_0%,_#AFA3FF_100%)] flex items-center justify-center">
      <div className="bg-white p-16 rounded-lg shadow-md w-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Welcome to <span className="text-[#4534AC]">Workflo</span>!</h2>
        <Input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} showToggle={true} />
        <Button text="Login" onClick={handleLogin} loading={loading} disabled={isButtonDisabled} />
        <p className="mt-6 text-center text-md text-[#606060]">
        Don&apos;t have an account? <Link href="/register" className="text-[#0054A1] hover:underline">Create a new account</Link>.
        </p>
      </div>
    </div>
  );
};