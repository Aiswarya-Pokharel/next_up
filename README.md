<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>NextUp — README</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --bg: #0F1115;
    --surface: #171A21;
    --surface-2: #1D2129;
    --line: #2A2E38;
    --text: #E8E6E1;
    --muted: #8B8D98;
    --amber: #F2A93B;
    --orange: #FF6B4A;
    --teal: #4ECDC4;
    --radius: 10px;
  }

\*{ box-sizing: border-box; }

html,body{
margin:0;
padding:0;
background: var(--bg);
color: var(--text);
font-family: 'Inter', sans-serif;
line-height: 1.6;
}

body{
max-width: 920px;
margin: 0 auto;
padding: 0 28px 80px;
}

a{ color: var(--teal); text-decoration: none; }
a:hover{ text-decoration: underline; }

h1,h2,h3{
font-family: 'Space Grotesk', sans-serif;
font-weight: 600;
margin: 0;
}

code, .mono{
font-family: 'IBM Plex Mono', monospace;
}

/_ ---------- HERO / TERMINAL ---------- _/
.hero{
padding: 64px 0 40px;
}

.eyebrow{
font-family: 'IBM Plex Mono', monospace;
font-size: 12.5px;
color: var(--amber);
letter-spacing: 0.14em;
text-transform: uppercase;
margin-bottom: 18px;
display: flex;
align-items: center;
gap: 10px;
}

.eyebrow::before{
content: '';
width: 7px;
height: 7px;
border-radius: 50%;
background: var(--amber);
box-shadow: 0 0 0 4px rgba(242,169,59,0.15);
}

.hero h1{
font-size: 52px;
letter-spacing: -0.02em;
line-height: 1.05;
color: #fff;
}

.hero h1 span{
color: var(--orange);
}

.tagline{
margin-top: 16px;
font-size: 18px;
color: var(--muted);
max-width: 540px;
}

.badges{
margin-top: 24px;
display: flex;
gap: 8px;
flex-wrap: wrap;
}

.badge{
font-family: 'IBM Plex Mono', monospace;
font-size: 11.5px;
padding: 5px 10px;
border: 1px solid var(--line);
border-radius: 100px;
color: var(--muted);
background: var(--surface);
}

.terminal{
margin-top: 40px;
background: var(--surface);
border: 1px solid var(--line);
border-radius: var(--radius);
overflow: hidden;
box-shadow: 0 20px 60px -20px rgba(0,0,0,0.6);
}

.terminal-bar{
display: flex;
align-items: center;
gap: 8px;
padding: 12px 16px;
background: var(--surface-2);
border-bottom: 1px solid var(--line);
}

.dot{ width: 10px; height: 10px; border-radius: 50%; }
.dot.r{ background: #FF5F56; }
.dot.y{ background: #FFBD2E; }
.dot.g{ background: #27C93F; }

.terminal-title{
margin-left: 8px;
font-family: 'IBM Plex Mono', monospace;
font-size: 12px;
color: var(--muted);
}

.terminal-body{
padding: 20px 22px;
font-family: 'IBM Plex Mono', monospace;
font-size: 13.5px;
color: #C9C7C0;
}

.terminal-body .prompt{ color: var(--teal); }
.terminal-body .cmt{ color: var(--muted); }
.terminal-body .ok{ color: var(--amber); }
.terminal-body div{ margin-bottom: 6px; white-space: pre-wrap; }

/_ ---------- SECTIONS ---------- _/
section{
padding: 52px 0;
border-top: 1px solid var(--line);
}

.section-head{
display: flex;
align-items: baseline;
gap: 14px;
margin-bottom: 28px;
}

.section-num{
font-family: 'IBM Plex Mono', monospace;
font-size: 13px;
color: var(--muted);
}

section h2{
font-size: 26px;
color: #fff;
}

/_ Feature grid _/
.grid{
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 14px;
}

.card{
background: var(--surface);
border: 1px solid var(--line);
border-radius: var(--radius);
padding: 20px;
transition: border-color 0.2s ease, transform 0.2s ease;
}

.card:hover{
border-color: var(--orange);
transform: translateY(-2px);
}

.card .tag{
font-family: 'IBM Plex Mono', monospace;
font-size: 11px;
color: var(--teal);
text-transform: uppercase;
letter-spacing: 0.08em;
}

.card h3{
font-size: 16.5px;
margin: 8px 0 8px;
color: var(--text);
}

.card p{
margin: 0;
font-size: 14px;
color: var(--muted);
}

/_ Stack list _/
.stack-row{
display: grid;
grid-template-columns: 140px 1fr;
gap: 20px;
padding: 14px 0;
border-bottom: 1px solid var(--line);
align-items: start;
}
.stack-row:last-child{ border-bottom: none; }

.stack-label{
font-family: 'IBM Plex Mono', monospace;
font-size: 12.5px;
color: var(--amber);
text-transform: uppercase;
letter-spacing: 0.06em;
padding-top: 2px;
}

.stack-items{
display: flex;
flex-wrap: wrap;
gap: 8px;
}

.chip{
font-size: 13.5px;
background: var(--surface);
border: 1px solid var(--line);
padding: 6px 12px;
border-radius: 6px;
color: var(--text);
}

/_ Architecture flow _/
.flow{
display: flex;
align-items: center;
gap: 0;
flex-wrap: wrap;
margin-top: 8px;
}

.flow-box{
background: var(--surface);
border: 1px solid var(--line);
border-radius: var(--radius);
padding: 16px 18px;
min-width: 150px;
text-align: center;
}

.flow-box .k{
font-family: 'IBM Plex Mono', monospace;
font-size: 11px;
color: var(--muted);
text-transform: uppercase;
letter-spacing: 0.06em;
margin-bottom: 4px;
}
.flow-box .v{
font-size: 14.5px;
color: var(--text);
font-weight: 500;
}

.flow-arrow{
color: var(--orange);
font-family: 'IBM Plex Mono', monospace;
padding: 0 14px;
font-size: 18px;
}

/_ Setup steps _/
.steps{
display: flex;
flex-direction: column;
gap: 0;
}

.step{
display: grid;
grid-template-columns: 34px 1fr;
gap: 16px;
padding: 18px 0;
border-bottom: 1px solid var(--line);
}
.step:last-child{ border-bottom: none; }

.step-num{
font-family: 'IBM Plex Mono', monospace;
color: var(--orange);
font-size: 14px;
font-weight: 600;
padding-top: 3px;
}

.step h3{
font-size: 15.5px;
margin: 0 0 8px;
color: var(--text);
}

pre{
background: var(--surface-2);
border: 1px solid var(--line);
border-radius: 8px;
padding: 12px 14px;
overflow-x: auto;
font-family: 'IBM Plex Mono', monospace;
font-size: 13px;
color: #C9C7C0;
margin: 4px 0 0;
}

/_ Roadmap _/
.roadmap-item{
display: flex;
gap: 14px;
align-items: flex-start;
padding: 12px 0;
}

.check{
width: 20px;
height: 20px;
border-radius: 5px;
border: 1.5px solid var(--line);
flex-shrink: 0;
margin-top: 2px;
position: relative;
}
.check.done{
background: var(--teal);
border-color: var(--teal);
}
.check.done::after{
content: '✓';
position: absolute;
inset: 0;
display: flex;
align-items: center;
justify-content: center;
font-size: 12px;
color: #0F1115;
font-weight: 700;
}
.check.pending::after{
content: '';
}

.roadmap-text{ font-size: 14.5px; color: var(--text); }
.roadmap-text.muted{ color: var(--muted); }

footer{
padding-top: 48px;
border-top: 1px solid var(--line);
margin-top: 20px;
font-size: 13px;
color: var(--muted);
font-family: 'IBM Plex Mono', monospace;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
gap: 10px;
}

@media (max-width: 640px){
.hero h1{ font-size: 38px; }
.grid{ grid-template-columns: 1fr; }
.stack-row{ grid-template-columns: 1fr; gap: 8px; }
.flow{ flex-direction: column; align-items: stretch; }
.flow-arrow{ text-align: center; padding: 8px 0; transform: rotate(90deg); }
}
</style>

</head>
<body>

  <div class="hero">
    <div class="eyebrow">status: actively maintained</div>
    <h1>Next<span>Up</span></h1>
    <p class="tagline">A full-stack task and habit platform that plans your day, nudges your streaks, and reminds you before you forget — not after.</p>
    <div class="badges">
      <span class="badge">Django REST Framework</span>
      <span class="badge">React + Vite</span>
      <span class="badge">PostgreSQL</span>
      <span class="badge">Groq AI</span>
      <span class="badge">Docker</span>
    </div>

    <div class="terminal">
      <div class="terminal-bar">
        <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
        <span class="terminal-title">nextup — zsh</span>
      </div>
      <div class="terminal-body">
        <div><span class="prompt">$</span> git clone https://github.com/your-username/nextup.git</div>
        <div><span class="prompt">$</span> docker compose up --build</div>
        <div><span class="cmt">// backend on :8000, frontend on :5173, postgres healthy</span></div>
        <div><span class="ok">✓</span> NextUp is running. Go build your day.</div>
      </div>
    </div>

  </div>

  <section id="features">
    <div class="section-head">
      <span class="section-num">01</span>
      <h2>What it does</h2>
    </div>
    <div class="grid">
      <div class="card">
        <div class="tag">AI Suggestions</div>
        <h3>Groq-powered task planning</h3>
        <p>Describe what's on your plate and get structured, prioritized task suggestions back in seconds.</p>
      </div>
      <div class="card">
        <div class="tag">Habits</div>
        <h3>Presets backed by real data</h3>
        <p>A Kaggle-sourced habit dataset seeds sensible starting points instead of a blank text field.</p>
      </div>
      <div class="card">
        <div class="tag">Nudges</div>
        <h3>Consistency check-ins</h3>
        <p>A scheduled command reviews your week and uses AI to write a nudge only when you actually need one.</p>
      </div>
      <div class="card">
        <div class="tag">Reminders</div>
        <h3>Email that lands on time</h3>
        <p>Gmail SMTP delivery via a dedicated management command, so due dates don't slide by quietly.</p>
      </div>
      <div class="card">
        <div class="tag">Analytics</div>
        <h3>Heatmaps of real progress</h3>
        <p>See consistency at a glance instead of digging through a task list to guess how the week went.</p>
      </div>
      <div class="card">
        <div class="tag">Sessions</div>
        <h3>Auth that doesn't interrupt you</h3>
        <p>Rotating JWT refresh handled centrally, with deduplicated refresh calls so you're never logged out mid-task.</p>
      </div>
    </div>
  </section>

  <section id="stack">
    <div class="section-head">
      <span class="section-num">02</span>
      <h2>Tech stack</h2>
    </div>
    <div class="stack-row">
      <div class="stack-label">Backend</div>
      <div class="stack-items">
        <span class="chip">Django</span>
        <span class="chip">Django REST Framework</span>
        <span class="chip">SimpleJWT</span>
        <span class="chip">PostgreSQL</span>
      </div>
    </div>
    <div class="stack-row">
      <div class="stack-label">Frontend</div>
      <div class="stack-items">
        <span class="chip">React</span>
        <span class="chip">Vite</span>
        <span class="chip">Tailwind CSS</span>
      </div>
    </div>
    <div class="stack-row">
      <div class="stack-label">AI / Data</div>
      <div class="stack-items">
        <span class="chip">Groq API</span>
        <span class="chip">Kaggle dataset (habit presets)</span>
      </div>
    </div>
    <div class="stack-row">
      <div class="stack-label">Infra</div>
      <div class="stack-items">
        <span class="chip">Docker Compose</span>
        <span class="chip">GitHub Actions CI/CD</span>
        <span class="chip">Gmail SMTP</span>
      </div>
    </div>
  </section>

  <section id="architecture">
    <div class="section-head">
      <span class="section-num">03</span>
      <h2>How it fits together</h2>
    </div>
    <div class="flow">
      <div class="flow-box">
        <div class="k">Client</div>
        <div class="v">React / Vite</div>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-box">
        <div class="k">API</div>
        <div class="v">DRF + JWT</div>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-box">
        <div class="k">Data</div>
        <div class="v">PostgreSQL</div>
      </div>
      <div class="flow-arrow">→</div>
      <div class="flow-box">
        <div class="k">Jobs</div>
        <div class="v">Reminders · Nudges</div>
      </div>
    </div>
  </section>

  <section id="setup">
    <div class="section-head">
      <span class="section-num">04</span>
      <h2>Getting started</h2>
    </div>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div>
          <h3>Clone and configure</h3>
          <pre>git clone https://github.com/your-username/nextup.git
cd nextup
cp .env.example .env</pre>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div>
          <h3>Set your secrets</h3>
          <pre>DATABASE_URL=postgres://user:pass@db:5432/nextup
GROQ_API_KEY=your_groq_key
EMAIL_HOST_USER=your_gmail@gmail.com
EMAIL_HOST_PASSWORD=your_app_password</pre>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div>
          <h3>Run the stack</h3>
          <pre>docker compose up --build</pre>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div>
          <h3>Open it</h3>
          <pre>Frontend  → http://localhost:5173
API       → http://localhost:8000/api</pre>
        </div>
      </div>
    </div>
  </section>

  <section id="roadmap">
    <div class="section-head">
      <span class="section-num">05</span>
      <h2>Roadmap</h2>
    </div>
    <div class="roadmap-item">
      <div class="check done"></div>
      <div class="roadmap-text">Dockerize the main app and the companion reminder API</div>
    </div>
    <div class="roadmap-item">
      <div class="check done"></div>
      <div class="roadmap-text">CI pipeline via GitHub Actions</div>
    </div>
    <div class="roadmap-item">
      <div class="check pending"></div>
      <div class="roadmap-text muted">Multi-project Compose stack running cleanly side by side</div>
    </div>
    <div class="roadmap-item">
      <div class="check pending"></div>
      <div class="roadmap-text muted">Push notifications alongside email reminders</div>
    </div>
  </section>

  <footer>
    <span>NextUp · built with Django &amp; React</span>
    <span>MIT License</span>
  </footer>

</body>
</html>
