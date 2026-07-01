"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api/authAPI/auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

const inputClassName =
  "h-auto rounded-cmsinput border-cms-inputborder bg-cms-inputbg px-3 py-2.5 text-sm text-cms-body placeholder:text-cms-placeholder focus-visible:border-cms-inputborder focus-visible:bg-cms-surface focus-visible:ring-0";

export default function AuthLogin() {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const setField = (field: "email" | "password", value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(data);
      router.push("/cms/dashboard");
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
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

        <Card className="rounded-cmscard border-cms-cardborder bg-cms-surface py-0 ring-0">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel htmlFor="email" className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-cms-labelfaint">
                    Email
                  </FieldLabel>
                  <Input id="email" name="email" type="email" value={data.email} onChange={(e) => setField("email", e.target.value)} autoComplete="email" required className={inputClassName} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password" className="mb-1.5 font-mono text-[10px] uppercase tracking-wide text-cms-labelfaint">
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={data.password}
                      onChange={(e) => setField("password", e.target.value)}
                      autoComplete="current-password"
                      required
                      className={cn(inputClassName, "pr-10")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-cms-muted hover:bg-transparent hover:text-cms-ink">
                      {showPassword ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                    </Button>
                  </div>
                </Field>

                <div className="flex items-center justify-between pt-1">
                  <Label className="cursor-pointer gap-2 font-normal text-cms-secondary">
                    <Checkbox className="border-cms-inputborder data-checked:border-cms-ink data-checked:bg-cms-ink" />
                    Remember me
                  </Label>
                  <a href="#" className="text-sm text-cms-muted transition-colors hover:text-cms-ink" onClick={(e) => e.preventDefault()}>
                    Forgot password?
                  </a>
                </div>

                <Button type="submit" size="lg" className="mt-2 h-auto w-full rounded-cmsbtn bg-cms-ink px-5 py-2.5 text-sm hover:bg-cms-body">
                  Log in
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <div className="mt-6 text-center">
          <Button type="button" variant="link" onClick={() => router.push("/")} className="h-auto p-0 text-sm font-normal text-cms-secondary transition-colors hover:text-cms-ink hover:no-underline">
            ← Back to public site
          </Button>
        </div>
      </div>
    </div>
  );
}
