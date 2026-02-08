import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card } from "@components/ui/Card";
import { 
  Palette, 
  Moon, 
  Sun, 
  Monitor,
  Bell,
  Globe,
  Shield,
  Save,
  CreditCard,
  Users,
  ArrowRight,
  Check
} from "lucide-react";
import { PrimaryButton } from "@components/Buttons";
import { setMode, setThemePair, type ThemePair } from "@reduxStore/theme/themeSlice";
import { setLocale } from "@reduxStore/locale/localeSlice";
import type { RootState } from "@types";
import { usePermissions } from "@hooks/usePermissions";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/i18n";

const themeOptions: { value: ThemePair; label: string; color: string }[] = [
  { value: "corporate", label: "Corporate", color: "bg-blue-600" },
  { value: "purple", label: "Purple", color: "bg-purple-600" },
  { value: "green", label: "Green", color: "bg-green-600" },
  { value: "blue", label: "Blue", color: "bg-blue-700" },
];

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { i18n, t } = useTranslation();
  const { mode, pair } = useSelector((state: RootState) => state.theme);
  const locale = useSelector((state: RootState) => state.locale);
  const { hasPermission } = usePermissions();

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    const languageConfig = SUPPORTED_LANGUAGES.find(l => l.code === newLang);
    if (!languageConfig) return;

    const newRegion = languageConfig.region;

    // Update i18n language
    i18n.changeLanguage(newLang);

    // Update Redux store
    dispatch(setLocale({ language: newLang, region: newRegion }));

    // Update URL if language prefix is present
    if (lang && ['en', 'es'].includes(lang)) {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(`/${lang}/`, `/${newLang}/`);
      navigate(newPath, { replace: true });
    }
  };

  const handleModeChange = (newMode: 'light' | 'dark') => {
    dispatch(setMode(newMode));
  };

  const handleThemeChange = (newTheme: ThemePair) => {
    dispatch(setThemePair(newTheme));
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Customize your experience and preferences
        </p>
      </div>

      {/* Appearance Section */}
      <Card title="Appearance" icon={<Palette className="w-5 h-5" />}>
        <div className="space-y-6">
          {/* Theme Mode */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Color Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleModeChange('light')}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  mode === 'light'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Sun className="w-6 h-6 text-yellow-500" />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button
                onClick={() => handleModeChange('dark')}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  mode === 'dark'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Moon className="w-6 h-6 text-blue-400" />
                <span className="text-sm font-medium">Dark</span>
              </button>
              <button
                onClick={() => handleModeChange(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  mode === (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Monitor className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm font-medium">System</span>
              </button>
            </div>
          </div>

          {/* Theme Color */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Theme Color
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {themeOptions.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => handleThemeChange(theme.value)}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                    pair === theme.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full ${theme.color}`} />
                  <span className="text-sm font-medium">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications Section */}
      <Card title="Notifications" icon={<Bell className="w-5 h-5" />}>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-3 bg-background rounded-lg cursor-pointer">
            <div>
              <p className="font-medium text-sm">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Receive updates via email</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border" />
          </label>
          <label className="flex items-center justify-between p-3 bg-background rounded-lg cursor-pointer">
            <div>
              <p className="font-medium text-sm">Push Notifications</p>
              <p className="text-xs text-muted-foreground">Receive browser notifications</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-border" />
          </label>
          <label className="flex items-center justify-between p-3 bg-background rounded-lg cursor-pointer">
            <div>
              <p className="font-medium text-sm">Appointment Reminders</p>
              <p className="text-xs text-muted-foreground">Get notified before appointments</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border" />
          </label>
        </div>
      </Card>

      {/* Language Section */}
      <Card title="Language & Region" icon={<Globe className="w-5 h-5" />}>
        <div className="space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Language
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUPPORTED_LANGUAGES.map(({ code, label }) => {
                const isSelected = i18n.language === code;
                return (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code as SupportedLanguage)}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="text-sm font-medium">{label}</span>
                    {isSelected && <Check className="w-5 h-5 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Locale Info */}
          <div className="p-4 bg-background rounded-lg border border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">Current Settings</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Language:</span>
                <span className="ml-2 font-medium">{locale.language.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Region:</span>
                <span className="ml-2 font-medium">{locale.region}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Locale:</span>
                <span className="ml-2 font-medium">{locale.fullLocale}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Currency:</span>
                <span className="ml-2 font-medium">{locale.currency}</span>
              </div>
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Timezone
            </label>
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
              <span className="text-sm">{locale.timezone}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Timezone is automatically set based on your selected region
            </p>
          </div>
        </div>
      </Card>

      {/* Security Section */}
      <Card title="Security" icon={<Shield className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <p className="font-medium text-sm">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
            </div>
            <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-secondary transition-colors">
              Enable
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <p className="font-medium text-sm">Change Password</p>
              <p className="text-xs text-muted-foreground">Update your password regularly</p>
            </div>
            <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-secondary transition-colors">
              Change
            </button>
          </div>
        </div>
      </Card>

      {/* Admin Section - Only visible to users with admin permissions */}
      {(hasPermission('billing:manage') || hasPermission('admin:permissions')) && (
        <Card title="Administration" icon={<Shield className="w-5 h-5" />}>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Access administrative features and system management tools.
            </p>
            {hasPermission('billing:manage') && (
              <Link
                to={`/${lang}/admin/billing`}
                className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CreditCard className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Billing & Subscription</p>
                    <p className="text-xs text-muted-foreground">Manage plans, payments, and invoices</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            )}
            {hasPermission('admin:permissions') && (
              <Link
                to={`/${lang}/admin/permissions`}
                className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Permissions Management</p>
                    <p className="text-xs text-muted-foreground">Manage user roles and access control</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            )}
          </div>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <PrimaryButton className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </PrimaryButton>
      </div>
    </div>
  );
}
