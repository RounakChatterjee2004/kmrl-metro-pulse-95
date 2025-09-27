import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Train, Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import kmrlLogo from '@/assets/kmrl-logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rounded-full" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-white/20 rounded-full" />
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-white/20 rounded-full" />
      </div>

      <Card className="w-full max-w-md shadow-large relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <img src={kmrlLogo} alt="DocuMind AI" className="h-12 w-12" />
            <Train className="h-8 w-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-primary">
              DocuMind AI
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Advanced AI Document Processing
            </p>
            <p className="text-xs text-muted-foreground">
              Document Processing & Management Portal
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.name@documind.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full hero-gradient text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>Demo Credentials:</p>
            <p className="text-xs">Email: any@documind.ai</p>
            <p className="text-xs">Password: any password</p>
          </div>

          <div className="text-center">
            <a
              href="#"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </a>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>© 2024 DocuMind AI</p>
            <p>Secure Document Processing System</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}