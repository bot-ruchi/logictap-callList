const calls = [
  {"id": 1, "name": "Anita Sharma", "status": "answered", "duration_secs": 137, "summary": "Booked a follow-up for Friday."},
  {"id": 2, "name": "Rahul Shah", "status": "failed", "duration_secs": 0, "summary": ""},
  {"id": 3, "name": null, "status": "answered", "duration_secs": 64, "summary": "Asked about clinic timings."},
  {"id": 4, "name": "Mohammed Irfan Abdul Rahman Siddiqui", "status": "answered", "duration_secs": 3725, "summary": "Called about his mother's knee surgery. Wanted to know the cost, how many days she would stay, whether insurance is accepted, what to bring on the day, and if the doctor could call him back personally before he decides. Asked the same questions again for his father."},
  {"id": 5, "name": "priya nair", "status": "no_answer", "duration_secs": 0, "summary": ""},
  {"id": 6, "name": "Deepak Verma", "status": "answered", "duration_secs": 212, "summary": "Said the doctor was \\<b>very\\</b> helpful."},
  {"id": 7, "name": "Sunita Rao", "status": "answered", "duration_secs": 59, "summary": "Rescheduled to Monday."},
  {"id": 7, "name": "Sunita Rao", "status": "answered", "duration_secs": 59, "summary": "Rescheduled to Monday."}
];

const list = document.querySelector('#call-list');
const searchInput = document.querySelector('#search-input');
const count = document.querySelector('#call-count');
const emptyState = document.querySelector('#empty-state');

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (hours) return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

function initials(name) {
  if (!name) return '—';
  return name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

function renderCalls() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const filteredCalls = calls.filter(call => (call.name ?? '').toLocaleLowerCase().includes(query));
  list.replaceChildren();
  count.textContent = filteredCalls.length;
  emptyState.hidden = filteredCalls.length !== 0;

  for (const call of filteredCalls) {
    const row = document.createElement('article');
    row.className = 'call-card';

    const heading = document.createElement('div');
    heading.className = 'card-heading';
    const caller = document.createElement('div');
    caller.className = 'caller';
    const avatar = document.createElement('span');
    avatar.className = 'avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = initials(call.name);
    const copy = document.createElement('div');
    copy.className = 'caller-copy';
    const name = document.createElement('p');
    name.className = 'caller-name';
    name.textContent = call.name ?? 'Unknown';
    const summary = document.createElement('p');
    summary.className = 'summary';
    summary.textContent = call.summary;
    copy.append(name, summary);
    caller.append(avatar, copy);

    const status = document.createElement('span');
    status.className = `status status--${call.status}`;
    status.textContent = call.status.replace('_', ' ');

    const footer = document.createElement('div');
    footer.className = 'card-footer';
    const durationLabel = document.createElement('span');
    durationLabel.className = 'duration-label';
    durationLabel.textContent = 'Duration';
    const duration = document.createElement('time');
    duration.className = 'duration';
    duration.dateTime = `PT${call.duration_secs}S`;
    duration.textContent = formatDuration(call.duration_secs);
    duration.setAttribute('aria-label', `${call.duration_secs} seconds`);

    heading.append(caller, status);
    footer.append(durationLabel, duration);
    row.append(heading, summary, footer);
    list.append(row);
  }
}

searchInput.addEventListener('input', renderCalls);
document.addEventListener('keydown', event => {
  if (event.key === '/' && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderCalls();
