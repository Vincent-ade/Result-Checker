import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { GraduationCap, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — ResultHub" },
      { name: "description", content: "Sign in to view your school results." },
    ],
  }),
  component: Login,
});

function Login() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [matricNo, setMatricNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.navigate({ to: "/dashboard" });
  }, [user, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matricNo.trim() || !password) {
      toast.error("Please enter your matric number and password");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const res = login(matricNo, password);
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error || "Login failed");
      return;
    }
    toast.success("Welcome back!");
    router.navigate({ to: "/dashboard" });
  };

  return (
    <Layout>
      <section className="mx-auto flex max-w-md flex-col items-center px-4 py-16 sm:px-6">
        <div className="gradient-primary mb-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-elegant">
          <GraduationCap className="h-7 w-7 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold">Student Login</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sign in with your matric number and password to access your results.
        </p>

        <form onSubmit={onSubmit} className="mt-8 w-full rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="space-y-4">
            <div>
              <Label htmlFor="matric">Matric Number</Label>
              <Input
                id="matric"
                placeholder="e.g. CSC/2021/001"
                value={matricNo}
                onChange={(e) => setMatricNo(e.target.value)}
                className="mt-1.5"
                autoComplete="username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5"
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full gradient-primary shadow-elegant">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : "Sign In"}
            </Button>
          </div>

        </form>
      </section>
    </Layout>
  );
}
