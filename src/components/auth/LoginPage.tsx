import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Mail, Loader2 } from "lucide-react";
import GoogleAuthButton from "./GoogleAuthButton";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  onLogin?: () => void;
  isLoading?: boolean;
}

const LoginPage = ({
  onLogin = () => {},
  isLoading: externalLoading = false,
}: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(externalLoading);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
      navigate("/");
    }, 1500);
  };

  const handleGoogleSuccess = (response: any) => {
    console.log("Google login successful", response);
    onLogin();
    navigate("/");
  };

  const handleGoogleFailure = (error: Error) => {
    console.error("Google login failed", error);
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-white"
              >
                <path d="M23 7 L21 7 L21 9" />
                <path d="M21 7 L17 11" />
                <path d="M1 17 L3 17 L3 15" />
                <path d="M3 17 L7 13" />
                <rect x="7" y="7" width="10" height="10" rx="1" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Google Meet Recorder
          </CardTitle>
          <p className="text-gray-500 mt-2">
            Record meetings and track attendance with ease
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <GoogleAuthButton
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              isLoading={isLoading}
            />
            <p className="text-center text-sm text-gray-500 mt-4">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
      <p className="mt-8 text-center text-xs text-gray-500">
        By signing in, you agree to our{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
