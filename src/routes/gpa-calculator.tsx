import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Calculator } from "lucide-react";
import { gradePoint } from "@/data/students";

export const Route = createFileRoute("/gpa-calculator")({
  head: () => ({
    meta: [
      { title: "GPA Calculator — ResultHub" },
      { name: "description", content: "Calculate your semester GPA instantly with our free tool." },
    ],
  }),
  component: GpaCalculator,
});

type Row = { id: string; course: string; unit: number; grade: "A" | "B" | "C" | "D" | "E" | "F" };

const newRow = (): Row => ({ id: crypto.randomUUID(), course: "", unit: 3, grade: "A" });

function GpaCalculator() {
  const [rows, setRows] = useState<Row[]>([newRow(), newRow(), newRow()]);

  const { gpa, totalUnits, classOfDegree } = useMemo(() => {
    const valid = rows.filter((r) => r.unit > 0);
    const units = valid.reduce((a, r) => a + r.unit, 0);
    const pts = valid.reduce((a, r) => a + r.unit * gradePoint(r.grade), 0);
    const g = units ? +(pts / units).toFixed(2) : 0;
    const cls =
      g >= 4.5 ? "First Class" :
      g >= 3.5 ? "Second Class Upper" :
      g >= 2.4 ? "Second Class Lower" :
      g >= 1.5 ? "Third Class" :
      g >= 1.0 ? "Pass" : "Fail";
    return { gpa: g.toFixed(2), totalUnits: units, classOfDegree: cls };
  }, [rows]);

  const update = (id: string, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const remove = (id: string) => setRows((rs) => rs.filter((r) => r.id !== id));
  const reset = () => setRows([newRow(), newRow(), newRow()]);

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="gradient-primary mx-auto flex h-14 w-14 items-center justify-center rounded-2xl shadow-elegant">
            <Calculator className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">GPA Calculator</h1>
          <p className="mt-2 text-muted-foreground">
            Add your courses, units, and grades to compute your GPA instantly.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
            <div className="space-y-3">
              {rows.map((r, i) => (
                <div key={r.id} className="grid grid-cols-12 items-center gap-2">
                  <div className="col-span-12 sm:col-span-6">
                    <Input
                      placeholder={`Course ${i + 1} (e.g. CSC 301)`}
                      value={r.course}
                      onChange={(e) => update(r.id, { course: e.target.value })}
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-2">
                    <Input
                      type="number"
                      min={0}
                      max={10}
                      value={r.unit}
                      onChange={(e) => update(r.id, { unit: Math.max(0, Math.min(10, +e.target.value || 0)) })}
                      placeholder="Unit"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-3">
                    <select
                      value={r.grade}
                      onChange={(e) => update(r.id, { grade: e.target.value as Row["grade"] })}
                      className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                      {(["A","B","C","D","E","F"] as const).map((g) => (
                        <option key={g} value={g}>{g} ({gradePoint(g)} pts)</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex justify-end">
                    <button
                      onClick={() => remove(r.id)}
                      disabled={rows.length <= 1}
                      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive disabled:opacity-30"
                      aria-label="Remove row"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setRows([...rows, newRow()])}>
                <Plus className="mr-2 h-4 w-4" /> Add Course
              </Button>
              <Button variant="ghost" onClick={reset}>Reset</Button>
            </div>
          </div>

          <div className="rounded-2xl gradient-primary p-6 text-primary-foreground shadow-elegant">
            <p className="text-xs uppercase tracking-wide text-primary-foreground/70">Your GPA</p>
            <p className="mt-2 text-6xl font-bold">{gpa}</p>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between border-t border-white/20 pt-2">
                <span className="text-primary-foreground/70">Total Units</span>
                <span className="font-semibold">{totalUnits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-foreground/70">Class</span>
                <span className="font-semibold">{classOfDegree}</span>
              </div>
            </div>
            <div className="mt-6 rounded-lg bg-white/10 p-3 text-xs">
              <p className="font-semibold">Grading Scale</p>
              <p className="mt-1 text-primary-foreground/80">A=5 · B=4 · C=3 · D=2 · E=1 · F=0</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
