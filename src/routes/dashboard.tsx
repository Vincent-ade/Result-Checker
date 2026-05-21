import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { gradePoint } from "@/data/students";
import { Button } from "@/components/ui/button";
import { FileText, Calculator, User, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ResultHub" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.navigate({ to: "/login" });
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
          Loading...
        </div>
      </Layout>
    );
  }

  // CGPA across all semesters
  const allCourses = user.semesters.flatMap((s) => s.courses);
  const totalUnits = allCourses.reduce((a, c) => a + c.unit, 0);
  const totalPoints = allCourses.reduce((a, c) => a + c.unit * gradePoint(c.grade), 0);
  const cgpa = totalUnits ? (totalPoints / totalUnits).toFixed(2) : "0.00";

  const classOfDegree =
    +cgpa >= 4.5 ? "First Class" :
    +cgpa >= 3.5 ? "Second Class Upper" :
    +cgpa >= 2.4 ? "Second Class Lower" :
    +cgpa >= 1.5 ? "Third Class" :
    +cgpa >= 1.0 ? "Pass" : "Fail";

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl gradient-hero p-8 text-white shadow-elegant sm:p-10">
          <p className="text-sm font-medium text-white/70">Welcome back</p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{user.name}</h1>
          <p className="mt-2 text-white/80">{user.department} · Level {user.level}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-white/70">CGPA</p>
              <p className="mt-1 text-3xl font-bold">{cgpa}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-white/70">Total Units</p>
              <p className="mt-1 text-3xl font-bold">{totalUnits}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-white/70">Class</p>
              <p className="mt-1 text-xl font-bold">{classOfDegree}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FileText, title: "View Results", to: "/results", desc: "See all semester results" },
            { icon: Calculator, title: "GPA Calculator", to: "/gpa-calculator", desc: "Compute custom GPAs" },
            { icon: User, title: "My Profile", to: "/profile", desc: "View account details" },
            { icon: TrendingUp, title: "Progress", to: "/results", desc: `${user.semesters.length} semester(s)` },
          ].map((a) => (
            <Link key={a.title} to={a.to} className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-transform hover:-translate-y-1">
              <div className="gradient-primary inline-flex h-10 w-10 items-center justify-center rounded-lg">
                <a.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-semibold group-hover:text-primary">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Latest Semester</h2>
            <Link to="/results">
              <Button variant="outline" size="sm">View all</Button>
            </Link>
          </div>
          {user.semesters.length > 0 && (() => {
            const latest = user.semesters[user.semesters.length - 1];
            const units = latest.courses.reduce((a, c) => a + c.unit, 0);
            const pts = latest.courses.reduce((a, c) => a + c.unit * gradePoint(c.grade), 0);
            const gpa = units ? (pts / units).toFixed(2) : "0.00";
            return (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  {latest.session} · {latest.semester} Semester · GPA <span className="font-semibold text-foreground">{gpa}</span>
                </p>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-xs uppercase text-muted-foreground">
                      <tr><th className="py-2">Code</th><th>Title</th><th>Unit</th><th>Grade</th></tr>
                    </thead>
                    <tbody>
                      {latest.courses.map((c) => (
                        <tr key={c.code} className="border-t border-border">
                          <td className="py-2 font-mono text-xs">{c.code}</td>
                          <td>{c.title}</td>
                          <td>{c.unit}</td>
                          <td><GradeBadge grade={c.grade} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}
        </div>
      </section>
    </Layout>
  );
}

function GradeBadge({ grade }: { grade: string }) {
  const color =
    grade === "A" ? "bg-success text-success-foreground" :
    grade === "B" ? "bg-primary text-primary-foreground" :
    grade === "C" ? "bg-accent text-accent-foreground" :
    grade === "F" ? "bg-destructive text-destructive-foreground" :
    "bg-warning text-warning-foreground";
  return <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${color}`}>{grade}</span>;
}
