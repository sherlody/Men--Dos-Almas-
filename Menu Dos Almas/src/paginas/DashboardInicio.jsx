function DashboardHome() {
  return (
    <>
      <div className="top-cards">
        <div className="card welcome-card">
          <div className="card-info">
            <p>Ventas</p>
            <h2>Hoy</h2>
          </div>
          <span className="badge">$3,000.00</span>
        </div>

        <div className="card inbox-card">
          <div className="card-info">
            <p>Clientes atendidos</p>
            <h2>Hoy</h2>
          </div>
          <button className="btn-primary">Ver clientes</button>
        </div>
      </div>

      <div className="stats-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="stats-card">
            <h3>Producto más vendido {i}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default DashboardHome;