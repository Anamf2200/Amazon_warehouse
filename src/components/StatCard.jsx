export default function StatCard({ icon, label, value, unit, accent = "#ff9d2e", accentSoft = "rgba(255,157,46,.14)" }) {
  return (
    <div className="stat-card" style={{ "--accent": accent, "--accent-soft": accentSoft }}>
      <div className="icon-wrap">{icon}</div>
      <div className="label">{label}</div>
      <div className="value">
        {value}
        {unit ? <span className="unit">{unit}</span> : null}
      </div>
    </div>
  );
}
