import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SEOHead } from "@/components/ui/seo-head";
import { useAuth } from "@/hooks/use-auth";
import { Lock, User, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error: loginError } = await login(email, password);

    if (loginError) {
      setError(loginError.message || 'Invalid credentials. Please try again.');
    } else {
      setLocation('/admin/dashboard');
    }
  };

  return (
    <>
      <SEOHead
        title="Admin Login - Accord Manpower"
        description="Administrative access for Accord Manpower management panel"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <img 
              src="/attached_assets/Accordmp logo1_1749835050687.png" 
              alt="Accord Manpower" 
              className="w-16 h-16 mx-auto mb-4 object-contain"
            />
            <h1 className="text-3xl font-bold text-white mb-2">Accord Manpower</h1>
            <p className="text-gray-200">Administrative Access</p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Demo credentials: admin / admin123
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-gray-300 text-sm">
              © 2024 Accord Manpower. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}