/**
 * Seatly interactive wireframe — mirrors production Flutter screens.
 * Naming: PassengerHomeScreen, ServiceDetailScreen, TrackScreen,
 * ConductorHomeScreen, TripDetailScreen, SeatGrid, OccupancyLabel, PaymentSheet.
 */

(() => {
  'use strict';

  // ——— Brand / demo constants (lib/data/demo_data.dart) ———
  const DEMO_PNR = 'ST9X2K1';
  const TRACKABLE_SERVICE_ID = 'EXP-1101';

  const STATIONS = [
    { id: 'amd', name: 'Ahmedabad' },
    { id: 'vad', name: 'Vadodara' },
    { id: 'srt', name: 'Surat' },
    { id: 'rjk', name: 'Rajkot' },
    { id: 'bvn', name: 'Bhavnagar' },
    { id: 'jmn', name: 'Jamnagar' },
  ];

  const DEMO_SERVICES = [
    {
      id: 'EXP-1101',
      routeName: 'Ahmedabad Express',
      fromStationId: 'amd',
      toStationId: 'vad',
      departTime: '06:30',
      arriveTime: '08:45',
      totalSeats: 40,
      onlineBookedSeats: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
      id: 'ORD-2204',
      routeName: 'Surat Ordinary',
      fromStationId: 'srt',
      toStationId: 'amd',
      departTime: '09:15',
      arriveTime: '13:00',
      totalSeats: 36,
      onlineBookedSeats: [1, 2, 3, 4, 5],
    },
    {
      id: 'EXP-3307',
      routeName: 'Rajkot Express',
      fromStationId: 'rjk',
      toStationId: 'amd',
      departTime: '14:00',
      arriveTime: '18:30',
      totalSeats: 40,
      onlineBookedSeats: [],
    },
    {
      id: 'ORD-4412',
      routeName: 'Bhavnagar Ordinary',
      fromStationId: 'bvn',
      toStationId: 'srt',
      departTime: '07:45',
      arriveTime: '12:20',
      totalSeats: 32,
      onlineBookedSeats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
    {
      id: 'EXP-5520',
      routeName: 'Jamnagar Express',
      fromStationId: 'jmn',
      toStationId: 'rjk',
      departTime: '16:30',
      arriveTime: '19:15',
      totalSeats: 40,
      onlineBookedSeats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
  ];

  // ——— In-memory TripStore (mirrors lib/data/trip_store.dart) ———
  const store = {
    onboard: {}, // serviceId → number[]
    standing: {}, // serviceId → number
  };

  function getOnboard(id) {
    return store.onboard[id] ? [...store.onboard[id]] : [];
  }

  function getStanding(id) {
    return store.standing[id] || 0;
  }

  function sellSeat(serviceId, seatNumber) {
    const list = getOnboard(serviceId);
    if (!list.includes(seatNumber)) {
      list.push(seatNumber);
      store.onboard[serviceId] = list;
    }
  }

  function sellStanding(serviceId) {
    store.standing[serviceId] = getStanding(serviceId) + 1;
  }

  function resetStore() {
    store.onboard = {};
    store.standing = {};
  }

  function applyService(base) {
    return {
      ...base,
      onboardOccupiedSeats: getOnboard(base.id),
      standingCount: getStanding(base.id),
    };
  }

  function occupiedCount(svc) {
    return new Set([...svc.onlineBookedSeats, ...svc.onboardOccupiedSeats]).size;
  }

  function seatsLeft(svc) {
    return svc.totalSeats - occupiedCount(svc);
  }

  function isSeatsFull(svc) {
    return seatsLeft(svc) <= 0;
  }

  function occupancyLabel(svc) {
    const left = seatsLeft(svc);
    if (left > 0) return `${left} seats left`;
    return `Seats full · ${svc.standingCount} standing`;
  }

  function seatStatus(svc, n) {
    if (svc.onlineBookedSeats.includes(n)) return 'online';
    if (svc.onboardOccupiedSeats.includes(n)) return 'occupied';
    return 'free';
  }

  function stationById(id) {
    return STATIONS.find((s) => s.id === id);
  }

  function canTrackWithPnr(pnr, service) {
    return (
      (pnr || '').trim().toUpperCase() === DEMO_PNR &&
      service.id === TRACKABLE_SERVICE_ID
    );
  }

  function servicesForRoute(fromId, toId) {
    if (!fromId || !toId || fromId === toId) return [];
    return DEMO_SERVICES.filter(
      (s) => s.fromStationId === fromId && s.toStationId === toId,
    ).map(applyService);
  }

  function allTrips() {
    return DEMO_SERVICES.map(applyService);
  }

  function findTrip(id) {
    return allTrips().find((t) => t.id === id) || null;
  }

  // ——— App state ———
  const state = {
    stack: ['passenger-home'],
    tab: 'passenger', // passenger | conductor
    fromId: null,
    toId: null,
    pnr: '',
    selectedServiceId: null,
    selectedTripId: null,
    paySeat: null, // number | null for standing
    payAmount: 120,
    payMethod: 'upi',
    devPanelOpen: false,
    tour: null, // { role, step }
  };

  // ——— Screens registry ———
  const screens = {
    'passenger-home': {
      id: 'passenger-home',
      title: 'Passenger',
      caption: 'Pick From + To to see line-up, timings, and occupancy.',
      role: 'passenger',
      route: '/',
      routeName: 'PassengerHome',
      widget: 'PassengerHomeScreen',
      file: 'lib/screens/passenger/passenger_home_screen.dart',
      provider: 'fromStationProvider, toStationProvider, filteredServicesProvider',
      showBottomNav: true,
      render: renderPassengerHome,
    },
    'service-detail': {
      id: 'service-detail',
      title: null, // dynamic = service.id
      caption: 'Service detail — enter a confirmed PNR to unlock live track.',
      role: 'passenger',
      route: '/service/:id',
      routeName: 'ServiceDetail',
      widget: 'ServiceDetailScreen',
      file: 'lib/screens/passenger/service_detail_screen.dart',
      provider: 'demoPnrProvider',
      showBottomNav: false,
      render: renderServiceDetail,
    },
    track: {
      id: 'track',
      title: 'Live track',
      caption: 'Demo live map — only after PNR ST9X2K1 on EXP-1101.',
      role: 'passenger',
      route: '/track/:id',
      routeName: 'Track',
      widget: 'TrackScreen',
      file: 'lib/screens/passenger/track_screen.dart',
      provider: '(none — StatelessWidget)',
      showBottomNav: false,
      render: renderTrack,
    },
    'conductor-home': {
      id: 'conductor-home',
      title: 'Conductor ETM',
      caption: 'Today’s trips — seat map first, tap a free seat to sell.',
      role: 'conductor',
      route: '/conductor',
      routeName: 'ConductorHome',
      widget: 'ConductorHomeScreen',
      file: 'lib/screens/conductor/conductor_home_screen.dart',
      provider: 'conductorTripsProvider, selectedTripProvider',
      showBottomNav: true,
      render: renderConductorHome,
    },
    'trip-detail': {
      id: 'trip-detail',
      title: null,
      caption: 'SeatGrid + standing sales when full. Tap free → PaymentSheet.',
      role: 'conductor',
      route: '/trip/:id',
      routeName: 'TripDetail',
      widget: 'TripDetailScreen',
      file: 'lib/screens/conductor/trip_detail_screen.dart',
      provider: 'conductorTripsProvider, tripStoreProvider',
      showBottomNav: false,
      render: renderTripDetail,
      onEnter() {
        /* occupancy already live from store */
      },
    },
  };

  // ——— DOM refs ———
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const els = {
    appChrome: $('#app-chrome'),
    caption: $('#screen-caption'),
    breadcrumb: $('#breadcrumb'),
    appBar: $('#app-bar'),
    body: $('#screen-body'),
    bottomNav: $('#bottom-nav'),
    modalRoot: $('#modal-root'),
    toastHost: $('#toast-host'),
    tourLayer: $('#tour-layer'),
    flowOverlay: $('#flow-overlay'),
    rail: $('#desktop-rail'),
    clock: $('#status-clock'),
  };

  // ——— Navigation ———
  function currentId() {
    return state.stack[state.stack.length - 1];
  }

  function currentScreen() {
    return screens[currentId()];
  }

  function navigate(id, { replace = false, reset = false } = {}) {
    if (reset) {
      state.stack = [id];
    } else if (replace) {
      state.stack[state.stack.length - 1] = id;
    } else {
      if (currentId() !== id) state.stack.push(id);
    }
    closeModal();
    render();
    const screen = screens[id];
    if (screen?.onEnter) screen.onEnter();
  }

  function goBack() {
    if (state.stack.length > 1) {
      state.stack.pop();
      closeModal();
      render();
      return;
    }
    // At root of a tab — switch is enough
    showToast('You are at the home for this role');
  }

  function switchTab(tab) {
    state.tab = tab;
    const id = tab === 'passenger' ? 'passenger-home' : 'conductor-home';
    state.stack = [id];
    closeModal();
    render();
  }

  // ——— Toast / Modal ———
  function showToast(message) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    els.toastHost.appendChild(el);
    setTimeout(() => {
      el.classList.add('out');
      setTimeout(() => el.remove(), 300);
    }, 2200);
  }

  function showModal(html) {
    els.modalRoot.innerHTML = `
      <div class="modal-backdrop" data-action="close-modal"></div>
      <div class="modal-sheet" role="dialog" aria-modal="true">${html}</div>
    `;
    els.modalRoot.classList.add('open');
    els.modalRoot.setAttribute('aria-hidden', 'false');
    const focusable = els.modalRoot.querySelector(
      'button, [href], input, select, textarea',
    );
    focusable?.focus();
  }

  function closeModal() {
    els.modalRoot.classList.remove('open');
    els.modalRoot.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      if (!els.modalRoot.classList.contains('open')) {
        els.modalRoot.innerHTML = '';
      }
    }, 280);
  }

  function toggleDevPanel() {
    state.devPanelOpen = !state.devPanelOpen;
    renderDevPanel();
  }

  function renderDevPanel() {
    let panel = $('#dev-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'dev-panel';
      panel.className = 'dev-panel';
      els.appChrome.appendChild(panel);
    }
    const s = currentScreen();
    const title =
      typeof s.title === 'function' ? s.title() : dynamicTitle(s);
    panel.innerHTML = `
      <h4>Dev panel</h4>
      <dl>
        <dt>Screen id</dt><dd>${s.id}</dd>
        <dt>RouteName</dt><dd>${s.routeName}</dd>
        <dt>Path</dt><dd>${resolvePath(s)}</dd>
        <dt>Widget</dt><dd>${s.widget}</dd>
        <dt>File</dt><dd>${s.file}</dd>
        <dt>Provider</dt><dd>${s.provider}</dd>
        <dt>Title</dt><dd>${escapeHtml(title)}</dd>
        <dt>Shell</dt><dd>_HomeShell (lib/app.dart) · seed #0B6E4F</dd>
      </dl>
    `;
    panel.classList.toggle('open', state.devPanelOpen);
  }

  function resolvePath(s) {
    if (s.id === 'service-detail') return `/service/${state.selectedServiceId || ':id'}`;
    if (s.id === 'track') return `/track/${state.selectedServiceId || ':id'}`;
    if (s.id === 'trip-detail') return `/trip/${state.selectedTripId || ':id'}`;
    return s.route;
  }

  function dynamicTitle(s) {
    if (s.id === 'service-detail' || s.id === 'track') {
      return state.selectedServiceId || s.title || 'Service';
    }
    if (s.id === 'trip-detail') {
      return state.selectedTripId || 'Trip';
    }
    return s.title;
  }

  // ——— Occupancy pill ———
  function occupancyHtml(svc) {
    const full = isSeatsFull(svc);
    return `<span class="occupancy${full ? ' full' : ''}">${occupancyLabel(svc)}</span>`;
  }

  // ——— Screen renders ———
  function renderPassengerHome() {
    const fromOpts = STATIONS.filter((s) => s.id !== state.toId)
      .map(
        (s) =>
          `<option value="${s.id}"${s.id === state.fromId ? ' selected' : ''}>${s.name}</option>`,
      )
      .join('');
    const toOpts = STATIONS.filter((s) => s.id !== state.fromId)
      .map(
        (s) =>
          `<option value="${s.id}"${s.id === state.toId ? ' selected' : ''}>${s.name}</option>`,
      )
      .join('');

    let listHtml = '';
    if (!state.fromId || !state.toId) {
      listHtml = `<p class="hint">Pick From and To stations to see line-up.</p>`;
    } else if (state.fromId === state.toId) {
      listHtml = `<p class="hint">From and To must be different stations.</p>`;
    } else {
      const services = servicesForRoute(state.fromId, state.toId);
      if (!services.length) {
        listHtml = `<p class="hint">No services found for this route (demo data).</p>`;
      } else {
        listHtml = services
          .map(
            (svc) => `
          <button type="button" class="service-card" data-action="open-service" data-id="${svc.id}" data-tour="service-card">
            <div class="meta">
              <div class="id">${svc.id} · ${svc.routeName}</div>
              <div class="sub">${svc.departTime} → ${svc.arriveTime}</div>
            </div>
            ${occupancyHtml(svc)}
          </button>`,
          )
          .join('');
      }
    }

    return `
      <p class="tagline">Asaan sawari — know before you board</p>
      <div class="field" data-tour="from-picker">
        <label>From</label>
        <select data-action="set-from">
          <option value="">Select From station</option>
          ${fromOpts}
        </select>
      </div>
      <div class="field" data-tour="to-picker">
        <label>To</label>
        <select data-action="set-to">
          <option value="">Select To station</option>
          ${toOpts}
        </select>
      </div>
      <h3 class="section-title">Services</h3>
      ${listHtml}
    `;
  }

  function renderServiceDetail() {
    const base = DEMO_SERVICES.find((s) => s.id === state.selectedServiceId);
    if (!base) return `<p class="empty-state">Service not found</p>`;
    const svc = applyService(base);
    const from = stationById(svc.fromStationId).name;
    const to = stationById(svc.toStationId).name;
    const canTrack = canTrackWithPnr(state.pnr, svc);

    return `
      <div class="detail-head">
        <h2>${svc.routeName}</h2>
        <p>${from} → ${to}</p>
        <p>Depart ${svc.departTime} · Arrive ${svc.arriveTime}</p>
      </div>
      <div style="margin:12px 0">${occupancyHtml(svc)}</div>
      <h3 class="section-title">Live track (confirmed booking only)</h3>
      <div class="field" data-tour="pnr-field">
        <label>PNR / booking reference</label>
        <input type="text" value="${escapeHtml(state.pnr)}" placeholder="Try demo PNR: ST9X2K1" data-action="set-pnr" />
      </div>
      <p class="pnr-note${canTrack ? ' ok' : ''}">
        ${
          canTrack
            ? 'Booking confirmed — live track available for this service.'
            : 'Enter a confirmed PNR to unlock live track. Without confirmation, only line-up and availability are shown.'
        }
      </p>
      <button type="button" class="btn btn-filled btn-block" data-action="track-bus" data-tour="track-btn" ${canTrack ? '' : 'disabled'}>
        🗺 Track bus
      </button>
    `;
  }

  function renderTrack() {
    const base = DEMO_SERVICES.find((s) => s.id === state.selectedServiceId);
    if (!base) return `<p class="empty-state">Service not found</p>`;
    const from = stationById(base.fromStationId).name;
    const to = stationById(base.toStationId).name;
    return `
      <h2 style="font-family:var(--font-display);font-size:1.15rem;margin:0 0 8px">${base.id} · ${from} → ${to}</h2>
      <p class="hint">Demo live map — real GPS integration comes later. Track is shown only because PNR ST9X2K1 matches this service.</p>
      <div class="track-map" data-tour="track-map">
        <div class="route-icon">🛣</div>
        <div class="map-pin from"><span class="bus">🚌</span>${from}</div>
        <div class="map-pin enroute"><span class="bus">🚌</span>En route (demo)</div>
        <div class="map-pin to"><span class="bus">🚌</span>${to}</div>
      </div>
      <p style="font-weight:600;margin:0">Estimated arrival: ${base.arriveTime}</p>
    `;
  }

  function renderConductorHome() {
    const trips = allTrips();
    const soldToday = Object.values(store.onboard).reduce((a, b) => a + b.length, 0);
    const standingToday = Object.values(store.standing).reduce((a, b) => a + b, 0);

    const cards = trips
      .map((trip) => {
        const from = stationById(trip.fromStationId).name;
        const to = stationById(trip.toStationId).name;
        return `
        <button type="button" class="trip-card" data-action="open-trip" data-id="${trip.id}" data-tour="trip-card">
          <div class="meta">
            <div class="id">${trip.id} · ${from} → ${to}</div>
            <div class="sub">${trip.departTime} · ${occupancyLabel(trip)}</div>
          </div>
          <span class="chevron">›</span>
        </button>`;
      })
      .join('');

    return `
      <p class="tagline">Seat map first · tap to sell</p>
      <div class="stat-row">
        <div class="stat-chip"><div class="n">${soldToday}</div><div class="l">Onboard seats sold (session)</div></div>
        <div class="stat-chip alt"><div class="n">${standingToday}</div><div class="l">Standing tickets (session)</div></div>
      </div>
      ${cards}
    `;
  }

  function renderTripDetail() {
    const trip = findTrip(state.selectedTripId);
    if (!trip) {
      return `<p class="empty-state">Trip not found</p>`;
    }
    const from = stationById(trip.fromStationId).name;
    const to = stationById(trip.toStationId).name;
    const full = isSeatsFull(trip);

    const seats = Array.from({ length: trip.totalSeats }, (_, i) => {
      const n = i + 1;
      const st = seatStatus(trip, n);
      const attrs =
        st === 'free'
          ? `data-action="sell-seat" data-seat="${n}" data-tour="free-seat"`
          : 'disabled';
      return `<button type="button" class="seat ${st}" ${attrs}>${n}</button>`;
    }).join('');

    return `
      <h2 style="font-family:var(--font-display);font-size:1.2rem;margin:0 0 4px">${from} → ${to}</h2>
      <p class="hint" style="margin-bottom:14px">Depart ${trip.departTime} · ${occupancyLabel(trip)}</p>
      <div class="seat-legend">
        <span><i class="swatch free"></i> Free</span>
        <span><i class="swatch onboard"></i> Onboard</span>
        <span><i class="swatch online"></i> Online booked</span>
      </div>
      <div class="seat-grid" data-tour="seat-grid">${seats}</div>
      <button type="button" class="btn btn-tonal btn-block" data-action="sell-standing" data-tour="standing-btn" ${full ? '' : 'disabled'}>
        🧍 ${full ? `Sell standing ticket (${trip.standingCount} sold)` : 'Standing sales unlock when seats are full'}
      </button>
    `;
  }

  function openPaymentSheet(seatNumber, amount) {
    state.paySeat = seatNumber;
    state.payAmount = amount;
    state.payMethod = 'upi';
    renderPaymentSheet();
  }

  function renderPaymentSheet() {
    const title =
      state.paySeat == null ? 'Standing ticket' : `Seat ${state.paySeat}`;
    const upi = state.payMethod === 'upi';
    showModal(`
      <button type="button" class="sheet-close" data-action="close-modal" aria-label="Close">×</button>
      <h3>${title}</h3>
      <p class="amount">₹${state.payAmount} · Demo payment</p>
      <div class="segmented" data-tour="pay-method">
        <button type="button" class="${upi ? 'active' : ''}" data-action="pay-method" data-method="upi">▣ UPI</button>
        <button type="button" class="${!upi ? 'active' : ''}" data-action="pay-method" data-method="cash">₹ Cash</button>
      </div>
      ${
        upi
          ? `<div class="qr-box" aria-hidden="true"></div>
             <p class="pay-hint">Scan to pay (simulated). Tap confirm after payment.</p>`
          : `<p class="pay-hint">Collect cash from passenger, then confirm.</p>`
      }
      <button type="button" class="btn btn-filled btn-block" data-action="confirm-pay" data-tour="confirm-pay">
        ${upi ? 'Confirm UPI received' : 'Confirm cash'}
      </button>
    `);
  }

  // ——— Main render ———
  function render() {
    const s = currentScreen();
    const title = dynamicTitle(s);

    els.caption.textContent = s.caption;
    els.breadcrumb.innerHTML = buildBreadcrumb(s);

    const canBack = state.stack.length > 1;
    els.appBar.innerHTML = `
      ${canBack ? `<button type="button" class="icon-btn" data-action="back" aria-label="Back">←</button>` : `<span style="width:36px"></span>`}
      <div class="title">${escapeHtml(title)}</div>
      <button type="button" class="icon-btn" data-action="toggle-dev" title="Dev panel" aria-label="Dev panel">⚙</button>
    `;

    els.body.innerHTML = s.render();

    if (s.showBottomNav) {
      els.bottomNav.style.display = 'flex';
      els.bottomNav.innerHTML = `
        <button type="button" class="${state.tab === 'passenger' ? 'active' : ''}" data-action="tab" data-tab="passenger" data-tour="tab-passenger">
          <span class="nav-icon">👤</span>Passenger
        </button>
        <button type="button" class="${state.tab === 'conductor' ? 'active' : ''}" data-action="tab" data-tab="conductor" data-tour="tab-conductor">
          <span class="nav-icon">🎟</span>Conductor
        </button>
      `;
    } else {
      els.bottomNav.style.display = 'none';
      els.bottomNav.innerHTML = '';
    }

    renderDevPanel();
    renderRail();
    updateClock();

    if (state.tour) {
      requestAnimationFrame(() => placeTourCallout());
    } else {
      els.tourLayer.innerHTML = '';
    }
  }

  function buildBreadcrumb(s) {
    const crumbs = state.stack.map((id, i) => {
      const label = screens[id].routeName;
      const last = i === state.stack.length - 1;
      return last
        ? `<span class="here">${label}</span>`
        : `<span>${label}</span>`;
    });
    return `<span>You are here:</span> ${crumbs.join(' <span>›</span> ')} <span class="you-are-here">${s.role}</span>`;
  }

  function renderRail() {
    if (!els.rail) return;
    const order = [
      'passenger-home',
      'service-detail',
      'track',
      'conductor-home',
      'trip-detail',
    ];
    els.rail.innerHTML = `
      <h3>Screens</h3>
      ${order
        .map((id) => {
          const sc = screens[id];
          return `<button type="button" class="rail-screen${currentId() === id ? ' active' : ''}" data-action="rail-jump" data-id="${id}">${sc.widget}</button>`;
        })
        .join('')}
    `;
  }

  function updateClock() {
    if (!els.clock) return;
    const d = new Date();
    els.clock.textContent = d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // ——— Tours ———
  const TOURS = {
    passenger: [
      {
        target: '[data-tour="from-picker"]',
        text: 'Pick From — try Ahmedabad.',
        screen: 'passenger-home',
        setup() {
          switchTab('passenger');
        },
      },
      {
        target: '[data-tour="to-picker"]',
        text: 'Pick To — Vadodara unlocks EXP-1101.',
        screen: 'passenger-home',
        setup() {
          state.fromId = 'amd';
          navigate('passenger-home', { reset: true });
        },
      },
      {
        target: '[data-tour="service-card"]',
        text: 'Tap the service card to open detail.',
        screen: 'passenger-home',
        setup() {
          state.fromId = 'amd';
          state.toId = 'vad';
          navigate('passenger-home', { reset: true });
        },
      },
      {
        target: '[data-tour="pnr-field"]',
        text: `Enter demo PNR ${DEMO_PNR} to unlock Track.`,
        screen: 'service-detail',
        setup() {
          state.fromId = 'amd';
          state.toId = 'vad';
          state.selectedServiceId = TRACKABLE_SERVICE_ID;
          state.stack = ['passenger-home', 'service-detail'];
          state.tab = 'passenger';
        },
      },
      {
        target: '[data-tour="track-btn"]',
        text: 'Tap Track bus — live map opens.',
        screen: 'service-detail',
        setup() {
          state.fromId = 'amd';
          state.toId = 'vad';
          state.selectedServiceId = TRACKABLE_SERVICE_ID;
          state.pnr = DEMO_PNR;
          state.stack = ['passenger-home', 'service-detail'];
          state.tab = 'passenger';
        },
      },
      {
        target: '[data-tour="track-map"]',
        text: 'Demo map with en-route pin. Tour complete!',
        screen: 'track',
        setup() {
          state.selectedServiceId = TRACKABLE_SERVICE_ID;
          state.pnr = DEMO_PNR;
          state.stack = ['passenger-home', 'service-detail', 'track'];
          state.tab = 'passenger';
        },
      },
    ],
    conductor: [
      {
        target: '[data-tour="tab-conductor"]',
        text: 'Open the Conductor ETM tab.',
        screen: 'conductor-home',
        setup() {
          switchTab('conductor');
        },
      },
      {
        target: '[data-tour="trip-card"]',
        text: 'Select a trip to open the seat map.',
        screen: 'conductor-home',
        setup() {
          switchTab('conductor');
        },
      },
      {
        target: '[data-tour="seat-grid"]',
        text: 'Free seats are tappable. Online booked & onboard are locked.',
        screen: 'trip-detail',
        setup() {
          state.selectedTripId = 'EXP-3307'; // empty online = many free
          state.tab = 'conductor';
          state.stack = ['conductor-home', 'trip-detail'];
        },
      },
      {
        target: '[data-tour="free-seat"]',
        text: 'Tap a free seat — PaymentSheet opens (UPI / Cash).',
        screen: 'trip-detail',
        setup() {
          state.selectedTripId = 'EXP-3307';
          state.tab = 'conductor';
          state.stack = ['conductor-home', 'trip-detail'];
        },
      },
      {
        target: '[data-tour="confirm-pay"]',
        text: 'Confirm payment — seat turns occupied, occupancy updates.',
        screen: 'trip-detail',
        setup() {
          state.selectedTripId = 'EXP-3307';
          state.tab = 'conductor';
          state.stack = ['conductor-home', 'trip-detail'];
          // open sheet on first free seat
          setTimeout(() => openPaymentSheet(1, 120), 50);
        },
      },
      {
        target: '[data-tour="standing-btn"]',
        text: 'Standing unlocks only when seats are full. Tour complete!',
        screen: 'trip-detail',
        setup() {
          // Fill ORD-4412 which already has 15 online of 32 — sell rest in store for demo feel
          // Better: use a small trip — fill EXP with all seats via store for ORD-4412 remaining
          const tripId = 'ORD-4412';
          const base = DEMO_SERVICES.find((s) => s.id === tripId);
          const need = [];
          for (let n = 1; n <= base.totalSeats; n++) {
            if (!base.onlineBookedSeats.includes(n)) need.push(n);
          }
          store.onboard[tripId] = need;
          state.selectedTripId = tripId;
          state.tab = 'conductor';
          state.stack = ['conductor-home', 'trip-detail'];
          closeModal();
        },
      },
    ],
  };

  function startTour(role) {
    state.tour = { role, step: 0 };
    const steps = TOURS[role];
    if (!steps?.length) return;
    steps[0].setup?.();
    render();
    showToast(`Tour: ${role} — follow “Tap here next”`);
  }

  function endTour() {
    state.tour = null;
    els.tourLayer.innerHTML = '';
    $$('.tour-highlight').forEach((el) => el.classList.remove('tour-highlight'));
    showToast('Tour ended');
  }

  function nextTourStep() {
    if (!state.tour) return;
    const steps = TOURS[state.tour.role];
    state.tour.step += 1;
    if (state.tour.step >= steps.length) {
      endTour();
      showToast('Tour complete — try it yourself');
      return;
    }
    steps[state.tour.step].setup?.();
    render();
  }

  function placeTourCallout() {
    $$('.tour-highlight').forEach((el) => el.classList.remove('tour-highlight'));
    els.tourLayer.innerHTML = '';
    if (!state.tour) return;

    const step = TOURS[state.tour.role][state.tour.step];
    if (!step) return;

    // Ensure correct screen
    if (currentId() !== step.screen) {
      // setup should have set stack; re-render once
    }

    const target = document.querySelector(step.target);
    if (!target) {
      els.tourLayer.innerHTML = `
        <div class="tour-callout below" style="top:80px;left:20px">
          <strong>Tap here next</strong>
          ${escapeHtml(step.text)}
          <div class="tour-actions">
            <button type="button" class="tour-next" data-action="tour-next">Next</button>
            <button type="button" class="tour-skip" data-action="tour-skip">Skip tour</button>
          </div>
        </div>`;
      return;
    }

    target.classList.add('tour-highlight');
    const phoneScreen = $('.phone-screen');
    const screenRect = phoneScreen.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    const top = rect.bottom - screenRect.top + 8;
    const left = Math.min(
      Math.max(8, rect.left - screenRect.left),
      screenRect.width - 230,
    );

    const placeAbove = top + 100 > screenRect.height - 80;
    const calloutTop = placeAbove
      ? rect.top - screenRect.top - 110
      : top;

    els.tourLayer.innerHTML = `
      <div class="tour-callout ${placeAbove ? 'above' : 'below'}" style="top:${Math.max(48, calloutTop)}px;left:${left}px">
        <strong>Tap here next</strong>
        ${escapeHtml(step.text)}
        <div class="tour-actions">
          <button type="button" class="tour-next" data-action="tour-next">Next</button>
          <button type="button" class="tour-skip" data-action="tour-skip">Skip tour</button>
        </div>
      </div>`;
  }

  // ——— Events ———
  function onAction(action, el, e) {
    switch (action) {
      case 'back':
        goBack();
        break;
      case 'toggle-dev':
        toggleDevPanel();
        break;
      case 'tab':
        switchTab(el.dataset.tab);
        break;
      case 'set-from':
        state.fromId = el.value || null;
        render();
        break;
      case 'set-to':
        state.toId = el.value || null;
        render();
        break;
      case 'open-service':
        state.selectedServiceId = el.dataset.id;
        navigate('service-detail');
        break;
      case 'set-pnr':
        state.pnr = el.value;
        // soft re-render of detail only
        render();
        break;
      case 'track-bus':
        if (canTrackWithPnr(state.pnr, { id: state.selectedServiceId })) {
          navigate('track');
        } else {
          showToast('Enter a confirmed PNR for this service');
        }
        break;
      case 'open-trip':
        state.selectedTripId = el.dataset.id;
        navigate('trip-detail');
        break;
      case 'sell-seat':
        openPaymentSheet(Number(el.dataset.seat), 120);
        break;
      case 'sell-standing': {
        const trip = findTrip(state.selectedTripId);
        if (trip && isSeatsFull(trip)) openPaymentSheet(null, 80);
        else showToast('Standing sales unlock when seats are full');
        break;
      }
      case 'pay-method':
        state.payMethod = el.dataset.method;
        renderPaymentSheet();
        break;
      case 'confirm-pay':
        if (state.paySeat == null) {
          sellStanding(state.selectedTripId);
          showToast('Standing ticket sold · occupancy updated');
        } else {
          sellSeat(state.selectedTripId, state.paySeat);
          showToast(`Seat ${state.paySeat} sold · now occupied`);
        }
        closeModal();
        render();
        break;
      case 'close-modal':
        closeModal();
        break;
      case 'tour-next':
        nextTourStep();
        break;
      case 'tour-skip':
        endTour();
        render();
        break;
      case 'rail-jump': {
        const id = el.dataset.id;
        if (id === 'passenger-home') {
          switchTab('passenger');
        } else if (id === 'conductor-home') {
          switchTab('conductor');
        } else if (id === 'service-detail') {
          state.fromId = state.fromId || 'amd';
          state.toId = state.toId || 'vad';
          state.selectedServiceId = state.selectedServiceId || TRACKABLE_SERVICE_ID;
          state.tab = 'passenger';
          state.stack = ['passenger-home', 'service-detail'];
          render();
        } else if (id === 'track') {
          state.selectedServiceId = TRACKABLE_SERVICE_ID;
          state.pnr = DEMO_PNR;
          state.tab = 'passenger';
          state.stack = ['passenger-home', 'service-detail', 'track'];
          render();
        } else if (id === 'trip-detail') {
          state.selectedTripId = state.selectedTripId || 'EXP-1101';
          state.tab = 'conductor';
          state.stack = ['conductor-home', 'trip-detail'];
          render();
        }
        break;
      }
      case 'start-passenger':
        switchTab('passenger');
        startTour('passenger');
        break;
      case 'start-conductor':
        switchTab('conductor');
        startTour('conductor');
        break;
      case 'enter-passenger':
        switchTab('passenger');
        showToast('Passenger home');
        break;
      case 'enter-conductor':
        switchTab('conductor');
        showToast('Conductor ETM');
        break;
      case 'reset-demo':
        resetStore();
        state.fromId = null;
        state.toId = null;
        state.pnr = '';
        state.selectedServiceId = null;
        state.selectedTripId = null;
        state.devPanelOpen = false;
        endTour();
        switchTab('passenger');
        showToast('Demo data reset');
        break;
      case 'show-flow':
        els.flowOverlay.classList.add('open');
        break;
      case 'hide-flow':
        els.flowOverlay.classList.remove('open');
        break;
      default:
        break;
    }
  }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;
    // Selects/inputs are handled via change/input to avoid closing on open
    if (
      action === 'set-from' ||
      action === 'set-to' ||
      action === 'set-pnr' ||
      el.tagName === 'SELECT' ||
      el.tagName === 'INPUT'
    ) {
      return;
    }
    e.preventDefault();
    onAction(action, el, e);
  });

  document.addEventListener('change', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    onAction(el.dataset.action, el, e);
  });

  document.addEventListener('input', (e) => {
    if (e.target.dataset.action === 'set-pnr') {
      state.pnr = e.target.value;
      // Update note + button without losing focus
      const can = canTrackWithPnr(state.pnr, { id: state.selectedServiceId });
      const note = $('.pnr-note');
      const btn = $('[data-action="track-bus"]');
      if (note) {
        note.classList.toggle('ok', can);
        note.textContent = can
          ? 'Booking confirmed — live track available for this service.'
          : 'Enter a confirmed PNR to unlock live track. Without confirmation, only line-up and availability are shown.';
      }
      if (btn) btn.disabled = !can;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (els.flowOverlay.classList.contains('open')) {
        els.flowOverlay.classList.remove('open');
        return;
      }
      if (els.modalRoot.classList.contains('open')) {
        closeModal();
        return;
      }
      if (state.devPanelOpen) {
        toggleDevPanel();
      }
    }
  });

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Public API for console / landing buttons
  window.SeatlyWireframe = {
    navigate,
    goBack,
    showModal,
    showToast,
    startTour,
    toggleDevPanel,
    switchTab,
    screens,
    state,
    resetStore,
  };

  // Boot
  setInterval(updateClock, 30000);
  render();
})();
