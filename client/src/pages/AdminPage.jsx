import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import { api } from "../lib/api.js";
import { roleOptions } from "../lib/content.js";

const TOKEN_KEY = "gch_admin_token";
const statusColors = {
  pending: "var(--color-gold)",
  shortlisted: "var(--color-cyan)",
  accepted: "var(--color-mint)",
  rejected: "var(--color-coral)",
};
const statusOptions = ["pending", "shortlisted", "accepted", "rejected"];

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return (
    <div className="relative min-h-screen px-5 py-8">
      <AnimatedBackground />
      {token ? (
        <Dashboard token={token} onLogout={logout} />
      ) : (
        <Login
          onLogin={(t) => {
            localStorage.setItem(TOKEN_KEY, t);
            setToken(t);
          }}
        />
      )}
    </div>
  );
}

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token } = await api.login(username, password);
      onLogin(token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[85vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong ring-glow w-full max-w-sm rounded-3xl p-8"
      >
        <Link
          to="/"
          className="mb-6 inline-flex text-sm text-[var(--color-haze)] hover:text-white"
        >
          ← Home
        </Link>
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] text-xl">
            🔐
          </span>
          <div>
            <h1 className="font-[var(--font-display)] text-xl font-bold">
              Admin Panel
            </h1>
            <p className="text-xs text-[var(--color-haze)]">
              Volunteer command center
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-haze)]">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[var(--color-cyan)]/60 focus:ring-2 focus:ring-[var(--color-cyan)]/20"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-haze)]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[var(--color-cyan)]/60 focus:ring-2 focus:ring-[var(--color-cyan)]/20"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="rounded-xl border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 px-3 py-2 text-sm text-[var(--color-coral)]">
              {error}
            </p>
          )}
          <button
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-sm text-[var(--color-haze)]">{label}</p>
      <p
        className="mt-1 font-[var(--font-display)] text-3xl font-extrabold"
        style={{ color: accent }}
      >
        {value}
      </p>
    </div>
  );
}

function Dashboard({ token, onLogout }) {
  const [stats, setStats] = useState(null);
  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
  const [filters, setFilters] = useState({ q: "", role: "", status: "", page: 1 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const authError = useCallback(
    (e) => {
      if (/401|token|expired|auth/i.test(e.message)) onLogout();
      setErr(e.message);
    },
    [onLogout]
  );

  const loadStats = useCallback(() => {
    api.getStats(token).then(setStats).catch(authError);
  }, [token, authError]);

  const loadList = useCallback(() => {
    setLoading(true);
    api
      .listRegistrations({ ...filters, limit: 25 }, token)
      .then(setData)
      .catch(authError)
      .finally(() => setLoading(false));
  }, [token, filters, authError]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);
  useEffect(() => {
    loadList();
  }, [loadList]);

  async function changeStatus(id, status) {
    try {
      await api.updateStatus(id, status, token);
      loadList();
      loadStats();
    } catch (e) {
      authError(e);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this registration permanently?")) return;
    try {
      await api.remove(id, token);
      loadList();
      loadStats();
    } catch (e) {
      authError(e);
    }
  }

  function exportCsv() {
    const rows = data.items;
    if (!rows.length) return;
    const cols = [
      "fullName",
      "email",
      "phone",
      "college",
      "city",
      "course",
      "year",
      "role",
      "skills",
      "preferableStack",
      "teamName",
      "status",
      "createdAt",
    ];
    const csv = [
      cols.join(","),
      ...rows.map((r) =>
        cols
          .map((c) => {
            const v = Array.isArray(r[c]) ? r[c].join(" | ") : r[c] ?? "";
            return `"${String(v).replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "volunteers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-[var(--color-haze)]">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Admin</span>
          </div>
          <h1 className="mt-1 font-[var(--font-display)] text-3xl font-extrabold">
            Volunteer <span className="text-gradient">Dashboard</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCsv} className="btn-ghost !py-2.5 text-sm">
            ⬇ Export CSV
          </button>
          <button onClick={onLogout} className="btn-ghost !py-2.5 text-sm">
            Log out
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            label="Total volunteers"
            value={stats.total}
            accent="var(--color-violet)"
          />
          <StatCard
            label="Accepted"
            value={
              stats.byStatus.find((s) => s._id === "accepted")?.count || 0
            }
            accent="var(--color-mint)"
          />
          <StatCard
            label="Shortlisted"
            value={
              stats.byStatus.find((s) => s._id === "shortlisted")?.count || 0
            }
            accent="var(--color-cyan)"
          />
          <StatCard
            label="Colleges"
            value={stats.byCollege.length}
            accent="var(--color-coral)"
          />
        </div>
      )}

      {/* Role distribution + top colleges */}
      {stats && (
        <div className="mb-6 grid gap-4 lg:grid-cols-3">
          <div className="glass rounded-2xl p-5">
            <p className="mb-3 font-[var(--font-heading)] font-semibold">
              By role
            </p>
            <div className="space-y-2">
              {stats.byRole.slice(0, 6).map((r) => {
                const pct = stats.total
                  ? Math.round((r.count / stats.total) * 100)
                  : 0;
                return (
                  <div key={r._id || "none"}>
                    <div className="mb-1 flex justify-between text-xs text-[var(--color-haze)]">
                      <span>{r._id || "Unspecified"}</span>
                      <span>{r.count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="mb-3 font-[var(--font-heading)] font-semibold">
              Top colleges
            </p>
            <div className="flex flex-wrap gap-2">
              {stats.byCollege.length ? (
                stats.byCollege.map((c) => (
                  <span
                    key={c._id || "none"}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs"
                  >
                    {c._id || "Unknown"}{" "}
                    <strong className="text-[var(--color-cyan)]">{c.count}</strong>
                  </span>
                ))
              ) : (
                <p className="text-sm text-[var(--color-haze)]">No data yet.</p>
              )}
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="mb-3 font-[var(--font-heading)] font-semibold">
              Preferable stack
            </p>
            <div className="flex flex-wrap gap-2">
              {stats.byStack?.length ? (
                stats.byStack.map((s) => (
                  <span
                    key={s._id || "none"}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs"
                  >
                    {s._id || "Unknown"}{" "}
                    <strong className="text-[var(--color-violet)]">{s.count}</strong>
                  </span>
                ))
              ) : (
                <p className="text-sm text-[var(--color-haze)]">No data yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="glass mb-4 flex flex-wrap items-center gap-3 rounded-2xl p-4">
        <input
          value={filters.q}
          onChange={(e) =>
            setFilters((f) => ({ ...f, q: e.target.value, page: 1 }))
          }
          placeholder="Search name, email, college…"
          className="min-w-[14rem] flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-[var(--color-cyan)]/60"
        />
        <select
          value={filters.role}
          onChange={(e) =>
            setFilters((f) => ({ ...f, role: e.target.value, page: 1 }))
          }
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none"
        >
          <option value="" className="bg-[var(--color-night-2)]">
            All roles
          </option>
          {roleOptions.map((r) => (
            <option key={r} value={r} className="bg-[var(--color-night-2)]">
              {r}
            </option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value, page: 1 }))
          }
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none"
        >
          <option value="" className="bg-[var(--color-night-2)]">
            All statuses
          </option>
          {statusOptions.map((s) => (
            <option key={s} value={s} className="bg-[var(--color-night-2)]">
              {s}
            </option>
          ))}
        </select>
      </div>

      {err && (
        <p className="mb-4 rounded-xl border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 px-4 py-3 text-sm text-[var(--color-coral)]">
          {err}
        </p>
      )}

      {/* Table */}
      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-[var(--color-haze)]">
                <th className="px-4 py-3.5 font-semibold">Volunteer</th>
                <th className="px-4 py-3.5 font-semibold">College</th>
                <th className="px-4 py-3.5 font-semibold">Role</th>
                <th className="px-4 py-3.5 font-semibold">Stack</th>
                <th className="px-4 py-3.5 font-semibold">Status</th>
                <th className="px-4 py-3.5 font-semibold">Joined</th>
                <th className="px-4 py-3.5 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="px-4 py-4" colSpan={7}>
                      <div className="shimmer h-5 w-full rounded" />
                    </td>
                  </tr>
                ))
              ) : data.items.length ? (
                data.items.map((r) => (
                  <tr
                    key={r._id}
                    className="border-b border-white/5 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3.5">
                      <p className="font-semibold">{r.fullName}</p>
                      <p className="text-xs text-[var(--color-haze)]">
                        {r.email}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p>{r.college}</p>
                      <p className="text-xs text-[var(--color-haze)]">
                        {[r.course, r.year].filter(Boolean).join(" · ")}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-[var(--color-haze)]">
                      {r.role}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex max-w-[180px] flex-wrap gap-1">
                        {(r.preferableStack || []).length ? (
                          r.preferableStack.map((s) => (
                            <span
                              key={s}
                              className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.65rem] text-[var(--color-haze)]"
                            >
                              {s}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-[var(--color-haze)]">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <select
                        value={r.status}
                        onChange={(e) => changeStatus(r._id, e.target.value)}
                        className="rounded-lg border px-2 py-1 text-xs font-semibold outline-none"
                        style={{
                          color: statusColors[r.status],
                          borderColor: `${statusColors[r.status]}55`,
                          background: `${statusColors[r.status]}14`,
                        }}
                      >
                        {statusOptions.map((s) => (
                          <option
                            key={s}
                            value={s}
                            className="bg-[var(--color-night-2)] text-white"
                          >
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[var(--color-haze)]">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => remove(r._id)}
                        className="rounded-lg px-2 py-1 text-xs text-[var(--color-coral)] hover:bg-[var(--color-coral)]/10"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-16 text-center text-[var(--color-haze)]"
                  >
                    No volunteers match your filters yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {data.pages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3 text-sm">
          <button
            disabled={data.page <= 1}
            onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
            className="btn-ghost !px-4 !py-2 disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-[var(--color-haze)]">
            Page {data.page} of {data.pages}
          </span>
          <button
            disabled={data.page >= data.pages}
            onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
            className="btn-ghost !px-4 !py-2 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
