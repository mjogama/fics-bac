import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../api/axios";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { baseURL, paths } from "../../constants/paths";

function LoginField({ id, label, type = "text", value, onChange, autoComplete, trailing }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-wide text-cms-labelfaint">{label}</span>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          required
          className="w-full rounded-cmsinput border border-cms-inputborder bg-cms-inputbg px-3 py-2.5 text-sm text-cms-body placeholder:text-cms-placeholder outline-none transition-colors focus:border-cms-inputborder focus:bg-cms-surface"
        />
        {trailing}
      </div>
    </label>
  );
}

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const route = useNavigate();
  const setField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`${baseURL}/auth/login`, data);

      route(paths.adminDashboard);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cms-bg px-6 py-12">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cms-ink font-display text-xl font-bold text-white">F</div>
          <h1 className="mt-2 font-display text-2xl font-bold text-cms-ink">Welcome back</h1>
          <p className="mt-2 text-sm text-cms-secondary">Enter your email and password to access the CMS.</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <LoginField id="email" label="Email" type="email" value={data.email} onChange={(value) => setField("email", value)} autoComplete="email" />

            <LoginField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(value) => setField("password", value)}
              autoComplete="current-password"
              trailing={
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-cms-muted transition-colors hover:text-cms-ink">
                  {showPassword ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                </button>
              }
            />

            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-cms-secondary">
                <input type="checkbox" className="h-4 w-4 rounded border-cms-inputborder accent-cms-ink" />
                Remember me
              </label>
              <a href="#" className="text-sm text-cms-muted transition-colors hover:text-cms-ink" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            <Button type="submit" variant="primary" size="lg" className="mt-2 w-full">
              Log in
            </Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm text-cms-muted">
          <Link to={paths.home} className="text-cms-secondary transition-colors hover:text-cms-ink">
            ← Back to public site
          </Link>
        </p>
      </div>
    </div>
  );
}
