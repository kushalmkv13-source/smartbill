(() => {
  'use strict';

  // ============================
  // Background particles labels
  // ============================
  const bg = document.getElementById('bgParticles');
  if (bg) {
    const words = ['Customers', 'Products', 'Reports', 'Revenue', 'Analytics'];
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('span');
      el.className = 'particle';
      el.textContent = words[i % words.length];
      el.style.left = Math.random() * 100 + '%';
      el.style.top = 60 + Math.random() * 80 + '%';
      el.style.animationDuration = 28 + Math.random() * 20 + 's';
      bg.appendChild(el);
    }
  }

  // ============================
  // Mobile sidebar + drawer backdrop
  // ============================
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('drawerBackdrop');
  const toggle = document.getElementById('menuToggle');

  if (toggle && sidebar && backdrop) {
    toggle.addEventListener('click', () => {
      sidebar.classList.add('open');
      backdrop.classList.add('show');
    });

    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
    });
  }

  // ============================
  // Charts defaults
  // ============================
  if (window.Chart) {
    Chart.defaults.color = '#B8C7D9';
    Chart.defaults.font.family = "'Inter', sans-serif";
  }

  // ============================
  // Revenue chart
  // ============================
  const revenueCanvas = document.getElementById('revenueChart');
  if (revenueCanvas && window.Chart) {
    const ctx = revenueCanvas.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Revenue',
              data: [42000, 51000, 45000, 62000, 58000, 71000, 48950],
              borderColor: '#00D4FF',
              backgroundColor: 'rgba(0, 212, 255, 0.15)',
              fill: true,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 5,
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(10, 20, 40, 0.95)',
              borderColor: '#00D4FF',
              borderWidth: 1,
              titleColor: '#00D4FF',
              bodyColor: '#FFFFFF',
              padding: 12,
              callbacks: {
                label: (context) => '₹' + Number(context.parsed.y).toLocaleString('en-IN')
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#94A3B8' }
            },
            y: {
              grid: { color: 'rgba(255,255,255,0.04)' },
              ticks: {
                color: '#94A3B8',
                callback: (v) => '₹' + Number(v).toLocaleString('en-IN')
              }
            }
          }
        }
      });
    }
  }

  // ============================
  // Populate lists
  // ============================
  const topProducts = [
    { name: 'Cloud Pro Subscription', meta: 'SaaS · Annual', revenue: 412000 },
    { name: 'Enterprise GST Module', meta: 'Add-on', revenue: 286500 },
    { name: 'AI Invoice Assistant', meta: 'Add-on', revenue: 198400 },
    { name: 'Hardware POS Terminal', meta: 'Hardware', revenue: 142300 }
  ];

  const topCustomers = [
    { name: 'Nimbus Retail Pvt Ltd', total: 862000, last: '2 days ago' },
    { name: 'Orbit Logistics', total: 614500, last: '5 days ago' },
    { name: 'Zenith Pharma Distributors', total: 498200, last: '1 week ago' },
    { name: 'Vega Apparel Co.', total: 372900, last: '3 days ago' }
  ];

  const loggedUsers = [
    { name: 'Aarav Mehta', role: 'Sales Executive', email: 'aarav@invoicehub.com', time: '10 min ago' },
    { name: 'Neha Sharma', role: 'Account Manager', email: 'neha@invoicehub.com', time: '18 min ago' },
    { name: 'Rohit Verma', role: 'Support Lead', email: 'rohit@invoicehub.com', time: '21 min ago' },
    { name: 'Pooja Singh', role: 'Finance Analyst', email: 'pooja@invoicehub.com', time: '35 min ago' }
  ];

  const activities = [
    'New customer added',
    'Product price updated',
    'Monthly sales report generated',
    'Revenue summary reviewed'
  ];

  const reports = [
    'Sales Report · Generated today',
    'Revenue Report · Generated yesterday',
    'Customer Report · Generated yesterday',
    'Product Report · Generated this week'
  ];

  const loggedUsersEl = document.getElementById('loggedUsersList');
  if (loggedUsersEl) {
    loggedUsersEl.innerHTML = loggedUsers
      .map((u) => {
        const initials = u.name
          .split(' ')
          .map((w) => w[0])
          .slice(0, 2)
          .join('');

        return `
          <li class="customer-item">
            <div class="customer-info">
              <div class="customer-avatar" aria-hidden="true">${initials}</div>
              <div>
                <div class="customer-name">${u.name}</div>
                <div class="customer-email">${u.role} · ${u.email}</div>
              </div>
            </div>
            <div class="customer-amount">${u.time}</div>
          </li>
        `;
      })
      .join('');
  }

  const loggedCountEl = document.getElementById('loggedCount');
  if (loggedCountEl) loggedCountEl.textContent = String(loggedUsers.length);

  const topProductsEl = document.getElementById('topProducts');
  if (topProductsEl) {
    topProductsEl.innerHTML = topProducts
      .map(
        (p, i) => `
        <li class="rank-item">
          <div class="rank-info">
            <div class="rank-name">${p.name}</div>
            <div class="rank-meta">${p.meta}</div>
          </div>
          <div class="rank-rev">#${i + 1} · ₹${p.revenue.toLocaleString('en-IN')}</div>
        </li>
      `
      )
      .join('');
  }

  const topCustomersEl = document.getElementById('topCustomers');
  if (topCustomersEl) {
    topCustomersEl.innerHTML = topCustomers
      .map(
        (c) => `
        <li class="customer-item">
          <div class="customer-info">
            <div class="customer-avatar" aria-hidden="true">
              ${c.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div class="customer-name">${c.name}</div>
              <div class="customer-email">Last purchase ${c.last}</div>
            </div>
          </div>
          <div class="customer-amount">₹${c.total.toLocaleString('en-IN')}</div>
        </li>
      `
      )
      .join('');
  }

  const activityEl = document.getElementById('activityFeed');
  if (activityEl) {
    activityEl.innerHTML = activities
      .map(
        (a) => `
        <li class="timeline-item">
          <div class="activity-title">${a}</div>
          <div class="activity-time">Just now</div>
        </li>
      `
      )
      .join('');
  }

  const reportsEl = document.getElementById('reportsList');
  if (reportsEl) {
    reportsEl.innerHTML = reports
      .map(
        (r) => `
        <li class="timeline-item">
          <div class="activity-title">${r}</div>
          <div class="activity-time">Generated</div>
        </li>
      `
      )
      .join('');
  }

  // ============================
  // Logout handling
  // ============================
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    });
  }

  // ============================
  // Search (lightweight)
  // ============================
  const searchInput = document.getElementById('adminSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.trim();
      // No backend; keep it non-intrusive.
      if (term.length === 0) return;
    });
  }

  // ============================
  // Optional: Profile data from localStorage
  // ============================
  document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return;

    const welcome = document.querySelector('#welcomeName');
    const pn = document.getElementById('profileName');
    const pa = document.getElementById('profileAvatar');
    const pr = document.getElementById('profileRole');

    if (welcome && currentUser.name) welcome.textContent = currentUser.name;
    if (pn && currentUser.name) pn.textContent = currentUser.name;

    if (pa && currentUser.name) {
      const name = currentUser.name;
      pa.textContent = name
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .slice(0, 2)
        .join('');
    }

    if (pr && currentUser.role) pr.textContent = currentUser.role;
  });
})();