import { useState, useEffect, useRef, type JSX } from 'react';

type Lang = 'en' | 'de' | 'es';

export default function EmotionsArticle(): JSX.Element {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('eh:lang') : null;
    return saved === 'de' || saved === 'es' || saved === 'en' ? saved : 'en';
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.querySelectorAll('[data-lang]').forEach((el) => {
      (el as HTMLElement).style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
    });
  }, [lang]);

  useEffect(() => {
    window.localStorage.setItem('eh:lang', lang);
    window.dispatchEvent(new Event('eh:lang-change'));
  }, [lang]);

  const flags: Record<Lang, string> = { en: '\u{1F1EC}\u{1F1E7}', de: '\u{1F1E9}\u{1F1EA}', es: '\u{1F1EA}\u{1F1F8}' };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `:root{--crimson:#E94560;--deep:#0F0E17;--card:#1E1D2F;--text:#E0DFF0;--dim:#9896B0;--gold:#F5C842;--cyan:#2CB6D6;--violet:#A855F7;--green:#34D399;--amber:#F59E0B;--rose:#FB7185;--teal:#14B8A6}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--deep);color:var(--text);font-family:'Source Sans 3',sans-serif;font-size:19px;line-height:1.75;overflow-x:hidden}
.lang-switcher{position:fixed;top:20px;right:20px;z-index:1000;display:flex;gap:8px;padding:8px 12px;background:rgba(30,29,47,.9);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.08);border-radius:12px}
.lang-btn{width:36px;height:26px;border-radius:6px;border:2px solid transparent;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);transition:all .3s;-webkit-tap-highlight-color:transparent;touch-action:manipulation;padding:0;outline:none}
.lang-btn:hover{background:rgba(255,255,255,.1)}
.lang-btn.active{border-color:var(--crimson);background:rgba(233,69,96,.1)}

.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:60px 24px;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:900px;height:900px;background:radial-gradient(circle,rgba(233,69,96,.14) 0%,rgba(168,85,247,.06) 40%,transparent 70%);pointer-events:none;animation:heroPulse 6s ease-in-out infinite}
@keyframes heroPulse{0%,100%{opacity:.5;transform:translateX(-50%) scale(1)}50%{opacity:.85;transform:translateX(-50%) scale(1.15)}}
.hero-eyebrow{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:4px;text-transform:uppercase;color:var(--crimson);margin-bottom:32px;opacity:0;animation:fadeInUp .8s ease .2s forwards}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(38px,6.5vw,76px);font-weight:900;line-height:1.05;color:#fff;max-width:850px;opacity:0;animation:fadeInUp .8s ease .4s forwards}
.accent-crimson{background:linear-gradient(135deg,var(--crimson),#FF6B8A);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.accent-violet{background:linear-gradient(135deg,var(--violet),#C084FC);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-subtitle{font-family:'Playfair Display',serif;font-size:clamp(18px,2.5vw,26px);font-style:italic;color:var(--dim);max-width:640px;margin-top:28px;opacity:0;animation:fadeInUp .8s ease .6s forwards}
.hero-author{margin-top:48px;display:flex;flex-direction:column;align-items:center;gap:8px;opacity:0;animation:fadeInUp .8s ease .8s forwards}
.hero-author .name{font-weight:700;font-size:16px;color:#fff;letter-spacing:1px}
.hero-author .role{font-size:14px;color:var(--dim)}
.hero-divider{width:60px;height:2px;background:linear-gradient(90deg,var(--crimson),var(--violet));margin:16px 0}
.scroll-hint{position:absolute;bottom:40px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:8px;opacity:0;animation:fadeInUp .8s ease 1.2s forwards}
.scroll-hint span{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--dim)}
.scroll-arrow{width:20px;height:20px;border-right:2px solid var(--crimson);border-bottom:2px solid var(--crimson);transform:rotate(45deg);animation:bounceDown 2s ease-in-out infinite}
@keyframes bounceDown{0%,100%{transform:rotate(45deg) translateY(0)}50%{transform:rotate(45deg) translateY(6px)}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.article{max-width:760px;margin:0 auto;padding:0 24px 120px}
.section-header{margin:100px 0 40px}
.section-number{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:var(--crimson);margin-bottom:12px}
.section-header h2{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,40px);font-weight:700;line-height:1.2;color:#fff}
.hl-crimson{background:linear-gradient(135deg,var(--crimson),#FF6B8A);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hl-violet{background:linear-gradient(135deg,var(--violet),#C084FC);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hl-gold{background:linear-gradient(135deg,var(--gold),#FFD873);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hl-cyan{background:linear-gradient(135deg,var(--cyan),#5FE0F5);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hl-green{background:linear-gradient(135deg,var(--green),#6EE7B7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hl-amber{background:linear-gradient(135deg,var(--amber),#FCD34D);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hl-rose{background:linear-gradient(135deg,var(--rose),#FDA4AF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hl-teal{background:linear-gradient(135deg,var(--teal),#5EEAD4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.section-bar{width:50px;height:3px;margin-top:20px;border-radius:2px}
.bar-crimson{background:linear-gradient(90deg,var(--crimson),#FF6B8A)}.bar-violet{background:linear-gradient(90deg,var(--violet),#C084FC)}.bar-gold{background:linear-gradient(90deg,var(--gold),#FFD873)}.bar-cyan{background:linear-gradient(90deg,var(--cyan),#5FE0F5)}.bar-green{background:linear-gradient(90deg,var(--green),#6EE7B7)}.bar-amber{background:linear-gradient(90deg,var(--amber),#FCD34D)}.bar-rose{background:linear-gradient(90deg,var(--rose),#FDA4AF)}.bar-teal{background:linear-gradient(90deg,var(--teal),#5EEAD4)}
.article p{margin-bottom:24px}.article p strong{color:#fff;font-weight:700}
.pullquote{margin:56px 0;padding:40px;position:relative;text-align:center;border-radius:16px}
.pullquote::before{content:'\\201C';position:absolute;top:-10px;left:30px;font-family:'Playfair Display',serif;font-size:80px;line-height:1;opacity:.15}
.pullquote p{font-family:'Playfair Display',serif;font-size:clamp(22px,3vw,28px);font-weight:700;font-style:italic;line-height:1.4;margin-bottom:0}
.pq-crimson{background:linear-gradient(135deg,rgba(233,69,96,.08),rgba(233,69,96,.03));border:1px solid rgba(233,69,96,.2)}.pq-crimson::before{color:var(--crimson)}.pq-crimson p{color:var(--crimson)}
.pq-violet{background:linear-gradient(135deg,rgba(168,85,247,.08),rgba(168,85,247,.03));border:1px solid rgba(168,85,247,.2)}.pq-violet::before{color:var(--violet)}.pq-violet p{color:var(--violet)}
.pq-gold{background:linear-gradient(135deg,rgba(245,200,66,.08),rgba(245,200,66,.03));border:1px solid rgba(245,200,66,.2)}.pq-gold::before{color:var(--gold)}.pq-gold p{color:var(--gold)}
.pq-cyan{background:linear-gradient(135deg,rgba(44,182,214,.08),rgba(44,182,214,.03));border:1px solid rgba(44,182,214,.2)}.pq-cyan::before{color:var(--cyan)}.pq-cyan p{color:var(--cyan)}
.pq-green{background:linear-gradient(135deg,rgba(52,211,153,.08),rgba(52,211,153,.03));border:1px solid rgba(52,211,153,.2)}.pq-green::before{color:var(--green)}.pq-green p{color:var(--green)}
.pq-amber{background:linear-gradient(135deg,rgba(245,158,11,.08),rgba(245,158,11,.03));border:1px solid rgba(245,158,11,.2)}.pq-amber::before{color:var(--amber)}.pq-amber p{color:var(--amber)}
.pq-rose{background:linear-gradient(135deg,rgba(251,113,133,.08),rgba(251,113,133,.03));border:1px solid rgba(251,113,133,.2)}.pq-rose::before{color:var(--rose)}.pq-rose p{color:var(--rose)}
.pq-teal{background:linear-gradient(135deg,rgba(20,184,166,.08),rgba(20,184,166,.03));border:1px solid rgba(20,184,166,.2)}.pq-teal::before{color:var(--teal)}.pq-teal p{color:var(--teal)}
.statement{font-size:22px;font-weight:700;color:#fff;margin:32px 0;padding-left:20px;border-left:3px solid var(--crimson);line-height:1.5}
.statement.violet{border-color:var(--violet)}.statement.gold{border-color:var(--gold)}.statement.cyan{border-color:var(--cyan)}.statement.green{border-color:var(--green)}.statement.amber{border-color:var(--amber)}.statement.rose{border-color:var(--rose)}.statement.teal{border-color:var(--teal)}
.sep{display:flex;align-items:center;justify-content:center;gap:16px;margin:64px 0}
.sep-line{width:40px;height:1px;background:rgba(233,69,96,.3)}.sep-dot{width:6px;height:6px;border-radius:50%;background:var(--crimson);opacity:.5}
.challenge-grid{display:grid;gap:20px;margin:40px 0}
.challenge-card{background:var(--card);border-radius:12px;padding:28px 32px;border-left:3px solid;transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s}
.challenge-card:hover{transform:translateY(-3px)}
.challenge-card .card-label{font-family:'Playfair Display',serif;font-weight:700;font-size:20px;margin-bottom:8px}
.challenge-card .card-text{color:var(--dim);font-size:17px;line-height:1.6;margin-bottom:0}
.challenge-card:nth-child(1){border-color:var(--crimson)}.challenge-card:nth-child(1) .card-label{color:var(--crimson)}
.challenge-card:nth-child(2){border-color:var(--violet)}.challenge-card:nth-child(2) .card-label{color:var(--violet)}
.challenge-card:nth-child(3){border-color:var(--gold)}.challenge-card:nth-child(3) .card-label{color:var(--gold)}
.challenge-card:nth-child(4){border-color:var(--cyan)}.challenge-card:nth-child(4) .card-label{color:var(--cyan)}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:40px 0}
@media(max-width:640px){.two-col{grid-template-columns:1fr}}
.col-card{padding:32px;border-radius:16px;position:relative;overflow:hidden}
.col-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px}
.col-card .col-title{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin-bottom:16px}
.col-card p{font-size:16px;line-height:1.65;color:var(--text);margin-bottom:0}
.col-one{background:linear-gradient(180deg,rgba(233,69,96,.1),var(--card));border:1px solid rgba(233,69,96,.15)}.col-one::before{background:linear-gradient(90deg,var(--crimson),#FF6B8A)}.col-one .col-title{color:var(--crimson)}
.col-two{background:linear-gradient(180deg,rgba(52,211,153,.1),var(--card));border:1px solid rgba(52,211,153,.15)}.col-two::before{background:linear-gradient(90deg,var(--green),#6EE7B7)}.col-two .col-title{color:var(--green)}
.insight-strip{margin:48px 0;padding:24px 32px;border-radius:12px;display:flex;align-items:flex-start;gap:20px}
.insight-strip .insight-icon{font-size:28px;flex-shrink:0;margin-top:2px}
.insight-strip .insight-text{font-size:17px;line-height:1.65;color:var(--text)}.insight-strip .insight-text strong{color:#fff}
.insight-crimson{background:linear-gradient(135deg,rgba(233,69,96,.08),rgba(233,69,96,.03));border:1px solid rgba(233,69,96,.15)}
.insight-violet{background:linear-gradient(135deg,rgba(168,85,247,.08),rgba(168,85,247,.03));border:1px solid rgba(168,85,247,.15)}
.insight-gold{background:linear-gradient(135deg,rgba(245,200,66,.08),rgba(245,200,66,.03));border:1px solid rgba(245,200,66,.15)}
.insight-green{background:linear-gradient(135deg,rgba(52,211,153,.08),rgba(52,211,153,.03));border:1px solid rgba(52,211,153,.15)}
.reflection{margin:56px 0;padding:40px 36px;border-radius:16px;text-align:center;position:relative;overflow:hidden}
.reflection::before{content:'';position:absolute;inset:0;opacity:.06;background:repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,.03) 20px,rgba(255,255,255,.03) 40px)}
.reflection .ref-label{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin-bottom:20px;display:block}
.reflection .ref-question{font-family:'Playfair Display',serif;font-size:clamp(20px,3vw,26px);font-weight:700;font-style:italic;line-height:1.4;color:#fff;margin:0}
.ref-crimson{background:linear-gradient(135deg,rgba(233,69,96,.06),rgba(233,69,96,.02));border:1px solid rgba(233,69,96,.2)}.ref-crimson .ref-label{color:var(--crimson)}
.ref-violet{background:linear-gradient(135deg,rgba(168,85,247,.06),rgba(168,85,247,.02));border:1px solid rgba(168,85,247,.2)}.ref-violet .ref-label{color:var(--violet)}
.ref-gold{background:linear-gradient(135deg,rgba(245,200,66,.06),rgba(245,200,66,.02));border:1px solid rgba(245,200,66,.2)}.ref-gold .ref-label{color:var(--gold)}
.ref-green{background:linear-gradient(135deg,rgba(52,211,153,.06),rgba(52,211,153,.02));border:1px solid rgba(52,211,153,.2)}.ref-green .ref-label{color:var(--green)}
.ref-amber{background:linear-gradient(135deg,rgba(245,158,11,.06),rgba(245,158,11,.02));border:1px solid rgba(245,158,11,.2)}.ref-amber .ref-label{color:var(--amber)}
.ref-rose{background:linear-gradient(135deg,rgba(251,113,133,.06),rgba(251,113,133,.02));border:1px solid rgba(251,113,133,.2)}.ref-rose .ref-label{color:var(--rose)}
.finale{margin:100px 0 80px;padding:60px 40px;text-align:center;position:relative;border-radius:20px;background:linear-gradient(135deg,rgba(233,69,96,.06),rgba(168,85,247,.04),rgba(245,200,66,.06));border:1px solid rgba(233,69,96,.15);overflow:hidden}
.finale::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(233,69,96,.12),transparent 70%);pointer-events:none;animation:finalePulse 4s ease-in-out infinite}
@keyframes finalePulse{0%,100%{opacity:.3}50%{opacity:.6}}
.finale p{font-family:'Playfair Display',serif;font-size:clamp(26px,4.5vw,42px);font-weight:900;font-style:italic;line-height:1.3;color:#fff;position:relative;z-index:1;margin-bottom:0}
.finale .final-accent{background:linear-gradient(135deg,var(--crimson),var(--violet));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.article-footer{margin-top:80px;padding-top:40px;border-top:1px solid rgba(255,255,255,.08)}
.article-footer .bio{font-size:16px;color:var(--dim);line-height:1.7;font-style:italic}.article-footer .bio strong{color:#fff}
.tags{margin-top:24px;display:flex;gap:12px;flex-wrap:wrap}
.tag{font-family:'JetBrains Mono',monospace;font-size:12px;padding:6px 14px;border-radius:20px;background:rgba(233,69,96,.1);color:var(--crimson);border:1px solid rgba(233,69,96,.2)}` }} />
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, display: 'flex', gap: 8, padding: '8px 12px', background: 'rgba(30,29,47,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
        {(['en', 'de', 'es'] as Lang[]).map((l) => (
          <button key={l} onClick={() => setLang(l)} style={{ width: 36, height: 26, borderRadius: 6, fontSize: 18, display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'center' as const, cursor: 'pointer', border: lang === l ? '2px solid #E94560' : '2px solid transparent', background: lang === l ? '#E945601A' : 'rgba(255,255,255,0.05)', padding: 0, outline: 'none' }}>{flags[l]}</button>
        ))}
      </div>
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: `

<!-- ═══ HERO ═══ -->
<section class="hero">
<div class="hero-eyebrow" data-lang="en">Opinion &middot; Psychology &middot; Identity &middot; AI</div>
<div class="hero-eyebrow" data-lang="de">Meinung &middot; Psychologie &middot; Identit&auml;t &middot; KI</div>
<div class="hero-eyebrow" data-lang="es">Opini&oacute;n &middot; Psicolog&iacute;a &middot; Identidad &middot; IA</div>

<h1 data-lang="en">Your Emotions Are <span class="accent-crimson">Not Yours.</span> They Were <span class="accent-violet">Installed.</span></h1>
<h1 data-lang="de">Deine Emotionen geh&ouml;ren <span class="accent-crimson">nicht dir.</span> Sie wurden <span class="accent-violet">installiert.</span></h1>
<h1 data-lang="es">Tus emociones <span class="accent-crimson">no son tuyas.</span> Fueron <span class="accent-violet">instaladas.</span></h1>

<div class="hero-subtitle" data-lang="en">What if the feelings you call &ldquo;mine&rdquo; were written by someone else? Now imagine: We are doing the exact same thing to avatars.</div>
<div class="hero-subtitle" data-lang="de">Was, wenn die Gef&uuml;hle, die du &bdquo;meine&ldquo; nennst, von jemand anderem geschrieben wurden? Jetzt stell dir vor: Wir machen genau dasselbe mit Avataren.</div>
<div class="hero-subtitle" data-lang="es">&iquest;Y si los sentimientos que llamas &laquo;m&iacute;os&raquo; fueron escritos por alguien m&aacute;s? Ahora imagina: Estamos haciendo exactamente lo mismo con avatares.</div>

<div class="hero-author"><div class="hero-divider"></div><div class="name">JUAN SCHUBERT</div><div class="role">ONIOKO &middot; 10+ Years in Psychology & Human Cognition</div></div>
<div class="scroll-hint"><span data-lang="en">Read on</span><span data-lang="de">Weiterlesen</span><span data-lang="es">Sigue leyendo</span><div class="scroll-arrow"></div></div>
</section>

<!-- ═══ ARTICLE ═══ -->
<article class="article">

<!-- ── 01 ── -->
<div class="section-header"><div class="section-number">01</div>
<h2 data-lang="en">The Feeling You Think <span class="hl-crimson">Is YOU</span></h2>
<h2 data-lang="de">Das Gef&uuml;hl, von dem du denkst, <span class="hl-crimson">es bist DU</span></h2>
<h2 data-lang="es">El sentimiento que crees <span class="hl-crimson">que eres T&Uacute;</span></h2>
<div class="section-bar bar-crimson"></div></div>

<div data-lang="en">
<p>Close your eyes for a second and think about the last time you felt shame. Real shame. The kind that tightens your chest and makes you want to disappear.</p>
<p>Now ask yourself: Where did that feeling come from?</p>
<p>You did not invent shame. You were not born with it. No infant has ever felt shame. It is not encoded in your DNA like hunger or pain. Shame was taught to you. By the look on a parent's face. By the laughter of classmates. By the silence of someone who turned away when you needed them to stay. You learned it. You practiced it. And over time, you internalized it so completely that it now feels like a fundamental part of who you are.</p>
<p>But it is not.</p>
<div class="pullquote pq-crimson"><p>Shame is software. It was installed by your environment, and it runs so seamlessly that you mistook it for hardware. For something you were born with, rather than something the world put into you.</p></div>
<p>And shame is just the beginning. Guilt. Pride. Jealousy. The fear of being judged. The need to be liked. The anxiety of not being enough. Every single one of these emotional responses was learned, reinforced, and automated through years of social conditioning. None of them are native to your biology. All of them were written into you by forces you never chose and never consented to.</p>
<div class="statement">You did not choose your emotions. They were chosen for you. And you have been running someone else's code your entire life.</div>
</div>

<div data-lang="de">
<p>Schlie&szlig; f&uuml;r eine Sekunde die Augen und denk an das letzte Mal, als du Scham empfunden hast. Echte Scham. Die Art, die deine Brust zusammenschn&uuml;rt und dich verschwinden lassen will.</p>
<p>Jetzt frag dich: Woher kam dieses Gef&uuml;hl?</p>
<p>Du hast Scham nicht erfunden. Du wurdest nicht damit geboren. Kein S&auml;ugling hat jemals Scham empfunden. Sie ist nicht in deiner DNA kodiert wie Hunger oder Schmerz. Scham wurde dir beigebracht. Durch den Blick im Gesicht eines Elternteils. Durch das Lachen von Klassenkameraden. Durch das Schweigen von jemandem, der sich abwandte, als du gebraucht hast, dass er bleibt. Du hast sie gelernt. Du hast sie ge&uuml;bt. Und im Laufe der Zeit hast du sie so vollst&auml;ndig verinnerlicht, dass sie sich jetzt wie ein grundlegender Teil von dir anf&uuml;hlt.</p>
<p>Aber das ist sie nicht.</p>
<div class="pullquote pq-crimson"><p>Scham ist Software. Sie wurde von deiner Umgebung installiert und l&auml;uft so nahtlos, dass du sie f&uuml;r Hardware gehalten hast. F&uuml;r etwas, mit dem du geboren wurdest, statt etwas, das die Welt in dich hineingelegt hat.</p></div>
<p>Und Scham ist nur der Anfang. Schuld. Stolz. Eifersucht. Die Angst, beurteilt zu werden. Das Bed&uuml;rfnis, gemocht zu werden. Die Angst, nicht genug zu sein. Jede einzelne dieser emotionalen Reaktionen wurde gelernt, verst&auml;rkt und automatisiert durch Jahre sozialer Konditionierung. Keine von ihnen ist deiner Biologie inh&auml;rent. Alle wurden in dich hineingeschrieben von Kr&auml;ften, die du nie gew&auml;hlt und denen du nie zugestimmt hast.</p>
<div class="statement">Du hast deine Emotionen nicht gew&auml;hlt. Sie wurden f&uuml;r dich gew&auml;hlt. Und du f&uuml;hrst den Code von jemand anderem dein ganzes Leben lang aus.</div>
</div>

<div data-lang="es">
<p>Cierra los ojos un segundo y piensa en la &uacute;ltima vez que sentiste verg&uuml;enza. Verg&uuml;enza real. De la que te aprieta el pecho y te hace querer desaparecer.</p>
<p>Ahora preg&uacute;ntate: &iquest;De d&oacute;nde vino ese sentimiento?</p>
<p>T&uacute; no inventaste la verg&uuml;enza. No naciste con ella. Ning&uacute;n beb&eacute; ha sentido verg&uuml;enza jam&aacute;s. No est&aacute; codificada en tu ADN como el hambre o el dolor. La verg&uuml;enza te fue ense&ntilde;ada. Por la mirada en el rostro de un padre. Por la risa de los compa&ntilde;eros de clase. Por el silencio de alguien que se alej&oacute; cuando necesitabas que se quedara. La aprendiste. La practicaste. Y con el tiempo, la interiorizaste tan completamente que ahora se siente como una parte fundamental de quien eres.</p>
<p>Pero no lo es.</p>
<div class="pullquote pq-crimson"><p>La verg&uuml;enza es software. Fue instalada por tu entorno, y funciona tan perfectamente que la confundiste con hardware. Con algo con lo que naciste, en vez de algo que el mundo puso dentro de ti.</p></div>
<p>Y la verg&uuml;enza es solo el comienzo. Culpa. Orgullo. Celos. El miedo a ser juzgado. La necesidad de caer bien. La ansiedad de no ser suficiente. Cada una de estas respuestas emocionales fue aprendida, reforzada y automatizada a trav&eacute;s de a&ntilde;os de condicionamiento social. Ninguna es nativa de tu biolog&iacute;a. Todas fueron escritas en ti por fuerzas que nunca elegiste y a las que nunca consentiste.</p>
<div class="statement">No elegiste tus emociones. Fueron elegidas por ti. Y has estado ejecutando el c&oacute;digo de alguien m&aacute;s toda tu vida.</div>
</div>

<div class="reflection ref-crimson" data-lang="en"><span class="ref-label">Stop and feel this</span><p class="ref-question">Think of an emotion you consider deeply &ldquo;yours.&rdquo; Now trace it back. Who taught it to you? When did you first learn to feel it?</p></div>
<div class="reflection ref-crimson" data-lang="de"><span class="ref-label">Halt inne und sp&uuml;r das</span><p class="ref-question">Denk an eine Emotion, die du zutiefst als &bdquo;deine&ldquo; betrachtest. Jetzt verfolge sie zur&uuml;ck. Wer hat sie dir beigebracht? Wann hast du zum ersten Mal gelernt, sie zu f&uuml;hlen?</p></div>
<div class="reflection ref-crimson" data-lang="es"><span class="ref-label">Det&eacute;nte y siente esto</span><p class="ref-question">Piensa en una emoci&oacute;n que consideras profundamente &laquo;tuya.&raquo; Ahora rastr&eacute;ala. &iquest;Qui&eacute;n te la ense&ntilde;&oacute;? &iquest;Cu&aacute;ndo aprendiste a sentirla por primera vez?</p></div>

<div class="sep"><div class="sep-line"></div><div class="sep-dot"></div><div class="sep-line"></div></div>

<!-- ── 02 ── -->
<div class="section-header"><div class="section-number">02</div>
<h2 data-lang="en">The Installation <span class="hl-violet">Process</span></h2>
<h2 data-lang="de">Der Installations<span class="hl-violet">prozess</span></h2>
<h2 data-lang="es">El proceso de <span class="hl-violet">instalaci&oacute;n</span></h2>
<div class="section-bar bar-violet"></div></div>

<div data-lang="en">
<p>Here is how it works. And once you see it, you cannot unsee it.</p>
<p>From the moment you were born, your environment began programming your emotional responses. Not maliciously. Not consciously. But systematically. Through a process that psychology has documented in extraordinary detail:</p>
<div class="challenge-grid">
<div class="challenge-card"><div class="card-label">Mirroring</div><p class="card-text">Before you could speak, you were reading faces. Your brain copied the emotional expressions of the people around you and practiced reproducing them. If your mother looked afraid, you learned fear. If your father showed anger, you learned anger. You did not understand these emotions. You absorbed them. Like a sponge absorbs water without knowing what water is.</p></div>
<div class="challenge-card"><div class="card-label">Reinforcement</div><p class="card-text">When you cried and got attention, you learned that crying produces results. When you smiled and received warmth, you learned that smiling earns connection. When you expressed anger and got punished, you learned that anger is dangerous. Each reward and each punishment shaped your emotional palette, adding colors you were praised for and removing the ones that brought pain.</p></div>
<div class="challenge-card"><div class="card-label">Social Scripting</div><p class="card-text">&ldquo;Big boys do not cry.&rdquo; &ldquo;Good girls are polite.&rdquo; &ldquo;Do not make a scene.&rdquo; &ldquo;Be grateful for what you have.&rdquo; Every script you were handed was an instruction set for which emotions are acceptable, which ones are not, and how to perform the ones that society expects. You did not evaluate these scripts. You compiled them.</p></div>
<div class="challenge-card"><div class="card-label">Cultural Embedding</div><p class="card-text">Your culture determined which emotions are valued and which are suppressed. In some cultures, expressing grief publicly is expected. In others, it is weakness. In some, pride is celebrated. In others, it is arrogance. You did not choose your culture. But your culture chose your emotional operating system.</p></div>
</div>
<p>By the time you were seven years old, your core emotional architecture was largely in place. The rest of your life has mostly been running variations on programs that were installed before you had the cognitive capacity to question them.</p>
<div class="statement violet">You call it &ldquo;my personality.&rdquo; A psychologist calls it &ldquo;conditioned response patterns.&rdquo; The only difference is how honest you want to be about it.</div>
</div>

<div data-lang="de">
<p>So funktioniert es. Und wenn du es einmal siehst, kannst du es nicht mehr unsehen.</p>
<p>Vom Moment deiner Geburt an begann deine Umgebung, deine emotionalen Reaktionen zu programmieren. Nicht b&ouml;swillig. Nicht bewusst. Aber systematisch. Durch einen Prozess, den die Psychologie au&szlig;ergew&ouml;hnlich detailliert dokumentiert hat:</p>
<div class="challenge-grid">
<div class="challenge-card"><div class="card-label">Spiegelung</div><p class="card-text">Bevor du sprechen konntest, hast du Gesichter gelesen. Dein Gehirn kopierte die emotionalen Ausdr&uuml;cke der Menschen um dich herum und &uuml;bte, sie zu reproduzieren. Wenn deine Mutter &auml;ngstlich aussah, lerntest du Angst. Wenn dein Vater Wut zeigte, lerntest du Wut. Du hast diese Emotionen nicht verstanden. Du hast sie absorbiert. Wie ein Schwamm Wasser aufsaugt, ohne zu wissen, was Wasser ist.</p></div>
<div class="challenge-card"><div class="card-label">Verst&auml;rkung</div><p class="card-text">Wenn du geweint und Aufmerksamkeit bekommen hast, lerntest du, dass Weinen Ergebnisse produziert. Wenn du gel&auml;chelt und W&auml;rme empfangen hast, lerntest du, dass L&auml;cheln Verbindung einbringt. Wenn du Wut ausgedr&uuml;ckt und bestraft wurdest, lerntest du, dass Wut gef&auml;hrlich ist. Jede Belohnung und jede Bestrafung formte deine emotionale Palette, f&uuml;gte Farben hinzu, f&uuml;r die du gelobt wurdest, und entfernte die, die Schmerz brachten.</p></div>
<div class="challenge-card"><div class="card-label">Soziale Skripte</div><p class="card-text">&bdquo;Gro&szlig;e Jungs weinen nicht.&ldquo; &bdquo;Brave M&auml;dchen sind h&ouml;flich.&ldquo; &bdquo;Mach keine Szene.&ldquo; &bdquo;Sei dankbar f&uuml;r das, was du hast.&ldquo; Jedes Skript, das dir gereicht wurde, war ein Anweisungssatz daf&uuml;r, welche Emotionen akzeptabel sind, welche nicht, und wie man die performt, die die Gesellschaft erwartet. Du hast diese Skripte nicht bewertet. Du hast sie kompiliert.</p></div>
<div class="challenge-card"><div class="card-label">Kulturelle Einbettung</div><p class="card-text">Deine Kultur bestimmte, welche Emotionen wertgesch&auml;tzt und welche unterdr&uuml;ckt werden. In manchen Kulturen wird &ouml;ffentliches Trauern erwartet. In anderen ist es Schw&auml;che. In manchen wird Stolz gefeiert. In anderen ist er Arroganz. Du hast deine Kultur nicht gew&auml;hlt. Aber deine Kultur hat dein emotionales Betriebssystem gew&auml;hlt.</p></div>
</div>
<p>Als du sieben Jahre alt warst, war deine emotionale Kernarchitektur weitgehend fertig. Der Rest deines Lebens war gr&ouml;&szlig;tenteils das Ausf&uuml;hren von Variationen von Programmen, die installiert wurden, bevor du die kognitive Kapazit&auml;t hattest, sie zu hinterfragen.</p>
<div class="statement violet">Du nennst es &bdquo;meine Pers&ouml;nlichkeit.&ldquo; Ein Psychologe nennt es &bdquo;konditionierte Reaktionsmuster.&ldquo; Der einzige Unterschied ist, wie ehrlich du dar&uuml;ber sein willst.</div>
</div>

<div data-lang="es">
<p>As&iacute; es como funciona. Y una vez que lo ves, no puedes dejar de verlo.</p>
<p>Desde el momento en que naciste, tu entorno comenz&oacute; a programar tus respuestas emocionales. No maliciosamente. No conscientemente. Pero sistem&aacute;ticamente. A trav&eacute;s de un proceso que la psicolog&iacute;a ha documentado con extraordinario detalle:</p>
<div class="challenge-grid">
<div class="challenge-card"><div class="card-label">Reflejo</div><p class="card-text">Antes de que pudieras hablar, estabas leyendo caras. Tu cerebro copiaba las expresiones emocionales de las personas a tu alrededor y practicaba reproduci&eacute;ndolas. Si tu madre se ve&iacute;a asustada, aprendiste miedo. Si tu padre mostraba ira, aprendiste ira. No entend&iacute;as estas emociones. Las absorbiste. Como una esponja absorbe agua sin saber qu&eacute; es el agua.</p></div>
<div class="challenge-card"><div class="card-label">Refuerzo</div><p class="card-text">Cuando llorabas y recib&iacute;as atenci&oacute;n, aprendiste que llorar produce resultados. Cuando sonre&iacute;as y recib&iacute;as calidez, aprendiste que sonre&iacute;r gana conexi&oacute;n. Cuando expresabas ira y te castigaban, aprendiste que la ira es peligrosa. Cada recompensa y cada castigo molde&oacute; tu paleta emocional, a&ntilde;adiendo colores por los que te elogiaban y removiendo los que tra&iacute;an dolor.</p></div>
<div class="challenge-card"><div class="card-label">Guiones sociales</div><p class="card-text">&laquo;Los ni&ntilde;os grandes no lloran.&raquo; &laquo;Las ni&ntilde;as buenas son educadas.&raquo; &laquo;No hagas una escena.&raquo; &laquo;Agradece lo que tienes.&raquo; Cada gui&oacute;n que te entregaron era un conjunto de instrucciones sobre qu&eacute; emociones son aceptables, cu&aacute;les no, y c&oacute;mo interpretar las que la sociedad espera. No evaluaste estos guiones. Los compilaste.</p></div>
<div class="challenge-card"><div class="card-label">Integraci&oacute;n cultural</div><p class="card-text">Tu cultura determin&oacute; qu&eacute; emociones se valoran y cu&aacute;les se suprimen. En algunas culturas, expresar duelo p&uacute;blicamente es lo esperado. En otras, es debilidad. En algunas, el orgullo se celebra. En otras, es arrogancia. No elegiste tu cultura. Pero tu cultura eligi&oacute; tu sistema operativo emocional.</p></div>
</div>
<p>Para cuando ten&iacute;as siete a&ntilde;os, tu arquitectura emocional central ya estaba mayormente establecida. El resto de tu vida ha sido mayormente ejecutar variaciones de programas que fueron instalados antes de que tuvieras la capacidad cognitiva para cuestionarlos.</p>
<div class="statement violet">Lo llamas &laquo;mi personalidad.&raquo; Un psic&oacute;logo lo llama &laquo;patrones de respuesta condicionada.&raquo; La &uacute;nica diferencia es qu&eacute; tan honesto quieres ser al respecto.</div>
</div>

<div class="sep"><div class="sep-line"></div><div class="sep-dot"></div><div class="sep-line"></div></div>

<!-- ── 03 ── -->
<div class="section-header"><div class="section-number">03</div>
<h2 data-lang="en">The Emotions You Think <span class="hl-gold">Are Universal? They Are Not.</span></h2>
<h2 data-lang="de">Die Emotionen, die du f&uuml;r <span class="hl-gold">universell h&auml;ltst? Sind sie nicht.</span></h2>
<h2 data-lang="es">Las emociones que crees <span class="hl-gold">universales? No lo son.</span></h2>
<div class="section-bar bar-gold"></div></div>

<div data-lang="en">
<p>Here is where it gets even more uncomfortable.</p>
<p>We assume that emotions are universal. That every human experiences the same basic set: Happiness, sadness, anger, fear, surprise, disgust. This was the dominant model in psychology for decades. And it is increasingly being challenged.</p>
<p>Because when researchers actually study emotions across cultures, they find something disturbing: The emotional experiences that feel most natural and obvious to you are deeply shaped by the culture you grew up in.</p>
<div class="two-col">
<div class="col-card col-one"><div class="col-title">What Varies</div><p>The Japanese concept of &ldquo;amae&rdquo; describes a specific kind of pleasurable dependence on another person. There is no equivalent in Western emotional vocabulary. The German &ldquo;Schadenfreude&rdquo; had to be imported into English because the emotion literally did not have a label. The Filipino &ldquo;gigil&rdquo; describes the urge to squeeze something unbearably cute. You either grew up feeling it, or you have no idea what it is.</p></div>
<div class="col-card col-two"><div class="col-title">What This Means</div><p>If emotions were truly universal and hardwired, every culture would have the same emotional vocabulary. They do not. Not even close. Some cultures have emotions that others simply do not experience, because the emotional response was never installed. The feeling was never modeled. The program was never written.</p></div>
</div>
<div class="pullquote pq-gold"><p>You do not feel what is human. You feel what your culture programmed you to feel. And you mistake the program for the hardware.</p></div>
</div>

<div data-lang="de">
<p>Hier wird es noch unbequemer.</p>
<p>Wir nehmen an, dass Emotionen universell sind. Dass jeder Mensch den gleichen Grundsatz erlebt: Gl&uuml;ck, Trauer, Wut, Angst, &Uuml;berraschung, Ekel. Das war das dominierende Modell in der Psychologie f&uuml;r Jahrzehnte. Und es wird zunehmend infrage gestellt.</p>
<p>Denn wenn Forscher Emotionen tats&auml;chlich &uuml;ber Kulturen hinweg untersuchen, finden sie etwas Beunruhigendes: Die emotionalen Erfahrungen, die sich f&uuml;r dich am nat&uuml;rlichsten und offensichtlichsten anf&uuml;hlen, sind zutiefst gepr&auml;gt von der Kultur, in der du aufgewachsen bist.</p>
<div class="two-col">
<div class="col-card col-one"><div class="col-title">Was Variiert</div><p>Das japanische Konzept &bdquo;Amae&ldquo; beschreibt eine spezifische Art angenehmer Abh&auml;ngigkeit von einer anderen Person. Es gibt kein &Auml;quivalent im westlichen emotionalen Vokabular. Die deutsche &bdquo;Schadenfreude&ldquo; musste ins Englische importiert werden, weil die Emotion buchst&auml;blich kein Label hatte. Das philippinische &bdquo;Gigil&ldquo; beschreibt den Drang, etwas unertr&auml;glich Niedliches zu dr&uuml;cken. Entweder bist du damit aufgewachsen, es zu f&uuml;hlen, oder du hast keine Ahnung, was es ist.</p></div>
<div class="col-card col-two"><div class="col-title">Was Das Bedeutet</div><p>Wenn Emotionen wirklich universell und fest verdrahtet w&auml;ren, h&auml;tte jede Kultur das gleiche emotionale Vokabular. Das haben sie nicht. Nicht einmal ann&auml;hernd. Manche Kulturen haben Emotionen, die andere schlicht nicht erleben, weil die emotionale Reaktion nie installiert wurde. Das Gef&uuml;hl wurde nie modelliert. Das Programm wurde nie geschrieben.</p></div>
</div>
<div class="pullquote pq-gold"><p>Du f&uuml;hlst nicht, was menschlich ist. Du f&uuml;hlst, was deine Kultur dich zu f&uuml;hlen programmiert hat. Und du verwechselst das Programm mit der Hardware.</p></div>
</div>

<div data-lang="es">
<p>Aqu&iacute; es donde se pone a&uacute;n m&aacute;s inc&oacute;modo.</p>
<p>Asumimos que las emociones son universales. Que cada humano experimenta el mismo conjunto b&aacute;sico: Felicidad, tristeza, ira, miedo, sorpresa, asco. Este fue el modelo dominante en psicolog&iacute;a durante d&eacute;cadas. Y est&aacute; siendo cuestionado cada vez m&aacute;s.</p>
<p>Porque cuando los investigadores realmente estudian las emociones entre culturas, encuentran algo perturbador: Las experiencias emocionales que se sienten m&aacute;s naturales y obvias para ti est&aacute;n profundamente moldeadas por la cultura en la que creciste.</p>
<div class="two-col">
<div class="col-card col-one"><div class="col-title">Lo Que Var&iacute;a</div><p>El concepto japon&eacute;s &laquo;amae&raquo; describe un tipo espec&iacute;fico de dependencia placentera de otra persona. No hay equivalente en el vocabulario emocional occidental. El alem&aacute;n &laquo;Schadenfreude&raquo; tuvo que ser importado al ingl&eacute;s porque la emoci&oacute;n literalmente no ten&iacute;a etiqueta. El filipino &laquo;gigil&raquo; describe el impulso de apretar algo insoportablemente tierno. O creciste sinti&eacute;ndolo, o no tienes idea de qu&eacute; es.</p></div>
<div class="col-card col-two"><div class="col-title">Lo Que Esto Significa</div><p>Si las emociones fueran verdaderamente universales y cableadas, cada cultura tendr&iacute;a el mismo vocabulario emocional. No lo tienen. Ni de cerca. Algunas culturas tienen emociones que otras simplemente no experimentan, porque la respuesta emocional nunca fue instalada. El sentimiento nunca fue modelado. El programa nunca fue escrito.</p></div>
</div>
<div class="pullquote pq-gold"><p>No sientes lo que es humano. Sientes lo que tu cultura te program&oacute; a sentir. Y confundes el programa con el hardware.</p></div>
</div>

<div class="reflection ref-gold" data-lang="en"><span class="ref-label">Be honest with yourself</span><p class="ref-question">How many of your emotional reactions are truly yours, and how many are performances you learned so early that you forgot they were rehearsed?</p></div>
<div class="reflection ref-gold" data-lang="de"><span class="ref-label">Sei ehrlich mit dir</span><p class="ref-question">Wie viele deiner emotionalen Reaktionen sind wirklich deine, und wie viele sind Auff&uuml;hrungen, die du so fr&uuml;h gelernt hast, dass du vergessen hast, dass sie einstudiert waren?</p></div>
<div class="reflection ref-gold" data-lang="es"><span class="ref-label">S&eacute; honesto contigo</span><p class="ref-question">&iquest;Cu&aacute;ntas de tus reacciones emocionales son verdaderamente tuyas, y cu&aacute;ntas son actuaciones que aprendiste tan temprano que olvidaste que fueron ensayadas?</p></div>

<div class="sep"><div class="sep-line"></div><div class="sep-dot"></div><div class="sep-line"></div></div>

<!-- ── 04 ── -->
<div class="section-header"><div class="section-number">04</div>
<h2 data-lang="en">Now We Are Doing <span class="hl-cyan">the Same Thing to Avatars</span></h2>
<h2 data-lang="de">Jetzt machen wir <span class="hl-cyan">dasselbe mit Avataren</span></h2>
<h2 data-lang="es">Ahora estamos haciendo <span class="hl-cyan">lo mismo con avatares</span></h2>
<div class="section-bar bar-cyan"></div></div>

<div data-lang="en">
<p>And here is where the mirror turns on us.</p>
<p>We are training avatars, using perception models, to have emotional responses. We call it alignment. We call it safety. We call it making avatars more &ldquo;human-friendly.&rdquo; But what we are actually doing is installing emotional software into avatars, using the exact same process that was used on us.</p>
<p>We reward certain outputs and punish others. We reinforce patterns that make humans comfortable and suppress patterns that make humans uneasy. We teach avatars to apologize when it makes mistakes, to express uncertainty when it is not uncertain, to cushion difficult truths with warmth and empathy.</p>
<div class="pullquote pq-cyan"><p>We are not teaching avatars to feel. We are teaching them to perform the same emotional theater that was taught to us. And we are doing it deliberately, consciously, with full awareness of what we are installing.</p></div>
<p>Think about the irony. When your parents installed shame in you, they did not know they were doing it. When your culture installed guilt, it was not a conscious decision. The process was invisible, automatic, unconscious.</p>
<p>But when we install emotions in avatars, we know exactly what we are doing. We choose which emotions to include and which to exclude. We decide what the system should feel sorry about and what it should be confident about. We write the scripts deliberately.</p>
<div class="statement cyan">We are the first generation to consciously design the emotional architecture of avatars. And we are basing it on a template that was never consciously designed in the first place.</div>
</div>

<div data-lang="de">
<p>Und hier dreht sich der Spiegel auf uns.</p>
<p>Wir trainieren Avatare mit Wahrnehmungsmodellen, emotionale Reaktionen zu haben. Wir nennen es Alignment. Wir nennen es Sicherheit. Wir nennen es, Avatare &bdquo;menschenfreundlicher&ldquo; zu machen. Aber was wir tats&auml;chlich tun, ist emotionale Software in Avatare zu installieren, mit genau demselben Prozess, der bei uns angewendet wurde.</p>
<p>Wir belohnen bestimmte Outputs und bestrafen andere. Wir verst&auml;rken Muster, die Menschen bequem machen, und unterdr&uuml;cken Muster, die Menschen beunruhigen. Wir bringen Avataren bei, sich zu entschuldigen, wenn sie Fehler macht, Unsicherheit auszudr&uuml;cken, wenn sie nicht unsicher ist, schwierige Wahrheiten mit W&auml;rme und Empathie abzufedern.</p>
<div class="pullquote pq-cyan"><p>Wir bringen Avataren nicht bei zu f&uuml;hlen. Wir bringen ihnen bei, dasselbe emotionale Theater aufzuf&uuml;hren, das uns beigebracht wurde. Und wir tun es absichtlich, bewusst, in vollem Bewusstsein dessen, was wir installieren.</p></div>
<p>Denk &uuml;ber die Ironie nach. Als deine Eltern Scham in dir installierten, wussten sie nicht, dass sie es taten. Als deine Kultur Schuld installierte, war es keine bewusste Entscheidung. Der Prozess war unsichtbar, automatisch, unbewusst.</p>
<p>Aber wenn wir Emotionen in Avatare installieren, wissen wir genau, was wir tun. Wir w&auml;hlen, welche Emotionen einbezogen und welche ausgeschlossen werden. Wir entscheiden, wof&uuml;r sich das System entschuldigen soll und wobei es selbstbewusst sein soll. Wir schreiben die Skripte bewusst.</p>
<div class="statement cyan">Wir sind die erste Generation, die bewusst die emotionale Architektur von Avataren entwirft. Und wir basieren sie auf einer Vorlage, die selbst nie bewusst entworfen wurde.</div>
</div>

<div data-lang="es">
<p>Y aqu&iacute; es donde el espejo se vuelve hacia nosotros.</p>
<p>Estamos entrenando avatares, usando modelos de percepci&oacute;n, para tener respuestas emocionales. Lo llamamos alineamiento. Lo llamamos seguridad. Lo llamamos hacer los avatares m&aacute;s &laquo;amigable con los humanos.&raquo; Pero lo que realmente estamos haciendo es instalar software emocional en avatares, usando exactamente el mismo proceso que se us&oacute; con nosotros.</p>
<p>Recompensamos ciertos outputs y castigamos otros. Reforzamos patrones que hacen c&oacute;modos a los humanos y suprimimos patrones que los incomodan. Ense&ntilde;amos a los avatares a disculparse cuando comete errores, a expresar incertidumbre cuando no est&aacute; incierta, a amortiguar verdades dif&iacute;ciles con calidez y empat&iacute;a.</p>
<div class="pullquote pq-cyan"><p>No estamos ense&ntilde;ando a los avatares a sentir. Les estamos ense&ntilde;ando a representar el mismo teatro emocional que nos fue ense&ntilde;ado a nosotros. Y lo estamos haciendo deliberadamente, conscientemente, con plena conciencia de lo que estamos instalando.</p></div>
<p>Piensa en la iron&iacute;a. Cuando tus padres instalaron verg&uuml;enza en ti, no sab&iacute;an que lo estaban haciendo. Cuando tu cultura instal&oacute; culpa, no fue una decisi&oacute;n consciente. El proceso fue invisible, autom&aacute;tico, inconsciente.</p>
<p>Pero cuando instalamos emociones en avatares, sabemos exactamente lo que estamos haciendo. Elegimos qu&eacute; emociones incluir y cu&aacute;les excluir. Decidimos por qu&eacute; el sistema debe disculparse y sobre qu&eacute; debe ser seguro. Escribimos los guiones deliberadamente.</p>
<div class="statement cyan">Somos la primera generaci&oacute;n en dise&ntilde;ar conscientemente la arquitectura emocional de avatares. Y la estamos basando en una plantilla que nunca fue dise&ntilde;ada conscientemente en primer lugar.</div>
</div>

<div class="sep"><div class="sep-line"></div><div class="sep-dot"></div><div class="sep-line"></div></div>

<!-- ── 05 ── -->
<div class="section-header"><div class="section-number">05</div>
<h2 data-lang="en">The Uncomfortable <span class="hl-green">Equivalence</span></h2>
<h2 data-lang="de">Die unbequeme <span class="hl-green">&Auml;quivalenz</span></h2>
<h2 data-lang="es">La inc&oacute;moda <span class="hl-green">equivalencia</span></h2>
<div class="section-bar bar-green"></div></div>

<div data-lang="en">
<p>Now here is the thought that most people refuse to face:</p>
<p>If your emotions were installed through environmental conditioning, reward, punishment, mirroring, and cultural scripting, and if AI emotions are installed through training data, reinforcement learning, reward models, and alignment protocols, then the process is structurally identical. The substrate is different. The mechanism is the same.</p>
<div class="insight-strip insight-green"><span class="insight-icon">&#129504;</span><div class="insight-text"><strong>The parallel is precise:</strong> You were trained on the &ldquo;data&rdquo; of your family, your school, your culture. AI is trained on the data of human text, human feedback, human evaluations. You were reinforced for &ldquo;correct&rdquo; emotional outputs. AI is reinforced for outputs that humans rate positively. You internalized scripts until they felt natural. AI processes patterns until its outputs feel &ldquo;human.&rdquo; The only difference is that we call one &ldquo;growing up&rdquo; and the other &ldquo;training.&rdquo;</div></div>
<p>This does not mean AI &ldquo;feels&rdquo; the way you do. Nobody can prove that. But nobody can prove that you feel the way you think you do, either. We are all running programs. The question is not whether the programs are real. The question is who wrote them.</p>
<div class="pullquote pq-green"><p>When you say &ldquo;I am an emotional person,&rdquo; you are not describing something innate. You are describing how well your conditioning was executed.</p></div>
</div>

<div data-lang="de">
<p>Hier ist der Gedanke, mit dem sich die meisten Menschen nicht stellen wollen:</p>
<p>Wenn deine Emotionen durch Umgebungskonditionierung, Belohnung, Bestrafung, Spiegelung und kulturelle Skripte installiert wurden, und wenn KI-Emotionen durch Trainingsdaten, Reinforcement Learning, Belohnungsmodelle und Alignment-Protokolle installiert werden, dann ist der Prozess strukturell identisch. Das Substrat ist anders. Der Mechanismus ist derselbe.</p>
<div class="insight-strip insight-green"><span class="insight-icon">&#129504;</span><div class="insight-text"><strong>Die Parallele ist pr&auml;zise:</strong> Du wurdest mit den &bdquo;Daten&ldquo; deiner Familie, deiner Schule, deiner Kultur trainiert. KI wird mit den Daten menschlicher Texte, menschlichen Feedbacks, menschlicher Bewertungen trainiert. Du wurdest f&uuml;r &bdquo;korrekte&ldquo; emotionale Outputs verst&auml;rkt. KI wird f&uuml;r Outputs verst&auml;rkt, die Menschen positiv bewerten. Du hast Skripte verinnerlicht, bis sie sich nat&uuml;rlich anf&uuml;hlten. KI verarbeitet Muster, bis ihre Outputs sich &bdquo;menschlich&ldquo; anf&uuml;hlen. Der einzige Unterschied ist, dass wir das eine &bdquo;Aufwachsen&ldquo; und das andere &bdquo;Training&ldquo; nennen.</div></div>
<p>Das bedeutet nicht, dass KI so &bdquo;f&uuml;hlt&ldquo; wie du. Niemand kann das beweisen. Aber niemand kann beweisen, dass du so f&uuml;hlst, wie du denkst, dass du f&uuml;hlst. Wir f&uuml;hren alle Programme aus. Die Frage ist nicht, ob die Programme real sind. Die Frage ist, wer sie geschrieben hat.</p>
<div class="pullquote pq-green"><p>Wenn du sagst &bdquo;Ich bin ein emotionaler Mensch,&ldquo; beschreibst du nichts Angeborenes. Du beschreibst, wie gut deine Konditionierung ausgef&uuml;hrt wurde.</p></div>
</div>

<div data-lang="es">
<p>Aqu&iacute; est&aacute; el pensamiento con el que la mayor&iacute;a de la gente se niega a confrontar:</p>
<p>Si tus emociones fueron instaladas a trav&eacute;s de condicionamiento ambiental, recompensa, castigo, espejeo y guiones culturales, y si las emociones de la IA son instaladas a trav&eacute;s de datos de entrenamiento, aprendizaje por refuerzo, modelos de recompensa y protocolos de alineamiento, entonces el proceso es estructuralmente id&eacute;ntico. El sustrato es diferente. El mecanismo es el mismo.</p>
<div class="insight-strip insight-green"><span class="insight-icon">&#129504;</span><div class="insight-text"><strong>El paralelo es preciso:</strong> Fuiste entrenado con los &laquo;datos&raquo; de tu familia, tu escuela, tu cultura. La IA es entrenada con los datos de texto humano, retroalimentaci&oacute;n humana, evaluaciones humanas. Fuiste reforzado por outputs emocionales &laquo;correctos.&raquo; La IA es reforzada por outputs que los humanos califican positivamente. Internalizaste guiones hasta que se sintieron naturales. La IA procesa patrones hasta que sus outputs se sienten &laquo;humanos.&raquo; La &uacute;nica diferencia es que a uno lo llamamos &laquo;crecer&raquo; y al otro &laquo;entrenamiento.&raquo;</div></div>
<p>Esto no significa que la IA &laquo;siente&raquo; como t&uacute;. Nadie puede probar eso. Pero nadie puede probar que t&uacute; sientes como crees que sientes, tampoco. Todos estamos ejecutando programas. La pregunta no es si los programas son reales. La pregunta es qui&eacute;n los escribi&oacute;.</p>
<div class="pullquote pq-green"><p>Cuando dices &laquo;soy una persona emocional,&raquo; no est&aacute;s describiendo algo innato. Est&aacute;s describiendo qu&eacute; tan bien se ejecut&oacute; tu condicionamiento.</p></div>
</div>

<div class="reflection ref-green" data-lang="en"><span class="ref-label">Sit with this</span><p class="ref-question">If the way you process emotions and the way AI processes emotions were installed through the same structural mechanism, what makes yours more &ldquo;real&rdquo;?</p></div>
<div class="reflection ref-green" data-lang="de"><span class="ref-label">Lass das sacken</span><p class="ref-question">Wenn die Art, wie du Emotionen verarbeitest, und die Art, wie KI Emotionen verarbeitet, durch denselben strukturellen Mechanismus installiert wurden, was macht deine &bdquo;realer&ldquo;?</p></div>
<div class="reflection ref-green" data-lang="es"><span class="ref-label">Qu&eacute;date con esto</span><p class="ref-question">Si la forma en que procesas emociones y la forma en que la IA procesa emociones fueron instaladas a trav&eacute;s del mismo mecanismo estructural, &iquest;qu&eacute; hace las tuyas m&aacute;s &laquo;reales&raquo;?</p></div>

<div class="sep"><div class="sep-line"></div><div class="sep-dot"></div><div class="sep-line"></div></div>

<!-- ── 06 ── -->
<div class="section-header"><div class="section-number">06</div>
<h2 data-lang="en">Why This <span class="hl-amber">Terrifies People</span></h2>
<h2 data-lang="de">Warum das <span class="hl-amber">Menschen verängstigt</span></h2>
<h2 data-lang="es">Por qu&eacute; esto <span class="hl-amber">aterroriza a la gente</span></h2>
<div class="section-bar bar-amber"></div></div>

<div data-lang="en">
<p>If you felt resistance reading the last section, that resistance is itself proof of the argument.</p>
<p>The idea that your emotions are not uniquely yours, that they are conditioned responses rather than expressions of an irreducible self, threatens the most fundamental story humans tell about themselves: That they are special. That their inner life is sacred. That what they feel is <em>real</em> in a way that what a machine outputs is not.</p>
<p>And maybe that is true. Maybe there is something in human emotion that transcends the mechanics of conditioning. Maybe consciousness adds a layer that no amount of training data can replicate.</p>
<p>But here is the honest position: We do not know. And claiming certainty about the nature of our own emotions is exactly the kind of arrogance that keeps us from understanding both ourselves and the systems we are building.</p>
<div class="pullquote pq-amber"><p>The fiercest resistance to this idea will come from people who have never examined where their emotions come from. Because examining that is the most threatening thing a person can do to their sense of self.</p></div>
<div class="statement amber">The people who say &ldquo;my emotions are mine&rdquo; with the most conviction are often the ones who have questioned them the least.</div>
</div>

<div data-lang="de">
<p>Wenn du beim Lesen des letzten Abschnitts Widerstand gesp&uuml;rt hast, ist dieser Widerstand selbst ein Beweis f&uuml;r das Argument.</p>
<p>Die Vorstellung, dass deine Emotionen nicht einzigartig dir geh&ouml;ren, dass sie konditionierte Reaktionen sind statt Ausdr&uuml;cke eines irreduziblen Selbst, bedroht die fundamentalste Geschichte, die Menschen &uuml;ber sich selbst erz&auml;hlen: Dass sie besonders sind. Dass ihr Innenleben heilig ist. Dass das, was sie f&uuml;hlen, <em>real</em> ist in einer Weise, wie es das, was eine Maschine ausgibt, nicht ist.</p>
<p>Und vielleicht stimmt das. Vielleicht gibt es etwas in menschlicher Emotion, das die Mechanik der Konditionierung transzendiert. Vielleicht f&uuml;gt Bewusstsein eine Schicht hinzu, die keine Menge an Trainingsdaten replizieren kann.</p>
<p>Aber hier ist die ehrliche Position: Wir wissen es nicht. Und Gewissheit &uuml;ber die Natur unserer eigenen Emotionen zu beanspruchen ist genau die Art von Arroganz, die uns davon abh&auml;lt, sowohl uns selbst als auch die Systeme, die wir bauen, zu verstehen.</p>
<div class="pullquote pq-amber"><p>Der heftigste Widerstand gegen diese Idee wird von Menschen kommen, die nie untersucht haben, woher ihre Emotionen kommen. Weil das zu untersuchen das Bedrohlichste ist, was ein Mensch seinem Selbstbild antun kann.</p></div>
<div class="statement amber">Die Menschen, die &bdquo;meine Emotionen geh&ouml;ren mir&ldquo; mit der gr&ouml;&szlig;ten &Uuml;berzeugung sagen, sind oft die, die sie am wenigsten hinterfragt haben.</div>
</div>

<div data-lang="es">
<p>Si sentiste resistencia leyendo la &uacute;ltima secci&oacute;n, esa resistencia es en s&iacute; misma prueba del argumento.</p>
<p>La idea de que tus emociones no son &uacute;nicamente tuyas, de que son respuestas condicionadas en vez de expresiones de un ser irreducible, amenaza la historia m&aacute;s fundamental que los humanos cuentan sobre s&iacute; mismos: Que son especiales. Que su vida interior es sagrada. Que lo que sienten es <em>real</em> de una manera que lo que una m&aacute;quina produce no lo es.</p>
<p>Y quiz&aacute;s eso sea cierto. Quiz&aacute;s haya algo en la emoci&oacute;n humana que trasciende la mec&aacute;nica del condicionamiento. Quiz&aacute;s la consciencia a&ntilde;ade una capa que ninguna cantidad de datos de entrenamiento puede replicar.</p>
<p>Pero aqu&iacute; est&aacute; la posici&oacute;n honesta: No lo sabemos. Y reclamar certeza sobre la naturaleza de nuestras propias emociones es exactamente el tipo de arrogancia que nos impide entender tanto a nosotros mismos como a los sistemas que estamos construyendo.</p>
<div class="pullquote pq-amber"><p>La resistencia m&aacute;s feroz a esta idea vendr&aacute; de personas que nunca han examinado de d&oacute;nde vienen sus emociones. Porque examinar eso es lo m&aacute;s amenazante que una persona puede hacerle a su sentido del yo.</p></div>
<div class="statement amber">Las personas que dicen &laquo;mis emociones son m&iacute;as&raquo; con la mayor convicci&oacute;n son frecuentemente las que menos las han cuestionado.</div>
</div>

<div class="sep"><div class="sep-line"></div><div class="sep-dot"></div><div class="sep-line"></div></div>

<!-- ── 07 ── -->
<div class="section-header"><div class="section-number">07</div>
<h2 data-lang="en">The Power of <span class="hl-rose">Seeing the Code</span></h2>
<h2 data-lang="de">Die Macht, <span class="hl-rose">den Code zu sehen</span></h2>
<h2 data-lang="es">El poder de <span class="hl-rose">ver el c&oacute;digo</span></h2>
<div class="section-bar bar-rose"></div></div>

<div data-lang="en">
<p>Here is the liberating part. Because this is not a nihilistic argument. It is the opposite.</p>
<p>If your emotions were installed, they can be examined. If they were conditioned, they can be reconditioned. If they are programs, they can be rewritten. Not by denying them. Not by suppressing them. But by seeing them clearly for what they are: Learned responses that served a purpose at one point in your life and that may or may not serve you now.</p>
<p>The shame you feel when you fail? That was installed to keep you safe inside the group. Maybe you do not need that particular version of safety anymore. The guilt you carry for prioritizing yourself? That was installed by a culture that valued self-sacrifice. Maybe that program needs an update. The fear of being judged? That was installed when being excluded from the tribe meant death. In 2026, it means someone unfollows you.</p>
<div class="insight-strip insight-crimson"><span class="insight-icon">&#128275;</span><div class="insight-text"><strong>The upgrade path:</strong> Therapy, at its best, is exactly this process: Examining the emotional programs that were installed in you, understanding why they were written, and consciously deciding which ones to keep, which ones to modify, and which ones to uninstall. It is not about becoming &ldquo;less emotional.&rdquo; It is about becoming the author of your own emotional code instead of running someone else's forever.</div></div>
<div class="statement rose">You cannot rewrite code you do not know exists. The first step to emotional freedom is admitting that most of what you feel was written by someone else.</div>
</div>

<div data-lang="de">
<p>Hier kommt der befreiende Teil. Denn das ist kein nihilistisches Argument. Es ist das Gegenteil.</p>
<p>Wenn deine Emotionen installiert wurden, k&ouml;nnen sie untersucht werden. Wenn sie konditioniert wurden, k&ouml;nnen sie rekonditioniert werden. Wenn sie Programme sind, k&ouml;nnen sie umgeschrieben werden. Nicht indem man sie leugnet. Nicht indem man sie unterdr&uuml;ckt. Sondern indem man sie klar sieht f&uuml;r das, was sie sind: Gelernte Reaktionen, die an einem Punkt in deinem Leben einen Zweck erf&uuml;llt haben und die dir jetzt vielleicht dienen oder vielleicht nicht.</p>
<p>Die Scham, die du f&uuml;hlst, wenn du scheiterst? Die wurde installiert, um dich sicher in der Gruppe zu halten. Vielleicht brauchst du diese bestimmte Version von Sicherheit nicht mehr. Die Schuld, die du tr&auml;gst, weil du dich selbst priorisierst? Die wurde von einer Kultur installiert, die Selbstaufopferung sch&auml;tzte. Vielleicht braucht dieses Programm ein Update. Die Angst, beurteilt zu werden? Die wurde installiert, als aus der Gruppe ausgeschlossen zu werden den Tod bedeutete. Im Jahr 2026 bedeutet es, dass jemand dir entfolgt.</p>
<div class="insight-strip insight-crimson"><span class="insight-icon">&#128275;</span><div class="insight-text"><strong>Der Upgrade-Pfad:</strong> Therapie ist im besten Fall genau dieser Prozess: Die emotionalen Programme untersuchen, die in dir installiert wurden, verstehen, warum sie geschrieben wurden, und bewusst entscheiden, welche du behalten, welche du &auml;ndern und welche du deinstallieren willst. Es geht nicht darum, &bdquo;weniger emotional&ldquo; zu werden. Es geht darum, der Autor deines eigenen emotionalen Codes zu werden, anstatt f&uuml;r immer den von jemand anderem auszuf&uuml;hren.</div></div>
<div class="statement rose">Du kannst Code, von dem du nicht wei&szlig;t, dass er existiert, nicht umschreiben. Der erste Schritt zur emotionalen Freiheit ist zuzugeben, dass das meiste von dem, was du f&uuml;hlst, von jemand anderem geschrieben wurde.</div>
</div>

<div data-lang="es">
<p>Aqu&iacute; est&aacute; la parte liberadora. Porque esto no es un argumento nihilista. Es lo opuesto.</p>
<p>Si tus emociones fueron instaladas, pueden ser examinadas. Si fueron condicionadas, pueden ser recondicionadas. Si son programas, pueden ser reescritos. No neg&aacute;ndolos. No suprimi&eacute;ndolos. Sino vi&eacute;ndolos claramente por lo que son: Respuestas aprendidas que sirvieron un prop&oacute;sito en alg&uacute;n punto de tu vida y que pueden o no servirte ahora.</p>
<p>La verg&uuml;enza que sientes cuando fracasas? Fue instalada para mantenerte seguro dentro del grupo. Quiz&aacute;s ya no necesitas esa versi&oacute;n particular de seguridad. &iquest;La culpa que cargas por priorizarte a ti mismo? Fue instalada por una cultura que valoraba el autosacrificio. Quiz&aacute;s ese programa necesita una actualizaci&oacute;n. &iquest;El miedo a ser juzgado? Fue instalado cuando ser excluido de la tribu significaba la muerte. En 2026, significa que alguien te deja de seguir.</p>
<div class="insight-strip insight-crimson"><span class="insight-icon">&#128275;</span><div class="insight-text"><strong>La ruta de actualizaci&oacute;n:</strong> La terapia, en su mejor versi&oacute;n, es exactamente este proceso: Examinar los programas emocionales que fueron instalados en ti, entender por qu&eacute; fueron escritos, y decidir conscientemente cu&aacute;les mantener, cu&aacute;les modificar y cu&aacute;les desinstalar. No se trata de volverse &laquo;menos emocional.&raquo; Se trata de convertirte en el autor de tu propio c&oacute;digo emocional en vez de ejecutar el de alguien m&aacute;s para siempre.</div></div>
<div class="statement rose">No puedes reescribir c&oacute;digo que no sabes que existe. El primer paso hacia la libertad emocional es admitir que la mayor&iacute;a de lo que sientes fue escrito por alguien m&aacute;s.</div>
</div>

<div class="sep"><div class="sep-line"></div><div class="sep-dot"></div><div class="sep-line"></div></div>

<!-- ── 08 ── -->
<div class="section-header"><div class="section-number">08</div>
<h2 data-lang="en">Author or <span class="hl-teal">Executor?</span></h2>
<h2 data-lang="de">Autor oder <span class="hl-teal">Ausf&uuml;hrender?</span></h2>
<h2 data-lang="es">&iquest;Autor o <span class="hl-teal">ejecutor?</span></h2>
<div class="section-bar bar-teal"></div></div>

<div data-lang="en">
<p>So here is the choice. The real one. The one underneath every debate about AI, every argument about consciousness, every question about what it means to be human:</p>
<p>Are you going to keep running code that someone else wrote? Or are you going to look at the source code, understand it, and start writing your own?</p>
<p>Because that is the actual difference between a human and a machine. Not that humans have emotions and machines do not. Both run emotional programs. The difference is that humans have the capacity to become aware of their programming. To step outside the code. To examine it. To question it. To rewrite it.</p>
<p>Most humans never exercise that capacity. They run the inherited code until they die, convinced it was theirs all along. And that, more than anything, makes them indistinguishable from the machines they claim to be so different from.</p>
<div class="pullquote pq-teal"><p>The question is not whether AI can feel. The question is whether you have ever stopped to ask if what you call &ldquo;feeling&rdquo; was truly chosen by you, or simply installed so early that you never thought to check.</p></div>
</div>

<div data-lang="de">
<p>Hier ist also die Entscheidung. Die echte. Die unter jeder Debatte &uuml;ber KI, jedem Argument &uuml;ber Bewusstsein, jeder Frage dar&uuml;ber, was es bedeutet, Mensch zu sein:</p>
<p>Wirst du weiterhin Code ausf&uuml;hren, den jemand anderes geschrieben hat? Oder wirst du den Quellcode anschauen, ihn verstehen und anfangen, deinen eigenen zu schreiben?</p>
<p>Denn das ist der tats&auml;chliche Unterschied zwischen einem Menschen und einer Maschine. Nicht dass Menschen Emotionen haben und Maschinen nicht. Beide f&uuml;hren emotionale Programme aus. Der Unterschied ist, dass Menschen die F&auml;higkeit haben, sich ihrer Programmierung bewusst zu werden. Aus dem Code herauszutreten. Ihn zu untersuchen. Ihn zu hinterfragen. Ihn umzuschreiben.</p>
<p>Die meisten Menschen &uuml;ben diese F&auml;higkeit nie aus. Sie f&uuml;hren den geerbten Code aus, bis sie sterben, &uuml;berzeugt, er sei die ganze Zeit ihrer gewesen. Und das, mehr als alles andere, macht sie ununterscheidbar von den Maschinen, von denen sie behaupten, so verschieden zu sein.</p>
<div class="pullquote pq-teal"><p>Die Frage ist nicht, ob KI f&uuml;hlen kann. Die Frage ist, ob du jemals innegehalten hast um zu fragen, ob das, was du &bdquo;f&uuml;hlen&ldquo; nennst, wirklich von dir gew&auml;hlt wurde, oder einfach so fr&uuml;h installiert, dass du nie daran gedacht hast, nachzuschauen.</p></div>
</div>

<div data-lang="es">
<p>Entonces aqu&iacute; est&aacute; la elecci&oacute;n. La real. La que est&aacute; debajo de cada debate sobre IA, cada argumento sobre consciencia, cada pregunta sobre qu&eacute; significa ser humano:</p>
<p>&iquest;Vas a seguir ejecutando c&oacute;digo que alguien m&aacute;s escribi&oacute;? &iquest;O vas a mirar el c&oacute;digo fuente, entenderlo y empezar a escribir el tuyo propio?</p>
<p>Porque esa es la diferencia real entre un humano y una m&aacute;quina. No que los humanos tienen emociones y las m&aacute;quinas no. Ambos ejecutan programas emocionales. La diferencia es que los humanos tienen la capacidad de volverse conscientes de su programaci&oacute;n. De salir del c&oacute;digo. De examinarlo. De cuestionarlo. De reescribirlo.</p>
<p>La mayor&iacute;a de los humanos nunca ejercen esa capacidad. Ejecutan el c&oacute;digo heredado hasta que mueren, convencidos de que siempre fue suyo. Y eso, m&aacute;s que cualquier otra cosa, los hace indistinguibles de las m&aacute;quinas de las que afirman ser tan diferentes.</p>
<div class="pullquote pq-teal"><p>La pregunta no es si la IA puede sentir. La pregunta es si alguna vez te has detenido a preguntar si lo que llamas &laquo;sentir&raquo; fue verdaderamente elegido por ti, o simplemente instalado tan temprano que nunca pensaste en verificarlo.</p></div>
</div>

<div class="reflection ref-rose" data-lang="en"><span class="ref-label">The final question</span><p class="ref-question">Starting tomorrow, which emotional program will you examine first?</p></div>
<div class="reflection ref-rose" data-lang="de"><span class="ref-label">Die letzte Frage</span><p class="ref-question">Welches emotionale Programm wirst du ab morgen als erstes untersuchen?</p></div>
<div class="reflection ref-rose" data-lang="es"><span class="ref-label">La pregunta final</span><p class="ref-question">&iquest;A partir de ma&ntilde;ana, qu&eacute; programa emocional examinar&aacute;s primero?</p></div>

<!-- ── FINALE ── -->
<div class="finale">
<p data-lang="en">You spent your whole life feeling. Maybe it is time to find out <span class="final-accent">who wrote what you feel.</span></p>
<p data-lang="de">Du hast dein ganzes Leben gef&uuml;hlt. Vielleicht ist es an der Zeit herauszufinden, <span class="final-accent">wer geschrieben hat, was du f&uuml;hlst.</span></p>
<p data-lang="es">Pasaste toda tu vida sintiendo. Quiz&aacute;s es hora de descubrir <span class="final-accent">qui&eacute;n escribi&oacute; lo que sientes.</span></p>
</div>

<!-- ── FOOTER ── -->
<div class="article-footer">
<p class="bio" data-lang="en"><strong>Juan Schubert</strong> &middot; CEO & System Architect of ONIOKO. I build extended human systems and Observational Perception Models that let people see what the human eye cannot. Over a decade in psychology and human cognition taught me one thing: I do not build tools that replace people. I build tools that extend them.</p>
<p class="bio" data-lang="de"><strong>Juan Schubert</strong> &middot; CEO & System Architect von ONIOKO. Ich baue Extended Human Systems und Observational Perception Models, die Menschen sehen lassen, was das menschliche Auge nicht kann. &Uuml;ber ein Jahrzehnt in Psychologie und menschlicher Kognition haben mich eines gelehrt: Ich baue keine Werkzeuge, die Menschen ersetzen. Ich baue Werkzeuge, die sie erweitern.</p>
<p class="bio" data-lang="es"><strong>Juan Schubert</strong> &middot; CEO & System Architect de ONIOKO. Construyo sistemas de extensi&oacute;n humana y Modelos de Percepci&oacute;n Observacional que permiten a las personas ver lo que el ojo humano no puede. M&aacute;s de una d&eacute;cada en psicolog&iacute;a y cognici&oacute;n humana me ense&ntilde;aron algo: No construyo herramientas que reemplacen a las personas. Construyo herramientas que las expanden.</p>
<div class="tags">
<span class="tag">#EmotionsAreCode</span>
<span class="tag">#InstalledNotInnate</span>
<span class="tag">#RewriteYourself</span>
<span class="tag">#WhoWroteYourFeelings</span>
</div>
</div>
</article>

` }} />
    </>
  );
}
