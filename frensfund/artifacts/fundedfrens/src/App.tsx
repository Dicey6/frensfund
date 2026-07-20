import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, Redirect } from 'wouter';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

import Login from '@/pages/login';
import Signup from '@/pages/signup';
import ForgotPassword from '@/pages/forgot-password';
import ResetPassword from '@/pages/reset-password';
import Dashboard from '@/pages/dashboard';
import ProfilePage from '@/pages/profile';
import ChallengePage from '@/pages/challenge';
import PaymentPage from '@/pages/payment';
import HomePage from '@/pages/home';
import { Loader2 } from 'lucide-react';

const queryClient = new QueryClient();

function RootRoute() {
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  return session ? <Redirect to="/dashboard" /> : <HomePage />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={RootRoute} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/profile">
        <ProtectedRoute component={ProfilePage} />
      </Route>
      <Route path="/challenge">
        <ProtectedRoute component={ChallengePage} />
      </Route>
      <Route path="/payment/:orderId">
        <ProtectedRoute component={PaymentPage} />
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster theme="dark" position="top-right" />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
