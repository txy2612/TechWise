import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in failed:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="text-center">
          <div className="skeleton w-16 h-16 rounded-full mx-auto mb-4"></div>
          <p className="text-senior-base text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 p-4">
      <div className="card max-w-md w-full text-center">
        {/* App Logo/Icon */}
        <div className="mb-8">
          <div className="text-7xl mb-4">📚</div>
          <h1 className="text-senior-2xl font-bold text-gray-900 mb-2">
            Digital Skills Learning
          </h1>
          <p className="text-senior-base text-gray-600">
            Master Gmail, Google Maps, and essential digital tools at your own pace
          </p>
        </div>

        {/* Features */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
          <h2 className="text-senior-lg font-bold text-gray-900 mb-4">
            What you'll learn:
          </h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-2xl mr-3">📧</span>
              <div>
                <p className="text-senior-base font-semibold text-gray-900">Gmail Basics</p>
                <p className="text-senior-sm text-gray-600">Send and manage emails</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">🗺️</span>
              <div>
                <p className="text-senior-base font-semibold text-gray-900">Google Maps</p>
                <p className="text-senior-sm text-gray-600">Navigate and find places</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">🛡️</span>
              <div>
                <p className="text-senior-base font-semibold text-gray-900">Online Safety</p>
                <p className="text-senior-sm text-gray-600">Stay safe online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="btn-primary w-full flex items-center justify-center gap-3"
        >
          <Mail className="w-6 h-6" />
          Sign in with Google
        </button>

        <p className="text-senior-sm text-gray-500 mt-6">
          By signing in, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
