import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Globe, Type, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const { signOut } = useAuth();
  const { progress, updateProgress } = useProgress();

  const handleLanguageChange = async (lang: 'en' | 'zh') => {
    await i18n.changeLanguage(lang);
    await updateProgress({
      preferences: { ...progress.preferences, language: lang },
    });
  };

  const handleFontSizeChange = async (size: 'normal' | 'large' | 'extra-large') => {
    await updateProgress({
      preferences: { ...progress.preferences, fontSize: size },
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-senior-base text-primary hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
          Back
        </button>

        {/* Header */}
        <div className="card mb-6">
          <h1 className="text-senior-2xl font-bold text-gray-900 mb-2">
            {t('settings')}
          </h1>
          <p className="text-senior-base text-gray-600">
            Customize your learning experience
          </p>
        </div>

        {/* Language Settings */}
        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-primary" />
            <h2 className="text-senior-xl font-bold text-gray-900">
              {t('language')}
            </h2>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                i18n.language === 'en'
                  ? 'border-primary bg-primary-50'
                  : 'border-gray-300 bg-white hover:border-primary-300'
              }`}
            >
              <span className="text-senior-base font-semibold">
                {t('english')}
              </span>
            </button>
            <button
              onClick={() => handleLanguageChange('zh')}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                i18n.language === 'zh'
                  ? 'border-primary bg-primary-50'
                  : 'border-gray-300 bg-white hover:border-primary-300'
              }`}
            >
              <span className="text-senior-base font-semibold">
                {t('chinese')}
              </span>
            </button>
          </div>
        </div>

        {/* Font Size Settings */}
        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Type className="w-8 h-8 text-primary" />
            <h2 className="text-senior-xl font-bold text-gray-900">
              {t('fontSize')}
            </h2>
          </div>

          <div className="space-y-3">
            {(['normal', 'large', 'extra-large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => handleFontSizeChange(size)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  progress.preferences.fontSize === size
                    ? 'border-primary bg-primary-50'
                    : 'border-gray-300 bg-white hover:border-primary-300'
                }`}
              >
                <span
                  className={`font-semibold ${
                    size === 'normal'
                      ? 'text-base'
                      : size === 'large'
                      ? 'text-lg'
                      : 'text-xl'
                  }`}
                >
                  {t(size)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className="card">
          <h2 className="text-senior-xl font-bold text-gray-900 mb-4">
            Account
          </h2>
          <button
            onClick={handleSignOut}
            className="w-full p-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl flex items-center justify-center gap-3 transition-colors"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-senior-base font-semibold">
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
