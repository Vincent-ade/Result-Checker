import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { gradePoint } from "@/data/students";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/results")({
  head: () => ({ meta: [{ title: "Results — ResultHub" }] }),
  component: Results,
});

function Results() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.navigate({ to: "/login" });
  }, [user, loading, router]);

  if (loading || !user) {
    return <Layout><div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">Loading...</div></Layout>;
  }

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">Academic Results</h1>
            <p className="mt-2 text-muted-foreground">{user.name} · {user.matricNo}</p>
          </div>
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
        </div>

        <div className="mt-8 space-y-6">
          {user.semesters.map((sem, i) => {
            const units = sem.courses.reduce((a, c) => a + c.unit, 0);
            const pts = sem.courses.reduce((a, c) => a + c.unit * gradePoint(c.grade), 0);
            const gpa = units ? (pts / units).toFixed(2) : "0.00";
            return (
              <div key={i} className="rounded-2xl border border-border bg-card shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-6 py-4">
                  <div>
                    <h2 className="font-bold">{sem.session} — {sem.semester} Semester</h2>
                    <p className="text-xs text-muted-foreground">Level {sem.level}</p>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div><span className="text-muted-foreground">Units:</span> <span className="font-semibold">{units}</span></div>
                    <div><span className="text-muted-foreground">GPA:</span> <span className="font-semibold text-primary">{gpa}</span></div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-6 py-3">Code</th>
                        <th className="py-3">Course Title</th>
                        <th className="py-3">Unit</th>
                        <th className="py-3">Score</th>
                        <th className="py-3 pr-6">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sem.courses.map((c) => (
                        <tr key={c.code} className="border-t border-border">
                          <td className="px-6 py-3 font-mono text-xs">{c.code}</td>
                          <td className="py-3">{c.title}</td>
                          <td className="py-3">{c.unit}</td>
                          <td className="py-3">{c.score}</td>
                          <td className="py-3 pr-6">
                            <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                              c.grade === "A" ? "bg-success text-success-foreground" :
                              c.grade === "B" ? "bg-primary text-primary-foreground" :
                              c.grade === "C" ? "bg-accent text-accent-foreground" :
                              c.grade === "F" ? "bg-destructive text-destructive-foreground" :
                              "bg-warning text-warning-foreground"
                            }`}>{c.grade}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
