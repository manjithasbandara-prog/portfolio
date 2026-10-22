import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, FormEvent, ReactNode } from 'react'
import {
  ArrowDown, ArrowUpRight, ChevronRight, CircleUserRound, Command, Cpu,
  Github, GraduationCap, Layers3, Mail, Menu, Network as NetworkIcon, Radio, Send, Terminal,
  X, Zap,
} from 'lucide-react'

type Chapter = { id: string; label: string; number: string }
type Project = { name: string; type: string; description: string; stack: string[]; url: string; accent: string }

const chapters: Chapter[] = [
  { id: 'identity', label: 'IDENTITY', number: '01' },
  { id: 'network', label: 'NETWORK', number: '02' },
  { id: 'arsenal', label: 'ARSENAL', number: '03' },
  { id: 'archive', label: 'ARCHIVE', number: '04' },
  { id: 'journey', label: 'JOURNEY', number: '05' },
  { id: 'contact', label: 'CONTACT', number: '06' },
]

const projects: Project[] = [
  {
    name: 'ANDROID USER DIRECTORY',
    type: 'DATABASE CONNECTION // 001',
    description: 'An Android Studio project exploring user directory flows and database connectivity. Visit the repository for the source and implementation details.',
    stack: ['Android Studio', 'Java', 'Database'],
    url: 'https://github.com/manjithasbandara-prog/Android-Studio-DataBase-Connection',
    accent: '#00ff41',
  },
  {
    name: "MUSTANG '67",
    type: 'SCROLLABLE WEBSITE // 002',
    description: 'An automotive-inspired scrolling web experiment focused on motion, composition, and a tactile browsing experience.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://github.com/manjithasbandara-prog/scrollable-website-test',
    accent: '#ffb000',
  },
]

const skills = {
  PROGRAMMING: ['JavaScript', 'C', 'Java', 'Python', 'Laravel'],
  NETWORKING: ['Cisco Networking', 'Network Technology', 'Network Planning', 'Linux', 'Ubuntu'],
  SECURITY: ['VAPT', 'Nessus', 'Nmap', 'Metasploit'],
  'DEVELOPMENT & AI': ['Web Development', 'Mobile Apps', 'AI-Assisted Development', 'Vibe Coding', 'Apache Tomcat'],
}

function MatrixCanvas({ active = true }: { active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let frame = 0
    let columns = 0
    let drops: number[] = []
    const chars = '01アイウエオ<>/{}[]$#'
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      columns = Math.ceil(window.innerWidth / 18)
      drops = Array.from({ length: columns }, () => Math.random() * -40)
    }
    const draw = () => {
      ctx.fillStyle = 'rgba(2, 4, 3, 0.085)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.font = '11px IBM Plex Mono, monospace'
      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = i % 7 === 0 ? 'rgba(0,255,65,.32)' : 'rgba(0,184,46,.12)'
        ctx.fillText(char, i * 18, drops[i] * 18)
        if (drops[i] * 18 > window.innerHeight && Math.random() > .975) drops[i] = 0
        drops[i] += .48
      }
      frame = requestAnimationFrame(draw)
    }
    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [active])
  return <canvas aria-hidden="true" ref={canvasRef} className="matrix-canvas" />
}

function Monogram({ small = false }: { small?: boolean }) {
  return <div className={`monogram ${small ? 'monogram-small' : ''}`} aria-label="MJ_SAYURU logo">
    <span>M</span><i>J</i>
  </div>
}

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [skipped, setSkipped] = useState(false)
  useEffect(() => {
    const started = Date.now()
    const timer = window.setInterval(() => {
      const next = Math.min(100, Math.round(((Date.now() - started) / 2600) * 100))
      setProgress(next)
      if (next === 100) { window.clearInterval(timer); window.setTimeout(onComplete, 480) }
    }, 50)
    return () => window.clearInterval(timer)
  }, [onComplete])
  if (skipped) return null
  const lines = ['INITIALIZING PROJECT ZERO...', 'LOADING NETWORK PROTOCOLS...', 'ESTABLISHING CONNECTION...', 'DECRYPTING IDENTITY...', 'USER DETECTED: MJ_SAYURU']
  return <div className="boot-screen">
    <div className="boot-grid" />
    <div className="boot-terminal">
      <div className="boot-brand"><Monogram /><span>PROJECT ZERO <small>// SECURE BOOT</small></span></div>
      <div className="boot-lines">{lines.map((line, index) => <div key={line} className={progress > index * 18 ? 'visible' : ''}><b>{progress > index * 18 ? '>' : '·'}</b> {line}</div>)}</div>
      <div className="boot-status"><span>AUTHORIZATION {progress === 100 ? 'COMPLETE' : 'IN PROGRESS'}</span><span>{progress}%</span></div>
      <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
      <button className="skip-button" onClick={() => { setSkipped(true); onComplete() }}>SKIP INTRO <ChevronRight size={14} /></button>
    </div>
  </div>
}

function Navigation({ onTerminal, onNavigate }: { onTerminal: () => void; onNavigate: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  return <header className="nav">
    <a className="brand" href="#top"><Monogram small /><span>PROJECT ZERO<small>MJ_SAYURU / ONLINE</small></span></a>
    <button className="mobile-menu" aria-label="Open menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav-links open' : 'nav-links'}>
      {chapters.map(chapter => <button key={chapter.id} onClick={() => { onNavigate(chapter.id); setOpen(false) }}><em>{chapter.number}</em>{chapter.label}</button>)}
      <button className="terminal-trigger" onClick={onTerminal}><Terminal size={15} /> TERMINAL</button>
    </nav>
  </header>
}

function Hero({ onExplore, onCv }: { onExplore: () => void; onCv: () => void }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  return <section id="top" className="hero" onMouseMove={event => setPointer({ x: (event.clientX / window.innerWidth - .5) * 18, y: (event.clientY / window.innerHeight - .5) * 12 })}>
    <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
    <div className="hero-copy">
      <div className="eyebrow"><span className="status-dot" /> SYSTEM ONLINE <span className="eyebrow-line" /> 06.23.2002 // LK</div>
      <h1>HELLO,<br /><span>WORLD.</span></h1>
      <p className="hero-name">I'M <strong>MJ_SAYURU</strong><span className="cursor">_</span></p>
      <p className="hero-role">W M M S BANDARA</p>
      <p className="hero-intro">NETWORK TECHNOLOGY UNDERGRADUATE<br />CYBERSECURITY ENTHUSIAST <span>//</span> BUILDER</p>
      <div className="hero-actions"><button className="button-primary" onClick={onExplore}>INITIALIZE EXPLORATION <ArrowDown size={16} /></button><button className="button-ghost" onClick={onCv}>ACCESS MY CV <ArrowUpRight size={16} /></button></div>
    </div>
    <div className="avatar-wrap" style={{ transform: `translate(${pointer.x}px, ${pointer.y}px)` }}>
      <div className="avatar-ring ring-a" /><div className="avatar-ring ring-b" /><div className="avatar-core"><div className="avatar-grid" /><div className="avatar-head" /><div className="avatar-shoulder" /><div className="avatar-scan" /></div>
      <span className="avatar-label label-a">IDENTITY // 001</span><span className="avatar-label label-b">NO SIGNAL / ALL SIGNAL</span>
    </div>
    <div className="hero-meta"><span>LAT 07° 17' N</span><span>LONG 80° 38' E</span><span>SCROLL TO ENTER THE SYSTEM <ArrowDown size={14} /></span></div>
  </section>
}

function ChapterHeader({ number, kicker, title, copy }: { number: string; kicker: string; title: ReactNode; copy: string }) {
  return <div className="chapter-header"><div className="eyebrow"><span>{number}</span><span className="eyebrow-line" />{kicker}</div><h2>{title}</h2><p>{copy}</p></div>
}

function Identity() {
  return <section id="identity" className="section identity-section"><ChapterHeader number="01 //" kicker="DIGITAL IDENTITY" title={<>THE HUMAN<br /><span>BEHIND THE SIGNAL.</span></>} copy="A third-year BICT undergraduate decoding the space between people, technology, and the networks that connect them." />
    <div className="identity-layout"><div className="id-card"><div className="id-card-top"><span>CLASSIFIED // IDENTITY FILE</span><span>001 / 006</span></div><Monogram /><div className="id-card-name">W M M S<br /><strong>Bandara</strong></div><div className="id-card-foot"><span>ALIAS // MJ_SAYURU</span><span>STATUS // LEARNING</span></div></div>
      <div className="identity-copy"><p className="terminal-label">ROOT@PROJECT_ZERO:~$ cat /about.txt</p><p>I'm a third-year Bachelor of Information and Communication Technology undergraduate at South Eastern University of Sri Lanka, majoring in Network Technology.</p><p>Driven by a passion for technology, I explore network engineering, cybersecurity, software development, and emerging AI technologies. I enjoy experimenting with new tools, building practical solutions, and expanding my technical knowledge.</p><div className="data-points"><div><span>LOCATION</span><b>SRI LANKA</b></div><div><span>UNIVERSITY</span><b>SEUSL</b></div><div><span>GRADUATION</span><b>2028 / EXPECTED</b></div></div></div></div>
  </section>
}

function Network() {
  const [selected, setSelected] = useState('ROUTER_01')
  const [sent, setSent] = useState(false)
  const nodes = ['FIREWALL', 'ROUTER_01', 'SWITCH_A', 'SERVER_01', 'WORKSTATION']
  return <section id="network" className="section network-section"><ChapterHeader number="02 //" kicker="THE NETWORK" title={<>EVERYTHING<br /><span>IS CONNECTED.</span></>} copy="A simulated topology inspired by the systems I study. Explore a safe, educational map of how signals move." />
    <div className="network-stage"><div className="network-lines"><span className="line l1" /><span className="line l2" /><span className="line l3" /><span className="line l4" /></div>{nodes.map((node, i) => <button key={node} className={`network-node node-${i} ${selected === node ? 'selected' : ''}`} onClick={() => setSelected(node)}><span className="node-pulse" /><span>{node}</span></button>)}<div className="packet packet-one" /><div className="packet packet-two" /><div className="network-core"><NetworkIcon size={28} /><span>CORE</span></div></div>
    <div className="network-info"><div><span className="terminal-label">NODE INSPECTOR // SIMULATED</span><h3>{selected}</h3><p><b>DEVICE TYPE:</b> {selected === 'ROUTER_01' ? 'ROUTER' : 'NETWORK ENDPOINT'}</p><p><b>FUNCTION:</b> {selected === 'ROUTER_01' ? 'CONNECTS MULTIPLE NETWORKS' : 'SECURE DATA TRANSMISSION'}</p><p className="online"><span className="status-dot" /> STATUS: ONLINE</p></div><button className="button-primary packet-button" onClick={() => { setSent(false); window.setTimeout(() => setSent(true), 900) }}><Send size={15} /> SEND SIMULATED PACKET</button>{sent && <span className="delivery">✓ PACKET DELIVERED // 0.04ms</span>}</div>
  </section>
}

function Arsenal() {
  const [category, setCategory] = useState<keyof typeof skills>('PROGRAMMING')
  return <section id="arsenal" className="section arsenal-section"><ChapterHeader number="03 //" kicker="TECHNICAL ARSENAL" title={<>THE<br /><span>ARSENAL.</span></>} copy="Tools are only useful when paired with curiosity. These are the technologies I am actively exploring and using." />
    <div className="arsenal-layout"><div className="skill-selector">{Object.keys(skills).map((key, i) => <button className={category === key ? 'active' : ''} key={key} onClick={() => setCategory(key as keyof typeof skills)}><span>0{i + 1}</span>{key}<ChevronRight size={15} /></button>)}</div><div className="skill-module"><div className="module-orbit"><Cpu size={34} /><span>MODULE<br />ACTIVE</span></div><div className="skill-list">{skills[category].map((skill, i) => <div key={skill}><span>0{i + 1}</span><b>{skill}</b><i><span style={{ width: `${62 + i * 7}%` }} /></i></div>)}</div><p className="terminal-label">SELECT_MODULE --{category.replace(/ /g, '_')}</p></div></div>
  </section>
}

function Archive() {
  const [active, setActive] = useState(0)
  const project = projects[active]
  return <section id="archive" className="section archive-section"><ChapterHeader number="04 //" kicker="PROJECT ARCHIVE" title={<>THINGS I'VE<br /><span>BUILT.</span></>} copy="A small archive of experiments and systems. Each one is a checkpoint, not a finish line." />
    <div className="project-tabs">{projects.map((item, i) => <button key={item.name} onClick={() => setActive(i)} className={active === i ? 'active' : ''}><span>0{i + 1}</span>{item.name}</button>)}</div>
    <div className="project-feature"><div className="project-visual" style={{ '--project-accent': project.accent } as CSSProperties}><div className="visual-noise" /><div className="project-device">{active === 0 ? <><div className="device-top">ANDROID // DATABASE</div><div className="device-screen"><CircleUserRound size={38} /><span>USER_DIRECTORY</span><i /><i /><i /></div></> : <><div className="device-top">MUSTANG // 1967</div><div className="car-shape"><span /></div><div className="road-line" /></>}</div><span className="visual-coordinates">PROJECT_{String(active + 1).padStart(2, '0')} / ARCHIVE</span></div><div className="project-detail"><span className="terminal-label">{project.type}</span><h3>{project.name}</h3><p>{project.description}</p><div className="stack-list">{project.stack.map(item => <span key={item}>{item}</span>)}</div><a className="button-primary inline-button" href={project.url} target="_blank" rel="noreferrer">OPEN REPOSITORY <Github size={15} /></a></div></div>
  </section>
}

function Journey() {
  return <section id="journey" className="section journey-section"><ChapterHeader number="05 //" kicker="SYSTEM HISTORY" title={<>THE JOURNEY<br /><span>SO FAR.</span></>} copy="Every milestone adds another layer to the system. Future states remain targets, not claims." /><div className="timeline">{[['2008—2013', 'PRIMARY EDUCATION', 'BMV, Nittambuwa'], ['2013—2021', 'DEFENCE SERVICES COLLEGE', 'G.C.E. Ordinary Level // ICT — A'], ['2021', 'G.C.E. ADVANCED LEVEL', 'Science for Technology — B // Engineering Technology — C // ICT — C'], ['2023', 'UNIVERSITY INITIALIZED', 'BICT // Network Technology // South Eastern University of Sri Lanka'], ['2028', 'EXPECTED GRADUATION', 'Target state // Bachelor of Information and Communication Technology']].map(([year, title, detail], i) => <div className="timeline-item" key={year}><div className="timeline-year">{year}</div><div className="timeline-node"><span /></div><div><span className="terminal-label">MILESTONE_0{i + 1}</span><h3>{title}</h3><p>{detail}</p></div></div>)}</div></section>
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'error'>('idle')
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setStatus('error') }
  return <section id="contact" className="section contact-section"><ChapterHeader number="06 //" kicker="ESTABLISH CONNECTION" title={<>LET'S BUILD<br /><span>SOMETHING.</span></>} copy="Have a system worth exploring? Send a transmission. This form is wired for validation and ready to connect to an email service." /><div className="contact-layout"><div className="contact-links"><a href="mailto:manjithasbandara@gmail.com"><Mail size={18} /><span>EMAIL<br /><b>manjithasbandara@gmail.com</b></span><ArrowUpRight /></a><a href="https://github.com/manjithasbandara-prog" target="_blank" rel="noreferrer"><Github size={18} /><span>GITHUB<br /><b>manjithasbandara-prog</b></span><ArrowUpRight /></a><a href="https://www.linkedin.com/in/manjitha-bandara-2002weebo150561257" target="_blank" rel="noreferrer"><Radio size={18} /><span>LINKEDIN<br /><b>MJ_BANDARA</b></span><ArrowUpRight /></a></div><form className="contact-form" onSubmit={submit}><label>IDENTIFIER<input required name="name" placeholder="Your name" /></label><label>RETURN ADDRESS<input required type="email" name="email" placeholder="you@email.com" /></label><label>TRANSMISSION<textarea required name="message" rows={4} placeholder="Tell me about your idea..." /></label>{status === 'error' && <p className="form-error">TRANSMISSION NOT CONFIGURED. Please email directly using the address on the left.</p>}<button className="button-primary" type="submit">TRANSMIT MESSAGE <Send size={15} /></button></form></div><div className="contact-end"><span>MJ_SAYURU<span className="cursor">_</span></span><small>ALWAYS LEARNING. ALWAYS EVOLVING.</small></div></section>
}

function TerminalOverlay({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>(['PROJECT ZERO TERMINAL v1.0', 'Type "help" for available commands.'])
  const output = (command: string) => {
    const normalized = command.trim().toLowerCase()
    const responses: Record<string, string> = {
      help: 'COMMANDS: whoami · about · skills · projects · education · github · contact · clear · matrix · exit',
      whoami: 'W M M S BANDARA // MJ_SAYURU\\nBICT UNDERGRADUATE // NETWORK TECHNOLOGY\\nSOUTH EASTERN UNIVERSITY OF SRI LANKA',
      about: 'A curious builder exploring networks, security, software, and emerging AI.',
      skills: 'JAVASCRIPT · C · JAVA · PYTHON · CISCO · LINUX · NMAP · WEB DEVELOPMENT',
      projects: '01 ANDROID USER DIRECTORY\\n02 MUSTANG 67 SCROLLABLE WEBSITE',
      education: '2023—2028 // BICT NETWORK TECHNOLOGY // SEUSL',
      contact: 'manjithasbandara@gmail.com',
      matrix: 'MATRIX PROTOCOL ENABLED // VISUAL LAYER ENGAGED',
    }
    if (normalized === 'clear') return ''
    if (normalized === 'exit') { onClose(); return '' }
    if (normalized === 'github') { window.open('https://github.com/manjithasbandara-prog', '_blank', 'noopener,noreferrer'); return 'OPENING GITHUB IN A NEW TAB...' }
    return responses[normalized] || `COMMAND NOT FOUND: ${normalized}. TYPE "help".`
  }
  const submit = (event: FormEvent) => { event.preventDefault(); if (!input.trim()) return; const result = output(input); setHistory(prev => [...prev, `MJ_SAYURU@PROJECT_ZERO:~$ ${input}`, ...result.split('\\n')]); setInput('') }
  return <div className="terminal-overlay"><div className="terminal-window"><div className="terminal-bar"><span><span className="status-dot" /> PROJECT_ZERO // TERMINAL</span><button onClick={onClose} aria-label="Close terminal"><X size={18} /></button></div><div className="terminal-body">{history.map((line, i) => <div className={i % 2 === 0 ? 'terminal-output' : ''} key={`${line}-${i}`}>{line}</div>)}<form onSubmit={submit} className="terminal-input"><span>MJ_SAYURU@PROJECT_ZERO:~$</span><input autoFocus value={input} onChange={event => setInput(event.target.value)} aria-label="Terminal command" /></form></div></div></div>
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [terminal, setTerminal] = useState(false)
  const [mobileMatrix, setMobileMatrix] = useState(false)
  const bootComplete = useMemo(() => () => setBooted(true), [])
  useEffect(() => { document.body.classList.toggle('no-scroll', !booted); return () => document.body.classList.remove('no-scroll') }, [booted])
  const navigate = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return <>{!booted && <BootSequence onComplete={bootComplete} />}<div className="app"><MatrixCanvas active={booted || mobileMatrix} /><div className="grain" /><Navigation onTerminal={() => setTerminal(true)} onNavigate={navigate} /><main><Hero onExplore={() => navigate('identity')} onCv={() => window.open('/cv.html', '_blank')} /><Identity /><Network /><Arsenal /><Archive /><Journey /><Contact /></main><footer><Monogram small /><span>PROJECT ZERO // MJ_SAYURU</span><span>BUILD 2026.01 <Zap size={13} /></span><button onClick={() => setMobileMatrix(!mobileMatrix)}><Command size={13} /> MATRIX</button></footer></div>{terminal && <TerminalOverlay onClose={() => setTerminal(false)} />}</>
}
