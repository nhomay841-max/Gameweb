const STORAGE_KEY = 'sweetie-bakery-save-v1';
const OPENING_MINUTE = 8 * 60;
const LAST_ORDER_MINUTE = 22 * 60 + 30;
const END_OF_DAY_MINUTE = 23 * 60 + 59;
const REAL_MS_PER_GAME_MINUTE = 1_000;
const CUSTOMER_PATIENCE_MS = 60_000;

const ingredients = [
  { id: 'flour', name: 'Bột mì', icon: '🌾', price: 10 },
  { id: 'sugar', name: 'Đường', icon: '🧂', price: 8 },
  { id: 'egg', name: 'Trứng', icon: '🥚', price: 12 },
  { id: 'milk', name: 'Sữa tươi', icon: '🥛', price: 15 },
  { id: 'strawberry', name: 'Dâu tây', icon: '🍓', price: 20 },
  { id: 'chocolate', name: 'Socola', icon: '🍫', price: 25 },
  { id: 'cream', name: 'Kem tươi', icon: '🍦', price: 18 },
  { id: 'butter', name: 'Bơ', icon: '🧈', price: 14 },
  { id: 'matcha', name: 'Matcha', icon: '🍵', price: 22 },
  { id: 'almond', name: 'Hạnh nhân', icon: '🌰', price: 17 }
];

const recipes = [
  { id: 'strawberry-cake', name: 'Bánh kem dâu', icon: '🍰', category: 'Bánh kem', price: 72, level: 1, ingredients: { flour: 2, egg: 2, milk: 1, strawberry: 3, cream: 1 } },
  { id: 'choco-cookie', name: 'Cookie socola', icon: '🍪', category: 'Bánh quy', price: 48, level: 1, ingredients: { flour: 2, sugar: 1, egg: 1, chocolate: 2, butter: 1 } },
  { id: 'cupcake', name: 'Cupcake vani', icon: '🧁', category: 'Bánh ngọt', price: 55, level: 1, ingredients: { flour: 2, sugar: 2, egg: 1, milk: 1, cream: 1 } },
  { id: 'croissant', name: 'Croissant bơ', icon: '🥐', category: 'Bánh mì', price: 50, level: 1, ingredients: { flour: 3, milk: 1, butter: 2, egg: 1 } },
  { id: 'matcha-roll', name: 'Bánh cuộn matcha', icon: '🍵', category: 'Bánh kem', price: 86, level: 2, ingredients: { flour: 2, sugar: 2, egg: 2, matcha: 2, cream: 1 } },
  { id: 'macaron', name: 'Macaron dâu', icon: '🍡', category: 'Bánh quy', price: 90, level: 2, ingredients: { sugar: 2, egg: 2, strawberry: 2, almond: 2, cream: 1 } },
  { id: 'egg-tart', name: 'Tart trứng', icon: '🥧', category: 'Bánh ngọt', price: 68, level: 2, ingredients: { flour: 2, egg: 2, milk: 1, sugar: 1, butter: 1 } },
  { id: 'choco-roll', name: 'Bánh cuộn socola', icon: '🍫', category: 'Bánh ngọt', price: 78, level: 2, ingredients: { flour: 2, sugar: 1, egg: 2, milk: 1, chocolate: 2 } },
  { id: 'milk-bread', name: 'Bánh mì sữa', icon: '🍞', category: 'Bánh mì', price: 58, level: 1, ingredients: { flour: 3, sugar: 1, egg: 1, milk: 2, butter: 1 } },
  { id: 'choco-cake', name: 'Bánh kem socola', icon: '🎂', category: 'Bánh kem', price: 110, level: 3, ingredients: { flour: 3, sugar: 2, egg: 2, chocolate: 3, cream: 2 } }
];

const customers = [
  { name: 'Mia', icon: '👩🏻', trait: 'cô nàng mê dâu', favorite: 'strawberry-cake' },
  { name: 'Ông Henry', icon: '👴🏻', trait: 'khách quen thích bánh truyền thống', favorite: 'croissant' },
  { name: 'Leo', icon: '👦🏻', trait: 'cậu bé mê đồ ngọt', favorite: 'cupcake' },
  { name: 'Linh', icon: '👩🏼', trait: 'cô bạn thích socola', favorite: 'choco-cookie' },
  { name: 'Bé Na', icon: '👧🏻', trait: 'khách hàng nhỏ tuổi', favorite: 'cupcake' }
];

const decorItems = [
  { id: 'flowers', name: 'Bình hoa cúc', icon: '💐', price: 90, charm: 1 },
  { id: 'plant', name: 'Chậu cây xinh', icon: '🪴', price: 120, charm: 1 },
  { id: 'lamp', name: 'Đèn thả mơ màng', icon: '🏮', price: 180, charm: 2 },
  { id: 'display', name: 'Tủ bánh gỗ sồi', icon: '🗄️', price: 250, charm: 2 }
];

const reviewReplies = {
  positive: [
    { text: 'Cảm ơn bạn đã yêu mến tiệm, hẹn gặp lại nhé!', change: 2 },
    { text: 'Cảm ơn bạn đã ghé thăm!', change: 1 },
    { text: 'Đánh giá của bạn không quan trọng.', change: -1 }
  ],
  neutral: [
    { text: 'Xin lỗi vì trải nghiệm chưa trọn vẹn, tiệm sẽ làm tốt hơn!', change: 2 },
    { text: 'Cảm ơn góp ý, chúng tôi sẽ cải thiện.', change: 1 },
    { text: 'Chắc do bạn khó tính thôi!', change: -2 }
  ],
  negative: [
    { text: 'Thành thật xin lỗi, lần sau tiệm sẽ phục vụ tốt hơn!', change: 2 },
    { text: 'Cảm ơn bạn đã góp ý, tiệm sẽ lưu tâm.', change: 1 },
    { text: 'Không hài lòng thì lần sau đừng quay lại.', change: -2 }
  ]
};

const initialState = () => ({
  coins: 220,
  level: 1,
  xp: 0,
  dayStarted: false,
  dayEnded: false,
  isPaused: false,
  dayStartSnapshot: null,
  gameMinute: OPENING_MINUTE,
  nextCustomerAt: OPENING_MINUTE + 30,
  shopName: 'Tiệm bánh nhỏ',
  rating: 1,
  reviewsResponded: 0,
  reviews: [],
  reviewSequence: 0,
  soundOn: false,
  inventory: { flour: 8, sugar: 6, egg: 6, milk: 4, strawberry: 4, chocolate: 4, cream: 3, butter: 3, matcha: 0, almond: 0 },
  baked: {},
  orders: [],
  ownedDecor: [],
  served: 0,
  revenue: 0,
  dailyServed: 0,
  dailyRevenue: 0,
  cakesMade: 0,
  missionClaimed: false,
  orderSequence: 0,
  date: 1
});

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialState();
    return normalizeState(JSON.parse(saved));
  } catch (error) {
    console.error('Không thể tải dữ liệu trò chơi SWEETIE:', error);
    return initialState();
  }
}

function normalizeState(parsed) {
  const fresh = initialState();
  const baked = { ...fresh.baked, ...(parsed.baked || {}) };
  Object.keys(baked).forEach((recipeId) => {
    if (typeof baked[recipeId] === 'number') {
      baked[recipeId] = Array.from({ length: baked[recipeId] }, () => ({ quality: 'Bình thường', bonus: 0 }));
    }
  });
  const loaded = {
    ...fresh,
    ...parsed,
    dayStarted: typeof parsed.dayStarted === 'boolean' ? parsed.dayStarted : true,
    dayEnded: Boolean(parsed.dayEnded),
    isPaused: Boolean(parsed.isPaused),
    dayStartSnapshot: parsed.dayStartSnapshot && typeof parsed.dayStartSnapshot === 'object' && !Array.isArray(parsed.dayStartSnapshot)
      ? parsed.dayStartSnapshot
      : null,
    gameMinute: Number.isFinite(parsed.gameMinute)
      ? Math.min(END_OF_DAY_MINUTE, Math.max(OPENING_MINUTE, parsed.gameMinute))
      : OPENING_MINUTE,
    nextCustomerAt: Number.isFinite(parsed.nextCustomerAt) ? parsed.nextCustomerAt : OPENING_MINUTE + 30,
    shopName: typeof parsed.shopName === 'string' && parsed.shopName.trim() ? parsed.shopName.trim().slice(0, 32) : fresh.shopName,
    rating: Number.isFinite(parsed.rating) ? Math.min(5, Math.max(0, parsed.rating)) : fresh.rating,
    inventory: { ...fresh.inventory, ...(parsed.inventory || {}) },
    baked,
    orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    reviews: Array.isArray(parsed.reviews) ? parsed.reviews : [],
    ownedDecor: Array.isArray(parsed.ownedDecor) ? parsed.ownedDecor : []
  };
  if (parsed.reviewsResponded === undefined) {
    loaded.reviewsResponded = loaded.reviews.filter((review) => review.responded).length;
  }
  if (parsed.dailyServed === undefined) loaded.dailyServed = loaded.served;
  if (parsed.dailyRevenue === undefined) loaded.dailyRevenue = loaded.revenue;
  loaded.orders.forEach((order) => {
    order.patienceMs = CUSTOMER_PATIENCE_MS;
    if (!Number.isFinite(order.patienceRemaining)) {
      order.patienceRemaining = Number.isFinite(order.expiresAt)
        ? Math.max(0, order.expiresAt - Date.now())
        : order.patienceMs;
    }
    order.patienceRemaining = Math.min(order.patienceRemaining, CUSTOMER_PATIENCE_MS);
  });
  loaded.isPaused = loaded.dayStarted && loaded.isPaused;
  if (!loaded.dayStartSnapshot && (loaded.dayStarted || loaded.dayEnded)) {
    loaded.dayStartSnapshot = makeDayStartSnapshot(loaded);
  }
  return loaded;
}

let state = loadState();
let selectedRecipe = null;
let bakeStartedAt = 0;
let bakeAnimation = null;
let toastTimeout = null;
let audioContext = null;
let currentTab = state.dayStarted ? 'shop' : 'welcome';
let bakeElapsedMs = 0;
let bakeLastTickAt = 0;
let lastClockTick = Date.now();
let lastSavedClockMinute = Math.floor(state.gameMinute);
let supabaseClient = null;
let signedInUserId = null;
let cloudSaveTimer = null;
let cloudSaveInFlight = false;
let cloudSavePromise = null;
let cloudSaveQueued = false;
let authIsRegistering = false;
let gameClockInterval = null;

const $ = (selector) => document.querySelector(selector);
const formatNumber = (number) => new Intl.NumberFormat('vi-VN').format(number);

function setAuthFeedback(message, isError = false) {
  const feedback = $('#authFeedback');
  feedback.textContent = message;
  feedback.classList.toggle('is-error', isError);
}

function setSyncStatus(message, isError = false) {
  const status = $('#accountEmailLabel');
  status.textContent = message;
  status.title = message;
  status.classList.toggle('sync-error', isError);
}

function showAuthGate(message = '') {
  $('#gameApp').hidden = true;
  $('#authGate').hidden = false;
  if (message) setAuthFeedback(message);
}

function enableGuestPlay(message) {
  $('#authForm').hidden = true;
  $('#authToggle').hidden = true;
  $('#guestPlayButton').classList.remove('hidden');
  setAuthFeedback(message);
}

function showGame(user) {
  $('#authGate').hidden = true;
  $('#gameApp').hidden = false;
  $('#accountEmailLabel').textContent = user?.email || 'Lưu trên thiết bị';
  $('#accountEmailLabel').title = user?.email || 'Tiến trình chỉ lưu trong trình duyệt này';
  $('#signOutButton').hidden = !user;
  currentTab = state.dayEnded ? 'welcome' : state.dayStarted ? 'shop' : 'welcome';
  lastClockTick = Date.now();
  lastSavedClockMinute = Math.floor(state.gameMinute);
  renderAll();
  if (!gameClockInterval) gameClockInterval = setInterval(tickGameClock, 250);
}

async function openPlayerSession(user) {
  signedInUserId = user.id;
  setAuthFeedback('Đang tải tiến trình tiệm bánh của bạn…');
  const { data, error } = await supabaseClient
    .from('player_saves')
    .select('save_data')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    signedInUserId = null;
    setAuthFeedback(`Không tải được tiến trình: ${error.message}. Hãy thử đăng nhập lại sau.`, true);
    return false;
  }

  let migratedLegacySave = false;
  try {
    if (data?.save_data && typeof data.save_data === 'object') {
      state = normalizeState(data.save_data);
    } else {
      const userSave = localStorage.getItem(`${STORAGE_KEY}:${user.id}`);
      const legacySave = userSave ? null : localStorage.getItem(STORAGE_KEY);
      const localSave = userSave || legacySave;
      state = localSave ? normalizeState(JSON.parse(localSave)) : initialState();
      migratedLegacySave = !userSave && Boolean(legacySave);
    }
  } catch (error) {
    signedInUserId = null;
    console.error('Không thể đọc tiến trình SWEETIE:', error);
    setAuthFeedback('Dữ liệu tiến trình bị lỗi định dạng. Hãy tải lại trang hoặc liên hệ người quản lý game.', true);
    return false;
  }

  if (state.dayStarted) state.isPaused = true;
  if (!data?.save_data) {
    const { error: saveError } = await supabaseClient
      .from('player_saves')
      .upsert({
        user_id: user.id,
        save_data: state,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
    if (saveError) {
      signedInUserId = null;
      setAuthFeedback(`Không thể tạo dữ liệu lưu: ${saveError.message}. Hãy kiểm tra cấu hình cơ sở dữ liệu.`, true);
      return false;
    }
    if (migratedLegacySave) localStorage.removeItem(STORAGE_KEY);
  }

  try {
    localStorage.setItem(`${STORAGE_KEY}:${user.id}`, JSON.stringify(state));
  } catch (error) {
    console.error('Không thể lưu bộ nhớ đệm SWEETIE:', error);
  }
  showGame(user);
  return true;
}

function queueCloudSave() {
  if (!signedInUserId || !supabaseClient) return;
  cloudSaveQueued = true;
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(flushCloudSave, 700);
}

async function flushCloudSave() {
  if (!signedInUserId) return false;
  if (cloudSaveInFlight) {
    await cloudSavePromise;
    return cloudSaveQueued ? flushCloudSave() : true;
  }
  if (!cloudSaveQueued) return true;
  cloudSaveQueued = false;
  cloudSaveInFlight = true;
  const userId = signedInUserId;
  const snapshot = JSON.parse(JSON.stringify(state));
  let error;
  cloudSavePromise = (async () => {
    const result = await supabaseClient
      .from('player_saves')
      .upsert({
        user_id: userId,
        save_data: snapshot,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
    error = result.error;
  })();
  try {
    await cloudSavePromise;
  } catch (syncError) {
    error = syncError;
  }
  cloudSavePromise = null;
  cloudSaveInFlight = false;
  if (error) {
    cloudSaveQueued = true;
    setSyncStatus('Lỗi đồng bộ — tiến trình vẫn lưu trên thiết bị', true);
    console.error('Không thể đồng bộ tiến trình SWEETIE:', error);
    return false;
  }
  if (userId === signedInUserId) setSyncStatus('Đã lưu lên tài khoản');
  return cloudSaveQueued ? flushCloudSave() : true;
}

async function initializeAccount() {
  const config = window.SWEETIE_SUPABASE_CONFIG;
  if (!config || !config.url || config.url.includes('YOUR-PROJECT-REF') ||
      !config.anonKey || config.anonKey.includes('YOUR_SUPABASE')) {
    enableGuestPlay('Chưa cấu hình Supabase. Chế độ khách lưu tiến trình riêng trên thiết bị; tài khoản và đồng bộ đám mây sẽ hoạt động sau khi cấu hình.');
    return;
  }
  if (!window.supabase?.createClient) {
    enableGuestPlay('Không tải được dịch vụ đăng nhập. Bạn có thể chơi khách và lưu riêng trên thiết bị này.');
    return;
  }

  supabaseClient = window.supabase.createClient(config.url, config.anonKey);
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    setAuthFeedback(`Không kiểm tra được phiên đăng nhập: ${error.message}`, true);
    return;
  }
  if (data.session) {
    await openPlayerSession(data.session.user);
    return;
  }
  setAuthFeedback('Đăng nhập hoặc tạo tài khoản để lưu game trên đám mây.');
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  if (!supabaseClient) {
    setAuthFeedback('Dịch vụ đăng nhập chưa được cấu hình.', true);
    return;
  }

  const submitButton = $('#authSubmit');
  submitButton.disabled = true;
  setAuthFeedback(authIsRegistering ? 'Đang tạo tài khoản…' : 'Đang đăng nhập…');
  const email = $('#authEmail').value.trim();
  const password = $('#authPassword').value;
  const result = authIsRegistering
    ? await supabaseClient.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.href }
    })
    : await supabaseClient.auth.signInWithPassword({ email, password });
  submitButton.disabled = false;

  if (result.error) {
    setAuthFeedback(result.error.message, true);
    return;
  }
  if (result.data.session) {
    await openPlayerSession(result.data.session.user);
    return;
  }
  setAuthFeedback('Tài khoản đã tạo. Hãy xác nhận email rồi đăng nhập để bắt đầu chơi.');
}

async function handleSignOut() {
  if (cloudSaveQueued || cloudSaveInFlight) {
    clearTimeout(cloudSaveTimer);
    if (!await flushCloudSave()) {
      showToast('Chưa đồng bộ được tiến trình. Hãy kiểm tra mạng rồi thử đăng xuất lại.');
      return;
    }
  }
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    showToast(`Không đăng xuất được: ${error.message}`);
    return;
  }
  signedInUserId = null;
  cloudSaveQueued = false;
  showAuthGate('Bạn đã đăng xuất an toàn.');
}

function saveState() {
  try {
    const key = signedInUserId ? `${STORAGE_KEY}:${signedInUserId}` : STORAGE_KEY;
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error('Không thể lưu tiến trình SWEETIE:', error);
    showToast('Không thể lưu trò chơi. Hãy kiểm tra dung lượng trình duyệt nhé.');
  }
  queueCloudSave();
}

function makeDayStartSnapshot(source) {
  const snapshot = JSON.parse(JSON.stringify(source));
  delete snapshot.dayStartSnapshot;
  snapshot.dayStarted = false;
  snapshot.dayEnded = false;
  snapshot.isPaused = false;
  snapshot.gameMinute = OPENING_MINUTE;
  snapshot.nextCustomerAt = OPENING_MINUTE + 30;
  snapshot.orders = [];
  snapshot.dailyServed = 0;
  snapshot.dailyRevenue = 0;
  return snapshot;
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2600);
}

async function playSound(kind = 'click') {
  if (!state.soundOn) return;
  const AudioContextType = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextType) {
    showToast('Trình duyệt này chưa hỗ trợ âm thanh trò chơi.');
    return;
  }
  try {
    audioContext = audioContext || new AudioContextType();
    if (audioContext.state === 'suspended') await audioContext.resume();
    const notes = kind === 'success' ? [660, 880] : kind === 'arrival' ? [523, 659] : [740];
    notes.forEach((frequency, index) => {
      const start = audioContext.currentTime + index * 0.11;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.12, start + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.21);
    });
  } catch (error) {
    console.error('Không thể phát âm thanh SWEETIE:', error);
    showToast('Không phát được âm thanh. Hãy thử bật lại âm thanh nhé.');
  }
}

function setActiveTab(tabId) {
  if (!state.dayStarted && ['shop', 'kitchen'].includes(tabId)) return;
  currentTab = tabId;
  document.querySelectorAll('.tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.tab === tabId));
  document.querySelectorAll('.view').forEach((view) => view.classList.toggle('active', view.id === `view-${tabId}`));
}

function renderNavigation() {
  document.querySelectorAll('.tab').forEach((tab) => {
    const locked = !state.dayStarted && ['shop', 'kitchen'].includes(tab.dataset.tab);
    tab.disabled = locked;
    tab.setAttribute('aria-disabled', String(locked));
  });
  if ((state.dayStarted && currentTab === 'welcome') || (state.dayEnded && currentTab !== 'reviews')) currentTab = state.dayEnded ? 'welcome' : 'shop';
  if (!state.dayStarted && ['shop', 'kitchen'].includes(currentTab)) currentTab = 'welcome';
  setActiveTab(currentTab);
}

function formatClock(gameMinute) {
  const totalMinutes = Math.floor(gameMinute);
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const hour12 = hour24 % 12 || 12;
  return `${String(hour12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${hour24 < 12 ? 'AM' : 'PM'}`;
}

function renderClock() {
  $('#gameClock').classList.toggle('hidden', !state.dayStarted && !state.dayEnded);
  $('#clockLabel').textContent = formatClock(state.gameMinute);
  $('#pauseButton').classList.toggle('hidden', !state.dayStarted);
  $('#replayDayButton').classList.toggle('hidden', !state.dayStarted && !state.dayEnded);
  $('#pauseButton').textContent = state.isPaused ? '▶ Tiếp tục' : '⏸ Tạm dừng';
  $('#pauseButton').setAttribute('aria-pressed', String(state.isPaused));
  const isClosed = state.dayStarted && state.gameMinute >= LAST_ORDER_MINUTE;
  $('#shopStatus').innerHTML = `<i></i> ${state.isPaused ? 'Đang tạm dừng' : isClosed ? 'Đã đóng cửa nhận khách' : 'Đang mở cửa'}`;
  $('#shopStatus').classList.toggle('closed', isClosed && !state.isPaused);
  $('#shopStatus').classList.toggle('paused', state.isPaused);
  $('#refreshOrders').disabled = isClosed || state.isPaused || !state.dayStarted;
  $('#refreshOrders').textContent = isClosed ? 'Đã đến giờ đóng cửa' : 'Gọi khách mới ↗';
  $('#clockStatus').textContent = state.isPaused
    ? 'Đã tạm dừng'
    : state.dayEnded
      ? 'Đã kết thúc ngày'
      : state.gameMinute >= LAST_ORDER_MINUTE
        ? 'Đã đóng cửa · Chờ hết ngày'
        : 'Mở 08:00 · Nhận khách đến 22:30';
}

function renderWelcome() {
  $('#daySummary').classList.toggle('hidden', !state.dayEnded);
  $('#welcomeShopNameForm').hidden = state.dayEnded;
  $('#welcomeTitle').textContent = state.dayEnded ? `Ngày ${state.date} đã khép lại` : 'Tiệm bánh của bạn đã sẵn sàng';
  $('#welcomeCopy').textContent = state.dayEnded
    ? 'Tiệm đã đóng cửa. Cùng nghỉ ngơi và chuẩn bị cho ngày mới nhé!'
    : 'Chưa cần vội mở cửa đâu! Bạn có thể nhập thêm nguyên liệu hoặc trang trí tiệm trước khi bắt đầu ngày đầu tiên.';
  $('#startDayButton').textContent = state.dayEnded ? `Bắt đầu ngày ${state.date + 1} · Mở cửa lúc 08:00 AM ✨` : 'Bắt đầu chơi · Mở cửa lúc 08:00 AM ✨';
  $('#daySummary').innerHTML = `<span>🌙</span><strong>Hôm nay tiệm phục vụ ${state.dailyServed} khách</strong><small>Doanh thu trong ngày: ${formatNumber(state.dailyRevenue)} xu · ${state.reviews.filter((review) => !review.responded).length} đánh giá đang chờ phản hồi</small>`;
}

function getIngredient(id) {
  return ingredients.find((item) => item.id === id);
}

function getRecipe(id) {
  return recipes.find((item) => item.id === id);
}

function getDecorCharm() {
  return state.ownedDecor.reduce((total, id) => total + (decorItems.find((item) => item.id === id)?.charm || 0), 0);
}

function unlockedRecipes() {
  return recipes.filter((recipe) => recipe.level <= state.level);
}

function renderHeader() {
  $('#coinLabel').textContent = formatNumber(state.coins);
  $('#levelLabel').textContent = `Cấp ${state.level}`;
  $('#dateLabel').textContent = `MỘT NGÀY MỚI Ở PHỐ BÁNH · NGÀY ${state.date}`;
  $('#subtitleText').textContent = state.dayStarted
    ? 'Mùi bánh thơm đang gọi những vị khách đầu tiên đến rồi!'
    : state.dayEnded ? 'Một ngày ngọt ngào nữa đang chờ bạn ở phía trước.'
      : 'Hãy chuẩn bị kho hàng và trang trí trước khi mở cửa nhé!';
  $('#shopName').textContent = state.shopName;
  $('#counterShopName').textContent = state.shopName;
  $('#shiftButton').classList.toggle('hidden', state.dayStarted);
  $('#shiftButton').textContent = state.dayEnded ? 'Bắt đầu ngày mới ✨' : 'Mở cửa tiệm ✨';
  $('#soundButton').setAttribute('aria-pressed', String(state.soundOn));
  $('#soundButton').setAttribute('aria-label', state.soundOn ? 'Tắt âm thanh' : 'Bật âm thanh');
  $('#soundButton').title = state.soundOn ? 'Tắt âm thanh' : 'Bật âm thanh';
  $('#soundButton').classList.toggle('sound-on', state.soundOn);
  renderClock();
  renderWelcome();
  renderRating();
}

function renderOrders() {
  const list = $('#ordersList');
  $('#orderCount').textContent = state.orders.length;
  $('#servedLabel').textContent = state.dailyServed;
  $('#revenueLabel').textContent = `+${formatNumber(state.dailyRevenue)} xu`;
  if (!state.dayStarted || !state.orders.length) {
    list.innerHTML = '<div class="empty-orders">Tiệm đang yên ắng quá... Hãy gọi một vị khách mới ghé chơi nhé! ☕</div>';
    $('#customerSpot').innerHTML = '💌<small>Đang chờ khách ghé...</small>';
    return;
  }
  $('#customerSpot').innerHTML = `${state.orders[0].customer.icon}<small>${state.orders.length} khách đang chờ!</small>`;
  list.innerHTML = state.orders.map((order) => {
    const recipe = getRecipe(order.recipeId);
    const count = state.baked[order.recipeId]?.length || 0;
    const ready = count > 0;
    const remaining = Math.max(0, order.patienceRemaining);
    const patiencePercent = Math.min(100, (remaining / order.patienceMs) * 100);
    const timeLabel = `${Math.floor(remaining / 60_000)}:${String(Math.ceil((remaining % 60_000) / 1000)).padStart(2, '0')}`;
    return `<article class="order-card">
      <div class="customer-avatar">${order.customer.icon}</div>
      <div class="order-info"><strong>${order.customer.name} <span style="font-weight:500;color:#a38e88">· ${order.customer.trait}</span></strong>
      <small>Muốn mua <b>${recipe.icon} ${recipe.name}</b>${order.special ? ' · Đơn hàng đặc biệt ✨' : ''}</small>
      <div class="patience-track ${patiencePercent < 25 ? 'urgent' : patiencePercent < 50 ? 'warning' : ''}" role="progressbar" aria-label="Thời gian chờ của ${order.customer.name}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(patiencePercent)}"><span style="width:${patiencePercent}%"></span></div>
      <small class="patience-label">${state.gameMinute >= LAST_ORDER_MINUTE ? '⏳ Có thể phục vụ đến 11:59 PM' : `⏳ Còn ${timeLabel} để phục vụ`}</small></div>
      <div class="order-reward">🪙 ${order.reward}<button data-serve="${order.id}" ${ready && !state.isPaused ? '' : 'disabled'}>${state.isPaused ? 'Tạm dừng' : ready ? 'Phục vụ' : 'Hết bánh'}</button></div>
    </article>`;
  }).join('');
  list.querySelectorAll('[data-serve]').forEach((button) => button.addEventListener('click', () => serveOrder(button.dataset.serve)));
}

function renderRating() {
  const stars = '★'.repeat(state.rating) + '☆'.repeat(5 - state.rating);
  $('#shopRating').textContent = stars;
  $('#ratingValue').textContent = `${state.rating.toFixed(1)}`;
  $('#ratingStars').textContent = stars;
  $('#ratingStars').setAttribute('aria-label', `${state.rating} trên 5 sao`);
  $('#ratingCount').textContent = `${state.reviewsResponded} đánh giá đã phản hồi`;
  const pending = state.reviews.filter((review) => !review.responded).length;
  $('#reviewCount').textContent = pending;
  $('#reviewCount').classList.toggle('hidden', pending === 0);
}

function renderReviews() {
  const list = $('#reviewsList');
  if (!state.reviews.length) {
    list.innerHTML = '<div class="empty-orders">Chưa có đánh giá nào. Hãy mở cửa tiệm và phục vụ những vị khách đầu tiên nhé! 💌</div>';
    return;
  }
  list.innerHTML = [...state.reviews].reverse().map((review) => {
    const sentiment = ['positive', 'neutral', 'negative'].includes(review.sentiment) ? review.sentiment : 'neutral';
    const options = reviewReplies[sentiment];
    return `<article class="review-card ${review.responded ? 'answered' : ''}">
      <div class="review-avatar">${review.customer.icon}</div>
      <div class="review-content"><div class="review-meta"><strong>${review.customer.name}</strong><span>${review.responded ? 'Đã phản hồi' : 'Đang chờ trả lời'}</span></div>
      <p class="review-comment">“${review.comment}”</p>
      ${review.responded
        ? `<div class="review-answer">Tiệm đã trả lời: “${review.response}” <strong class="${review.ratingChange > 0 ? 'rating-up' : 'rating-down'}">${review.ratingChange > 0 ? '+' : ''}${review.ratingChange} ⭐</strong></div>`
        : `<div class="reply-options">${options.map((option, index) => `<button class="reply-button ${option.change < 0 ? 'reply-negative' : ''}" data-review="${review.id}" data-reply="${index}">${option.text}<strong>${option.change > 0 ? '+' : ''}${option.change} ⭐</strong></button>`).join('')}</div>`}
      </div>
    </article>`;
  }).join('');
  list.querySelectorAll('[data-review]').forEach((button) => button.addEventListener('click', () => replyToReview(button.dataset.review, Number(button.dataset.reply))));
}

function replyToReview(id, optionIndex) {
  const review = state.reviews.find((item) => item.id === id && !item.responded);
  if (!review) return;
  const options = reviewReplies[review.sentiment] || reviewReplies.neutral;
  const option = options[optionIndex];
  if (!option) return;
  const previousRating = state.rating;
  state.rating = Math.min(5, Math.max(0, state.rating + option.change));
  review.responded = true;
  review.response = option.text;
  review.ratingChange = state.rating - previousRating;
  state.reviewsResponded += 1;
  saveState();
  renderAll();
  const change = state.rating - previousRating;
  showToast(change > 0
    ? `Cách trả lời khéo léo! Tiệm tăng ${change} sao, hiện có ${state.rating}/5 sao ⭐`
    : change < 0
      ? `Ôi, khách chưa hài lòng. Tiệm giảm ${Math.abs(change)} sao, còn ${state.rating}/5 sao.`
      : `Đã phản hồi đánh giá. Tiệm hiện có ${state.rating}/5 sao.`);
  playSound(change > 0 ? 'success' : 'click');
}

function createReview(order, sentiment, comment) {
  state.reviewSequence += 1;
  state.reviews.push({
    id: `review-${state.reviewSequence}`,
    customer: order.customer,
    sentiment,
    comment,
    responded: false
  });
  if (state.reviews.length > 30) {
    const oldestAnswered = state.reviews.findIndex((review) => review.responded);
    if (oldestAnswered >= 0) state.reviews.splice(oldestAnswered, 1);
  }
}

function startGame() {
  if (state.dayStarted) {
    setActiveTab('shop');
    return;
  }
  if (state.dayEnded) {
    state.date += 1;
    state.dailyServed = 0;
    state.dailyRevenue = 0;
  }
  state.dayStartSnapshot = makeDayStartSnapshot(state);
  state.orders = [];
  state.dayStarted = true;
  state.dayEnded = false;
  state.isPaused = false;
  state.gameMinute = OPENING_MINUTE;
  state.nextCustomerAt = OPENING_MINUTE + 30;
  currentTab = 'shop';
  lastClockTick = Date.now();
  saveState();
  renderAll();
  createOrder(true);
  showToast(`Ngày ${state.date} bắt đầu lúc 08:00 AM! Khách đầu tiên vừa ghé tiệm ♡`);
  playSound('success');
}

function replayDay() {
  if (!state.dayStartSnapshot || (!state.dayStarted && !state.dayEnded)) return;
  const confirmed = window.confirm(`Chơi lại ngày ${state.date}? Tiền, nguyên liệu, bánh, đánh giá và thành tích phát sinh trong ngày này sẽ được hoàn tác. Tiến trình từ trước ngày vẫn được giữ.`);
  if (!confirmed) return;

  const dayStartSnapshot = state.dayStartSnapshot;
  const shopName = state.shopName;
  const soundOn = state.soundOn;
  state = JSON.parse(JSON.stringify(dayStartSnapshot));
  state.dayStartSnapshot = dayStartSnapshot;
  state.shopName = shopName;
  state.soundOn = soundOn;
  state.dayStarted = true;
  state.dayEnded = false;
  state.isPaused = false;
  state.gameMinute = OPENING_MINUTE;
  state.nextCustomerAt = OPENING_MINUTE + 30;
  state.orders = [];
  currentTab = 'shop';
  selectedRecipe = null;
  bakeStartedAt = 0;
  bakeElapsedMs = 0;
  clearInterval(bakeAnimation);
  bakeAnimation = null;
  lastClockTick = Date.now();
  bakeLastTickAt = Date.now();
  lastSavedClockMinute = OPENING_MINUTE;
  saveState();
  renderAll();
  createOrder();
  showToast(`Ngày ${state.date} đã bắt đầu lại từ 08:00 AM. Tiến trình cửa hàng từ trước ngày vẫn được giữ.`);
}

function beginShopNameEdit() {
  $('#shopNameInput').value = state.shopName;
  $('#shopNameForm').hidden = false;
  $('#shopName').hidden = true;
  $('#editShopName').hidden = true;
  $('#shopNameInput').focus();
  $('#shopNameInput').select();
}

function cancelShopNameEdit() {
  $('#shopNameForm').hidden = true;
  $('#shopName').hidden = false;
  $('#editShopName').hidden = false;
}

function updateShopName(event) {
  event.preventDefault();
  const input = event.currentTarget.querySelector('input');
  const nextName = input.value.trim();
  if (!nextName) {
    showToast('Tên cửa hàng không thể để trống nhé.');
    input.focus();
    return;
  }
  state.shopName = nextName.slice(0, 32);
  saveState();
  if (event.currentTarget.id === 'shopNameForm') cancelShopNameEdit();
  else input.value = '';
  renderHeader();
  showToast(`Đã đổi tên tiệm thành “${state.shopName}” ♡`);
}

function renderMission() {
  const complete = state.cakesMade >= 1;
  $('#missionBar').style.width = complete ? '100%' : '0%';
  $('#missionCount').textContent = complete ? '1 / 1' : '0 / 1';
  if (complete && !state.missionClaimed) {
    state.missionClaimed = true;
    state.coins += 30;
    showToast('Hoàn thành nhiệm vụ đầu tiên! Bà gửi bạn 30 xu đó ✨');
    saveState();
  }
  $('#missionTitle').textContent = 'Mẻ bánh đầu tiên';
  $('#missionText').textContent = state.missionClaimed
    ? 'Đã hoàn thành · Bà tự hào về bạn!'
    : 'Hoàn thành một chiếc bánh bất kỳ';
  $('#missionCount').textContent = state.missionClaimed ? 'Hoàn thành ✓' : complete ? '1 / 1' : '0 / 1';
}

function renderKitchen() {
  const grid = $('#recipeGrid');
  grid.innerHTML = unlockedRecipes().map((recipe) => {
    const haveAll = Object.entries(recipe.ingredients).every(([id, amount]) => (state.inventory[id] || 0) >= amount);
    const ingredientText = Object.entries(recipe.ingredients).map(([id, amount]) => `${getIngredient(id).icon} ${amount}`).join('　');
    const bakedCount = state.baked[recipe.id]?.length || 0;
    return `<button class="recipe-card ${selectedRecipe === recipe.id ? 'selected' : ''}" data-recipe="${recipe.id}">
      <span class="recipe-art">${recipe.icon}</span><span class="recipe-copy"><strong>${recipe.name}</strong><small>${recipe.category} · ${ingredientText}</small><span>Giá bán ${recipe.price} xu　${bakedCount ? `· Có sẵn ${bakedCount}` : ''}</span>${haveAll ? '' : '<em>Thiếu nguyên liệu</em>'}</span>
    </button>`;
  }).join('');
  grid.querySelectorAll('[data-recipe]').forEach((button) => button.addEventListener('click', () => selectRecipe(button.dataset.recipe)));
  updateBakingCard();
}

function selectRecipe(id) {
  if (bakeStartedAt) {
    showToast('Mẻ bánh đang trong lò rồi, chờ thêm chút nhé!');
    return;
  }
  selectedRecipe = id;
  renderKitchen();
}

function updateBakingCard() {
  const recipe = getRecipe(selectedRecipe);
  const button = $('#bakeButton');
  if (!recipe) {
    $('#bakingTitle').textContent = 'Sẵn sàng vào bếp?';
    $('#bakingHint').textContent = 'Chọn một công thức bên trái để bắt đầu mẻ bánh thơm ngon nhé.';
    button.textContent = 'Chọn công thức trước nhé';
    button.disabled = true;
    return;
  }
  $('#bakingTitle').textContent = bakeStartedAt ? `Đang nướng ${recipe.name}...` : `Làm ${recipe.name}`;
  $('#bakingHint').textContent = state.isPaused
    ? 'Trò chơi đang tạm dừng. Tiếp tục khi bạn đã sẵn sàng nhé.'
    : bakeStartedAt ? 'Canh chiếc bánh vừa chín rồi nhấn lấy bánh nhé!' : `Cần ${Object.entries(recipe.ingredients).map(([id, n]) => `${n} ${getIngredient(id).name.toLowerCase()}`).join(', ')}.`;
  button.textContent = state.isPaused ? 'Đang tạm dừng' : bakeStartedAt ? 'Lấy bánh ra khỏi lò!' : '🥣 Bắt đầu làm bánh';
  button.disabled = state.isPaused;
}

function renderPantry() {
  $('#ingredientKinds').textContent = ingredients.length;
  $('#ingredientTotal').textContent = Object.values(state.inventory).reduce((sum, amount) => sum + amount, 0);
  $('#pantryCoins').textContent = `${formatNumber(state.coins)} xu`;
  $('#ingredientGrid').innerHTML = ingredients.map((item) => `
    <article class="ingredient-card"><span class="ingredient-icon">${item.icon}</span>
      <div class="ingredient-info"><strong>${item.name}</strong><small>Đang có: <b>${state.inventory[item.id] || 0}</b> · ${item.price} xu / 1</small></div>
      <button class="buy-button" data-buy="${item.id}">+5 · ${item.price * 5} xu</button>
    </article>`).join('');
  $('#ingredientGrid').querySelectorAll('[data-buy]').forEach((button) => button.addEventListener('click', () => buyIngredient(button.dataset.buy)));
}

function renderDecor() {
  $('#decorGrid').innerHTML = decorItems.map((item) => {
    const owned = state.ownedDecor.includes(item.id);
    return `<article class="decor-item ${owned ? 'owned' : ''}"><span>${item.icon}</span><strong>${item.name}</strong><small>+${item.charm} sức hút cho tiệm</small><button class="buy-button" data-decor="${item.id}" ${owned ? 'disabled' : ''}>${owned ? 'Đã sở hữu ✓' : `🪙 ${item.price} xu`}</button></article>`;
  }).join('');
  $('#decorGrid').querySelectorAll('[data-decor]').forEach((button) => button.addEventListener('click', () => buyDecor(button.dataset.decor)));

  const goal = [0, 5, 14, 30][Math.min(state.level - 1, 3)];
  const nextLevel = Math.min(state.level + 1, 4);
  const nextNames = ['', 'Tiệm bánh nổi tiếng', 'Tiệm bánh cao cấp', 'Thương hiệu bánh ngọt', 'Bạn đã chạm đến ước mơ!'];
  $('#upgradeTitle').textContent = nextNames[nextLevel];
  $('#upgradeDescription').textContent = state.level >= 4 ? 'Bạn đã xây dựng nên một thương hiệu bánh ngọt thật tuyệt vời!' : `Phục vụ ${goal - state.served > 0 ? goal - state.served : 0} khách nữa để mở khóa cấp ${nextLevel}.`;
  $('#upgradeButton').textContent = state.level >= 4 ? 'Đỉnh cao rồi! ✨' : state.served >= goal ? 'Nâng cấp miễn phí' : `${state.served} / ${goal} khách`;
  $('#upgradeButton').disabled = state.level >= 4 || state.served < goal;
  $('#upgradeButton').onclick = upgradeShop;
}

function renderAll() {
  renderMission();
  renderNavigation();
  renderHeader();
  renderOrders();
  renderKitchen();
  renderPantry();
  renderDecor();
  renderReviews();
}

function tickGameClock() {
  const now = Date.now();
  const elapsed = Math.min(now - lastClockTick, 1_000);
  lastClockTick = now;
  if (!state.dayStarted || state.isPaused) return;

  state.gameMinute = Math.min(END_OF_DAY_MINUTE, state.gameMinute + elapsed / REAL_MS_PER_GAME_MINUTE);
  state.orders.forEach((order) => {
    order.patienceRemaining = Math.max(0, order.patienceRemaining - elapsed);
  });
  expireOrders();

  if (state.gameMinute >= END_OF_DAY_MINUTE) {
    finishDay();
    return;
  }
  if (state.gameMinute < LAST_ORDER_MINUTE && state.gameMinute >= state.nextCustomerAt) {
    if (state.orders.length < 4) createOrder();
    else state.nextCustomerAt = state.gameMinute + 8;
  }

  renderClock();
  if (state.orders.length) renderOrders();
  if (Math.floor(state.gameMinute) !== lastSavedClockMinute) {
    lastSavedClockMinute = Math.floor(state.gameMinute);
    saveState();
  }
}

function missingIngredients(recipe) {
  return Object.entries(recipe.ingredients).filter(([id, amount]) => (state.inventory[id] || 0) < amount);
}

function startBaking() {
  if (state.isPaused || !state.dayStarted) return;
  const recipe = getRecipe(selectedRecipe);
  if (!recipe) return;
  if (bakeStartedAt) {
    finishBaking();
    return;
  }
  const missing = missingIngredients(recipe);
  if (missing.length) {
    const names = missing.map(([id]) => getIngredient(id).name).join(', ');
    showToast(`Kho mình đang thiếu ${names}. Ghé kho nhập thêm nhé!`);
    return;
  }
  Object.entries(recipe.ingredients).forEach(([id, amount]) => { state.inventory[id] -= amount; });
  bakeStartedAt = Date.now();
  bakeElapsedMs = 0;
  bakeLastTickAt = Date.now();
  $('#bakingMeter').classList.remove('hidden');
  $('#meterFill').style.width = '0%';
  $('#bakeButton').classList.add('baking-button');
  updateBakingCard();
  const duration = 4800;
  bakeAnimation = setInterval(() => {
    const now = Date.now();
    if (state.isPaused || !state.dayStarted) {
      bakeLastTickAt = now;
      return;
    }
    bakeElapsedMs += Math.min(now - bakeLastTickAt, 1000);
    bakeLastTickAt = now;
    const percent = Math.min(100, (bakeElapsedMs / duration) * 100);
    $('#meterFill').style.width = `${percent}%`;
    if (bakeElapsedMs >= duration) {
      clearInterval(bakeAnimation);
      bakeAnimation = null;
      finishBaking(true);
    }
  }, 50);
  showToast('Bánh đã vào lò! Canh lúc vừa chín để đạt điểm cao nha 🧁');
  saveState();
  renderPantry();
  renderKitchen();
}

function finishBaking(overbaked = false) {
  if (!bakeStartedAt || !selectedRecipe) return;
  if (state.isPaused || !state.dayStarted) return;
  const elapsed = bakeElapsedMs;
  const recipe = getRecipe(selectedRecipe);
  const distance = Math.abs(elapsed - 3000);
  const quality = overbaked ? 'Bình thường' : distance < 350 ? 'Hoàn hảo' : distance < 850 ? 'Xuất sắc' : distance < 1500 ? 'Ngon' : 'Bình thường';
  const bonus = { 'Bình thường': 0, 'Ngon': 8, 'Xuất sắc': 16, 'Hoàn hảo': 25 }[quality];
  state.baked[recipe.id] = state.baked[recipe.id] || [];
  state.baked[recipe.id].push({ quality, bonus });
  state.cakesMade += 1;
  state.xp += quality === 'Hoàn hảo' ? 18 : quality === 'Xuất sắc' ? 14 : 10;
  if (state.xp >= state.level * 100 && state.level < 4) {
    state.xp -= state.level * 100;
    state.level += 1;
    showToast(`Lên cấp ${state.level}! Công thức mới đã được mở khóa ✨`);
  } else {
    showToast(`${recipe.icon} ${recipe.name} hoàn thành · Chất lượng ${quality}${bonus ? ` · +${bonus} xu khi bán` : ''}!`);
  }
  bakeStartedAt = 0;
  bakeElapsedMs = 0;
  clearInterval(bakeAnimation);
  bakeAnimation = null;
  $('#bakingMeter').classList.add('hidden');
  selectedRecipe = null;
  saveState();
  renderAll();
}

function createOrder() {
  if (!state.dayStarted || state.isPaused || state.gameMinute >= LAST_ORDER_MINUTE) return;
  if (state.orders.length >= 4) {
    showToast('Khách đang chờ đông quá rồi! Phục vụ bớt khách trước nhé.');
    return;
  }
  const unlocked = unlockedRecipes();
  const customer = customers[Math.floor(Math.random() * customers.length)];
  let recipe = unlocked.find((item) => item.id === customer.favorite);
  if (!recipe || Math.random() > 0.6) recipe = unlocked[Math.floor(Math.random() * unlocked.length)];
  state.orderSequence += 1;
  const special = state.served >= 5 && Math.random() < 0.18;
  const charmBonus = Math.min(12, getDecorCharm() * 2);
  const patienceMs = CUSTOMER_PATIENCE_MS;
  state.orders.push({
    id: `order-${state.orderSequence}`,
    customer,
    recipeId: recipe.id,
    reward: recipe.price + charmBonus + (special ? 25 : 0),
    special,
    patienceMs,
    patienceRemaining: patienceMs
  });
  state.nextCustomerAt = Math.max(state.nextCustomerAt, state.gameMinute + 25 + Math.random() * 15);
  saveState();
  renderOrders();
  showToast(`${customer.name} vừa ghé tiệm, muốn mua ${recipe.name}!`);
  playSound('arrival');
}

function serveOrder(id) {
  if (!state.dayStarted || state.isPaused) return;
  const orderIndex = state.orders.findIndex((order) => order.id === id);
  if (orderIndex < 0) return;
  const order = state.orders[orderIndex];
  if (order.patienceRemaining <= 0) {
    expireOrders();
    return;
  }
  const bakedItems = state.baked[order.recipeId] || [];
  if (!bakedItems.length) {
    showToast('Mình chưa có món bánh này trong quầy!');
    return;
  }
  const bakedItem = bakedItems.shift();
  const payout = order.reward + bakedItem.bonus;
  const waitRatio = Math.max(0, order.patienceRemaining / order.patienceMs);
  const qualityRank = { 'Bình thường': 0, 'Ngon': 1, 'Xuất sắc': 2, 'Hoàn hảo': 3 }[bakedItem.quality] || 0;
  const sentiment = waitRatio > 0.55 && qualityRank >= 2 ? 'positive' : waitRatio > 0.22 ? 'neutral' : 'negative';
  const comments = {
    positive: 'Bánh ngon tuyệt, chủ tiệm phục vụ cũng rất dễ thương. Mình sẽ quay lại!',
    neutral: 'Bánh khá ổn, nhưng mình phải chờ hơi lâu. Mong lần sau nhanh hơn nhé.',
    negative: 'Mình chờ lâu quá mới được phục vụ. Tiệm cần cải thiện thời gian chờ rồi.'
  };
  createReview(order, sentiment, comments[sentiment]);
  state.coins += payout;
  state.revenue += payout;
  state.served += 1;
  state.dailyServed += 1;
  state.xp += 8;
  state.dailyRevenue += payout;
  state.orders.splice(orderIndex, 1);
  if (state.served >= 5 && state.level === 1) {
    showToast(`Đơn hàng đã giao! +${payout} xu · Tiệm mình bắt đầu nổi tiếng rồi!`);
  } else {
    showToast(`Đơn hàng đã giao! +${payout} xu · ${order.customer.name} rất vui ♡`);
  }
  saveState();
  renderAll();
  playSound('success');
  showToast(`${order.customer.name} đã để lại đánh giá mới. Ghé mục ⭐ Đánh giá tiệm bánh để trả lời nhé!`);
}

function expireOrders() {
  const expired = state.orders.filter((order) => order.patienceRemaining <= 0);
  if (!expired.length) return;
  const expiredIds = new Set(expired.map((order) => order.id));
  state.orders = state.orders.filter((order) => !expiredIds.has(order.id));
  expired.forEach((order) => {
    createReview(order, 'negative', 'Mình đã chờ rất lâu nhưng không được phục vụ. Tiệm nên chú ý khách hơn nhé.');
  });
  saveState();
  renderAll();
  showToast(`${expired.length > 1 ? `${expired.length} vị khách` : `${expired[0].customer.name}`} đã rời đi vì chờ lâu. Có đánh giá mới trong mục ⭐.`);
}

function finishDay() {
  if (!state.dayStarted) return;
  if (bakeStartedAt) finishBaking(true);
  const remainingCustomers = [...state.orders];
  state.orders = [];
  remainingCustomers.forEach((order) => {
    createReview(order, 'negative', 'Tiệm đã đóng cửa trước khi mình được phục vụ. Lần sau mong tiệm chuẩn bị tốt hơn.');
  });
  state.gameMinute = END_OF_DAY_MINUTE;
  state.dayStarted = false;
  state.dayEnded = true;
  state.isPaused = false;
  currentTab = 'welcome';
  saveState();
  renderAll();
  showToast(`Đã đến 11:59 PM · Ngày ${state.date} kết thúc. Cảm ơn bạn đã chăm sóc tiệm hôm nay!`);
  playSound('success');
}

function togglePause() {
  if (!state.dayStarted) return;
  state.isPaused = !state.isPaused;
  lastClockTick = Date.now();
  bakeLastTickAt = Date.now();
  saveState();
  renderAll();
  showToast(state.isPaused ? 'Đã tạm dừng thời gian và khách chờ.' : 'Tiếp tục một ngày ở SWEETIE nhé!');
}

function buyIngredient(id) {
  const item = getIngredient(id);
  const cost = item.price * 5;
  if (state.coins < cost) {
    showToast(`Chưa đủ xu rồi! Cần ${cost} xu để nhập ${item.name}.`);
    return;
  }
  state.coins -= cost;
  state.inventory[id] = (state.inventory[id] || 0) + 5;
  saveState();
  renderHeader();
  renderPantry();
  renderKitchen();
  showToast(`Đã nhập 5 ${item.name.toLowerCase()}!`);
}

function buyDecor(id) {
  const item = decorItems.find((entry) => entry.id === id);
  if (!item || state.ownedDecor.includes(id)) return;
  if (state.coins < item.price) {
    showToast(`Cần thêm ${item.price - state.coins} xu để mua ${item.name}.`);
    return;
  }
  state.coins -= item.price;
  state.ownedDecor.push(id);
  saveState();
  renderAll();
  showToast(`${item.icon} ${item.name} đã được đặt trong tiệm! Sức hút tăng rồi.`);
}

function upgradeShop() {
  const goals = [0, 5, 14, 30];
  if (state.level >= 4 || state.served < goals[state.level]) return;
  state.level += 1;
  state.coins += 100 * state.level;
  saveState();
  renderAll();
  showToast(`Chúc mừng! Tiệm đã lên cấp ${state.level}, bà gửi tặng ${100 * state.level} xu!`);
}

document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => setActiveTab(tab.dataset.tab)));
document.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => setActiveTab(button.dataset.go)));
document.querySelectorAll('[data-start-game]').forEach((button) => button.addEventListener('click', startGame));

$('#authForm').addEventListener('submit', handleAuthSubmit);
$('#guestPlayButton').addEventListener('click', () => {
  state = loadState();
  signedInUserId = null;
  showGame(null);
  showToast('Chế độ khách đang bật. Tiến trình chỉ lưu trên thiết bị này.');
});
$('#authToggle').addEventListener('click', () => {
  authIsRegistering = !authIsRegistering;
  $('#authTitle').textContent = authIsRegistering ? 'Tạo tài khoản chủ tiệm ♡' : 'Chào mừng chủ tiệm ♡';
  $('#authPassword').autocomplete = authIsRegistering ? 'new-password' : 'current-password';
  $('#authSubmit').textContent = authIsRegistering ? 'Tạo tài khoản' : 'Đăng nhập';
  $('#authToggle').textContent = authIsRegistering ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký';
  setAuthFeedback(authIsRegistering ? 'Dùng email thật để xác nhận tài khoản.' : 'Đăng nhập để tải tiến trình của bạn.');
});
$('#signOutButton').addEventListener('click', handleSignOut);

$('#bakeButton').addEventListener('click', startBaking);
$('#refreshOrders').addEventListener('click', createOrder);
$('#shiftButton').addEventListener('click', startGame);
$('#pauseButton').addEventListener('click', togglePause);
$('#replayDayButton').addEventListener('click', replayDay);
$('#editShopName').addEventListener('click', beginShopNameEdit);
$('#cancelShopName').addEventListener('click', cancelShopNameEdit);
$('#shopNameForm').addEventListener('submit', updateShopName);
$('#welcomeShopNameForm').addEventListener('submit', updateShopName);
$('#soundButton').addEventListener('click', () => {
  state.soundOn = !state.soundOn;
  saveState();
  renderHeader();
  if (state.soundOn) {
    playSound('success');
    showToast('Âm thanh đã bật ♫');
  } else {
    showToast('Âm thanh đã tắt');
  }
});
$('#resetButton').addEventListener('click', () => {
  if (!window.confirm('Bắt đầu lại từ đầu? Tiến trình tiệm bánh hiện tại sẽ bị xóa.')) return;
  if (signedInUserId) localStorage.removeItem(`${STORAGE_KEY}:${signedInUserId}`);
  else localStorage.removeItem(STORAGE_KEY);
  state = initialState();
  selectedRecipe = null;
  bakeStartedAt = 0;
  bakeElapsedMs = 0;
  currentTab = 'welcome';
  clearInterval(bakeAnimation);
  bakeAnimation = null;
  saveState();
  renderAll();
  showToast('Đã bắt đầu lại. Hãy chuẩn bị kho hàng và trang trí trước khi mở cửa nhé!');
});

initializeAccount();
