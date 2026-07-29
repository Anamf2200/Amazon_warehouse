import {
  IconDashboard, IconBox, IconTag, IconTruck, IconOrders,
  IconArrowDown, IconWastage, IconReport, IconCrate
} from "./icons";

const NAV = [
  { group: "Overview", items: [
    { key: "dashboard", label: "Dashboard", icon: IconDashboard },
  ]},
  { group: "Inventory", items: [
    { key: "products", label: "Products", icon: IconBox },
    { key: "categories", label: "Categories", icon: IconTag },
    { key: "suppliers", label: "Suppliers", icon: IconTruck },
  ]},
  { group: "Operations", items: [
    { key: "orders", label: "Orders", icon: IconOrders },
    { key: "stock", label: "Stock In / Out", icon: IconArrowDown },
    { key: "wastage", label: "Wastage", icon: IconWastage },
  ]},
  { group: "Insights", items: [
    { key: "reports", label: "Reports", icon: IconReport },
  ]},
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><IconCrate /></div>
        <div className="brand-text">
          <div className="t1">Amazano</div>
          <div className="t2">Warehouse Control</div>
        </div>
      </div>

      <nav className="nav">
        {NAV.map((section) => (
          <div key={section.group}>
            <div className="nav-group-label">{section.group}</div>
            {section.items.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`nav-btn${active === key ? " active" : ""}`}
                onClick={() => onChange(key)}
              >
                <Icon />
                {label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-foot">
        <span className="pulse-dot" />
        Synced to local storage
      </div>
    </aside>
  );
}
