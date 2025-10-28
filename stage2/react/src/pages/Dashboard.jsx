import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTicketStats } from '../utils/storage';
import { getCurrentUser } from '../utils/auth';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0
  });
  const user = getCurrentUser();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const ticketStats = getTicketStats();
    setStats(ticketStats);
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p>Here's an overview of your ticket management</p>
          </div>
          <Link to="/tickets" className="btn btn-primary">
            Manage Tickets
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card stat-total">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.total}</h3>
              <p className="stat-label">Total Tickets</p>
            </div>
          </div>

          <div className="stat-card stat-open">
            <div className="stat-icon">🟢</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.open}</h3>
              <p className="stat-label">Open Tickets</p>
            </div>
          </div>

          <div className="stat-card stat-progress">
            <div className="stat-icon">🟡</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.in_progress}</h3>
              <p className="stat-label">In Progress</p>
            </div>
          </div>

          <div className="stat-card stat-closed">
            <div className="stat-icon">⚪</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.closed}</h3>
              <p className="stat-label">Resolved Tickets</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/tickets" className="action-box">
              <div className="action-icon">➕</div>
              <h3>Create Ticket</h3>
              <p>Report a new issue or request</p>
            </Link>

            <Link to="/tickets" className="action-box">
              <div className="action-icon">📋</div>
              <h3>View All Tickets</h3>
              <p>See all your tickets in one place</p>
            </Link>

            <Link to="/tickets" className="action-box">
              <div className="action-icon">🔍</div>
              <h3>Filter Tickets</h3>
              <p>Search and filter by status</p>
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="info-box">
          <h3>💡 Tip of the Day</h3>
          <p>
            Keep your tickets organized by using descriptive titles and clear descriptions. 
            This helps your team understand and resolve issues faster!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;