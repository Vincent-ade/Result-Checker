import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { User, Mail, GraduationCap, Building2, Hash } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — ResultHub" }] }),
  component: Profile,
});

function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.navigate({ to: "/login" });
  }, [user, loading, router]);

  if (loading || !user) {
    return <Layout><div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">Loading...</div></Layout>;
  }

  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  const fields = [
    { icon: User, label: "Full Name", value: user.name },
    { icon: Hash, label: "Matric Number", value: user.matricNo },
    { icon: Mail, label: "Email", value: user.email },
    { icon: GraduationCap, label: "Level", value: user.level },
    { icon: Building2, label: "Department", value: user.department },
    { icon: Building2, label: "Faculty", value: user.faculty },
  ];

  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl gradient-hero p-8 text-white shadow-elegant">
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold backdrop-blur">
              {initials}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="mt-1 text-white/80">{user.department}</p>
              <p className="text-sm text-white/70">{user.matricNo}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-lg">
                  <f.icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</p>
                  <p className="text-sm font-semibold">{f.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
