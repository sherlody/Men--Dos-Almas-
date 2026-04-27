import React from 'react';
import './PaginaCocinero.css';

function PricingTable() {
  return (
    <section className="pricing-section">
      <div className="pricing-container">
        
        {/* Plan Básico */}
        <div className="pricing-card card-outline">
          <div className="card-header header-white">
            <p className="plan-name">Basic</p>
            <p className="price">$19.<span className="cents">95</span></p>
            <p className="period">PER MONTH</p>
          </div>
          <div className="card-body body-blue">
            <p className="feature">Feature of the plan</p>
            <p className="feature">Another feature plan feature</p>
            <p className="feature">Yet another plan feature</p>
            <button className="btn btn-white">GET STARTED</button>
          </div>
        </div>

        {/* Plan Estándar (Popular) */}
        <div className="pricing-card card-popular">
          <div className="card-header header-popular body-blue">
            <p className="popular-badge">MOST POPULAR</p>
            <p className="plan-name text-white">Standard</p>
            <p className="price text-white">$49.<span className="cents">95</span></p>
            <p className="period text-white">PER MONTH</p>
          </div>
          <div className="card-body body-blue">
            <p className="feature text-white">Feature of the plan</p>
            <p className="feature text-white">Another feature plan feature</p>
            <p className="feature text-white">Yet another plan feature</p>
            <button className="btn btn-yellow">GET STARTED</button>
          </div>
        </div>

        {/* Plan Avanzado */}
        <div className="pricing-card card-outline">
          <div className="card-header header-white">
            <p className="plan-name">Advanced</p>
            <p className="price">$99.<span className="cents">95</span></p>
            <p className="period">PER MONTH</p>
          </div>
          <div className="card-body body-blue">
            <p className="feature">Feature of the plan</p>
            <p className="feature">Another feature plan feature</p>
            <p className="feature">Yet another plan feature</p>
            <button className="btn btn-white">GET STARTED</button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default PricingTable;