"use client";
import React from "react";

const WHATSAPP_ACEITAR = "https://wa.me/5511914767026?text=Ol%C3%A1%20Guilherme!%20Aceito%20a%20proposta%20da%20landing%20page%20da%20JS%20Po%C3%A7os%20por%20R%24%20600%2C00.%20Podemos%20come%C3%A7ar!";
const WHATSAPP_DUVIDAS = "https://wa.me/5511914767026?text=Ol%C3%A1%20Guilherme!%20Recebi%20a%20proposta%20e%20gostaria%20de%20tirar%20algumas%20d%C3%BAvidas.";

/* ─── CSS ────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600;700&display=swap');

  .pp * { box-sizing: border-box; margin: 0; padding: 0; }
  .pp {
    font-family: var(--tp-ff-marcellus), 'Marcellus', Georgia, serif;
    background: #05111f;
    color: #d4e6f5;
    min-height: 100vh;
    line-height: 1.6;
  }

  /* Force Marcellus on headings — overrides global SCSS h1/h2 rules */
  .pp h1, .pp h2, .pp h3,
  .pp .pp-section-title,
  .pp .pp-hero h1,
  .pp .pp-cta h2,
  .pp .pp-scope-title,
  .pp .pp-guarantee-title,
  .pp .pp-payment-amount,
  .pp .pp-price-value,
  .pp .pp-host-card-name,
  .pp .pp-sig-name {
    font-family: var(--tp-ff-marcellus), 'Marcellus', Georgia, serif !important;
    font-weight: 400;
  }

  /* Small caps / UI elements use Inter */
  .pp-section-eyebrow, .pp-hero-badge, .pp-meta-pill, .pp-payment-step,
  .pp-btn-primary, .pp-btn-ghost, .pp-footer, .pp-scope-desc, .pp-host-card-desc,
  .pp-guarantee-desc, .pp-result-item, .pp-client-field p, .pp-cta p,
  .pp-sig-role, .pp-section-desc, .pp-intro-card p, .pp-timeline-badge,
  .pp-host-free, .pp-diferencial-badge, .pp-price-badge, .pp-price-label,
  .pp-payment-when, .pp-host-link, .pp-host-price {
    font-family: 'Inter', system-ui, sans-serif;
  }

  /* ── Container ── */
  .pp-wrap { max-width: 880px; margin: 0 auto; padding: 0 20px; }

  /* ── Hero ── */
  .pp-hero {
    background: linear-gradient(160deg, #040f1d 0%, #081e36 55%, #041a2c 100%);
    border-bottom: 1px solid rgba(0,198,204,.1);
    padding: 88px 20px 80px;
    text-align: center;
    position: relative; overflow: hidden;
  }
  .pp-hero::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 700px 420px at 75% -5%, rgba(0,198,204,.13) 0%, transparent 65%),
      radial-gradient(ellipse 500px 350px at 15% 100%, rgba(0,100,180,.1) 0%, transparent 65%);
  }
  .pp-hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(0,198,204,.07); border: 1px solid rgba(0,198,204,.22);
    border-radius: 100px; padding: 7px 18px;
    font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: #00C6CC;
    margin-bottom: 32px;
  }
  .pp-pulse { width: 6px; height: 6px; border-radius: 50%; background: #00C6CC; display: inline-block; animation: pp-pulse 2s infinite; }
  @keyframes pp-pulse { 0%,100%{opacity:1} 50%{opacity:.35} }

  .pp-hero h1 {
    font-size: clamp(40px, 7vw, 80px);
    font-weight: 400; /* Marcellus is always 400 */
    line-height: 1.06;
    color: #fff;
    margin-bottom: 20px;
    letter-spacing: -.01em;
  }
  .pp-hero h1 em { font-style: italic; color: #00C6CC; }

  .pp-hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: 16px; color: #7fa8c8; max-width: 520px; margin: 0 auto 44px;
    line-height: 1.7;
  }

  .pp-pills {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;
    margin-bottom: 44px;
  }
  .pp-meta-pill {
    display: flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
    border-radius: 8px; padding: 9px 16px;
    font-size: 13px; color: #a8c8e0; letter-spacing: .01em;
  }
  .pp-meta-pill i { color: #00C6CC; font-size: 13px; }

  .pp-hero-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
  .pp-btn-primary {
    display: inline-flex; align-items: center; gap: 9px;
    background: #00C6CC; color: #031a2a;
    font-weight: 700; font-size: 14px; letter-spacing: .02em;
    padding: 15px 28px; border-radius: 10px;
    text-decoration: none; border: none; cursor: pointer;
    transition: background .2s, transform .2s; white-space: nowrap;
  }
  .pp-btn-primary:hover { background: #00dae3; transform: translateY(-1px); }
  .pp-btn-ghost {
    display: inline-flex; align-items: center; gap: 9px;
    background: transparent; color: #a8c8e0;
    font-weight: 600; font-size: 14px;
    padding: 15px 28px; border-radius: 10px;
    border: 1.5px solid rgba(255,255,255,.1);
    text-decoration: none; cursor: pointer;
    transition: border-color .2s, color .2s; white-space: nowrap;
  }
  .pp-btn-ghost:hover { border-color: rgba(0,198,204,.45); color: #00C6CC; }

  /* ── Divider ── */
  .pp-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(0,198,204,.12), transparent); }

  /* ── Section ── */
  .pp-section { padding: 72px 20px; }
  .pp-section.dark { background: #040f1d; }

  .pp-section-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
    color: #00C6CC; font-weight: 600;
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 14px;
  }
  .pp-section-eyebrow::after { content: ''; flex: 1; height: 1px; background: rgba(0,198,204,.18); }

  .pp-section-title { font-size: clamp(28px, 4.5vw, 48px); color: #fff; font-weight: 400; line-height: 1.15; margin-bottom: 10px; }
  .pp-section-title em { font-style: italic; color: #00C6CC; }
  .pp-section-desc { font-family: 'Inter', sans-serif; font-size: 15px; color: #7fa8c8; line-height: 1.7; margin-bottom: 36px; }

  /* ── Intro card ── */
  .pp-intro-card {
    background: rgba(10,30,52,.7); border: 1px solid rgba(0,198,204,.12);
    border-radius: 18px; padding: 40px 44px;
  }
  .pp-intro-card p { font-size: 17px; line-height: 1.85; color: #c0d8ec; margin-bottom: 18px; }
  .pp-intro-card p:last-of-type { margin-bottom: 0; }
  .pp-intro-card strong { color: #fff; }
  .pp-sig { margin-top: 32px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,.06); display: flex; align-items: center; gap: 14px; }
  .pp-sig-avatar {
    width: 46px; height: 46px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, #00C6CC, #0070aa);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 17px; color: #031a2a;
    font-family: 'Inter', sans-serif;
  }
  .pp-sig-name { font-size: 15px; color: #fff; margin-bottom: 2px; }
  .pp-sig-role { font-family: 'Inter', sans-serif; font-size: 12px; color: #7fa8c8; }

  /* ── Results strip ── */
  .pp-results {
    display: flex; flex-wrap: wrap; gap: 0;
    margin-top: 24px;
    border: 1px solid rgba(0,198,204,.12); border-radius: 12px; overflow: hidden;
  }
  .pp-result-item {
    flex: 1; min-width: 200px;
    display: flex; align-items: center; gap: 12px;
    padding: 18px 22px;
    border-right: 1px solid rgba(0,198,204,.1);
    background: rgba(0,198,204,.03);
    font-size: 13px; color: #a8c8e0;
  }
  .pp-result-item:last-child { border-right: none; }
  .pp-result-item i { color: #00C6CC; font-size: 17px; flex-shrink: 0; }
  .pp-result-item strong { color: #fff; display: block; font-size: 14px; margin-bottom: 2px; }

  /* ── Scope ── */
  /* 6 items → 3 cols on desktop, 2 on tablet, 1 on mobile */
  .pp-scope-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  @media (max-width: 760px) { .pp-scope-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .pp-scope-grid { grid-template-columns: 1fr; } }

  .pp-scope-item {
    background: rgba(8,22,42,.8); border: 1px solid rgba(0,198,204,.08);
    border-radius: 14px; padding: 24px 22px;
    transition: border-color .2s, transform .2s;
  }
  .pp-scope-item:hover { border-color: rgba(0,198,204,.28); transform: translateY(-2px); }
  .pp-scope-num {
    font-family: 'Inter', sans-serif;
    width: 34px; height: 34px; border-radius: 9px;
    background: rgba(0,198,204,.1); color: #00C6CC;
    font-size: 12px; font-weight: 700; letter-spacing: .05em;
    display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
  }
  .pp-scope-title { font-size: 16px; color: #fff; margin-bottom: 8px; }
  .pp-scope-desc { font-size: 13px; color: #7fa8c8; line-height: 1.6; }

  /* ── Pricing ── */
  .pp-price-card {
    background: linear-gradient(145deg, #051629 0%, #092340 100%);
    border: 1px solid rgba(0,198,204,.22);
    border-radius: 22px; padding: 52px 48px;
    text-align: center; position: relative; overflow: hidden;
  }
  .pp-price-card::after {
    content: ''; position: absolute; top: -120px; right: -120px;
    width: 360px; height: 360px; border-radius: 50%; pointer-events: none;
    background: radial-gradient(circle, rgba(0,198,204,.08) 0%, transparent 70%);
  }
  .pp-price-badge {
    font-family: 'Inter', sans-serif;
    display: inline-block;
    background: rgba(0,198,204,.1); border: 1px solid rgba(0,198,204,.28);
    border-radius: 100px; padding: 6px 20px;
    font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
    color: #00C6CC; font-weight: 700; margin-bottom: 28px;
  }
  .pp-price-value { font-size: clamp(64px, 12vw, 100px); color: #fff; line-height: 1; margin-bottom: 6px; }
  .pp-price-value sup { font-size: clamp(24px, 4vw, 34px); color: #00C6CC; vertical-align: super; font-family: 'Inter', sans-serif; font-weight: 700; }
  .pp-price-label { font-family: 'Inter', sans-serif; font-size: 14px; color: #7fa8c8; margin-bottom: 44px; }

  /* 2 payment items - always side by side, full width */
  .pp-payment-split { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; max-width: 440px; margin: 0 auto 40px; }
  @media (max-width: 480px) { .pp-payment-split { grid-template-columns: 1fr 1fr; gap: 12px; } }
  .pp-payment-item {
    background: rgba(0,0,0,.22); border: 1px solid rgba(255,255,255,.08);
    border-radius: 14px; padding: 22px 16px; text-align: center;
  }
  .pp-payment-step { font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: #7fa8c8; margin-bottom: 10px; }
  .pp-payment-amount { font-family: 'Marcellus', Georgia, serif; font-size: 30px; color: #00C6CC; margin-bottom: 6px; }
  .pp-payment-when { font-size: 12px; color: #a8c8e0; }

  .pp-timeline-badge {
    display: inline-flex; align-items: center; gap: 9px;
    background: rgba(255,193,7,.06); border: 1px solid rgba(255,193,7,.18);
    border-radius: 10px; padding: 12px 22px;
    font-size: 13px; color: #f5bc00; font-weight: 600;
  }

  /* ── Hosting — always 2 cols on md+, 1 on mobile ── */
  .pp-host-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
  @media (max-width: 560px) { .pp-host-grid { grid-template-columns: 1fr; } }

  .pp-host-card {
    background: rgba(8,22,42,.8); border: 1px solid rgba(255,255,255,.07);
    border-radius: 14px; padding: 26px 24px; display: flex; flex-direction: column; gap: 8px;
    transition: border-color .2s;
  }
  .pp-host-card:hover { border-color: rgba(0,198,204,.22); }
  .pp-host-card-name {
    font-size: 16px; color: #fff; margin-bottom: 4px;
    display: flex; align-items: center; gap: 9px;
  }
  .pp-host-card-name i { color: #00C6CC; }
  .pp-host-price { font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 700; color: #00C6CC; }
  .pp-host-price small { font-size: 13px; font-weight: 400; color: #7fa8c8; }
  .pp-host-card-desc { font-size: 13px; color: #7fa8c8; line-height: 1.6; }
  .pp-host-link {
    display: inline-flex; align-items: center; gap: 6px;
    color: #00C6CC; font-size: 12px; font-weight: 600; text-decoration: none; margin-top: 6px;
    font-family: 'Inter', sans-serif; letter-spacing: .03em;
  }
  .pp-host-link:hover { text-decoration: underline; }
  .pp-host-free {
    display: flex; align-items: center; gap: 12px;
    background: rgba(0,198,204,.05); border: 1px solid rgba(0,198,204,.14);
    border-radius: 12px; padding: 16px 22px; font-size: 14px; color: #a8c8e0;
  }
  .pp-host-free i { color: #00C6CC; font-size: 18px; flex-shrink: 0; }
  .pp-host-free strong { color: #fff; }

  /* ── Guarantees — 3 cols on md+, 1 col on mobile ── */
  .pp-guarantee-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  @media (max-width: 680px) { .pp-guarantee-grid { grid-template-columns: 1fr; } }

  .pp-guarantee-item {
    background: rgba(8,22,42,.8); border: 1px solid rgba(0,198,204,.08);
    border-radius: 14px; padding: 28px 24px;
  }
  .pp-guarantee-icon {
    width: 46px; height: 46px; border-radius: 13px;
    background: rgba(0,198,204,.09);
    display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
  }
  .pp-guarantee-icon i { color: #00C6CC; font-size: 19px; }
  .pp-guarantee-title { font-size: 17px; color: #fff; margin-bottom: 8px; }
  .pp-guarantee-desc { font-size: 13px; color: #7fa8c8; line-height: 1.6; }

  /* ── Client info — 4 cols → 2 cols → 1 col ── */
  .pp-client-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
    background: rgba(8,22,42,.7); border: 1px solid rgba(255,255,255,.07); border-radius: 18px;
    overflow: hidden;
  }
  @media (max-width: 780px) { .pp-client-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 460px) { .pp-client-grid { grid-template-columns: 1fr; } }

  .pp-client-field {
    padding: 24px 22px;
    border-right: 1px solid rgba(255,255,255,.05);
    border-bottom: 1px solid rgba(255,255,255,.05);
  }
  .pp-client-field:nth-child(4n) { border-right: none; }
  @media (max-width: 780px) {
    .pp-client-field:nth-child(4n) { border-right: 1px solid rgba(255,255,255,.05); }
    .pp-client-field:nth-child(2n) { border-right: none; }
  }
  @media (max-width: 460px) {
    .pp-client-field { border-right: none; }
  }
  .pp-client-field label {
    display: block; font-family: 'Inter', sans-serif;
    font-size: 10px; letter-spacing: .13em; text-transform: uppercase;
    color: #6a90ab; margin-bottom: 8px; font-weight: 600;
  }
  .pp-client-field p { font-size: 14px; color: #c0d8ec; line-height: 1.65; }
  .pp-client-field a { color: #00C6CC; text-decoration: none; }
  .pp-client-field a:hover { text-decoration: underline; }
  .pp-diferencial-badge {
    font-family: 'Inter', sans-serif;
    display: inline-flex; align-items: center; gap: 5px; margin-top: 8px;
    background: rgba(0,198,204,.07); border: 1px solid rgba(0,198,204,.18);
    border-radius: 6px; padding: 3px 9px; font-size: 11px; color: #00C6CC; font-weight: 600;
  }

  /* ── CTA ── */
  .pp-cta {
    text-align: center; padding: 88px 20px 80px;
    background: linear-gradient(160deg, #040f1d, #051524);
    border-top: 1px solid rgba(0,198,204,.08);
  }
  .pp-cta h2 { font-size: clamp(32px, 5vw, 60px); color: #fff; margin-bottom: 16px; }
  .pp-cta h2 em { font-style: italic; color: #00C6CC; }
  .pp-cta p { font-family: 'Inter', sans-serif; font-size: 15px; color: #7fa8c8; margin-bottom: 36px; }
  .pp-cta-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }

  /* ── Footer ── */
  .pp-footer {
    background: #030c18; border-top: 1px solid rgba(255,255,255,.04);
    text-align: center; padding: 26px 20px; font-size: 13px; color: #3a5570;
  }
  .pp-footer a { color: #00C6CC; text-decoration: none; }

  /* ── Responsive misc ── */
  @media (max-width: 600px) {
    .pp-section { padding: 56px 20px; }
    .pp-intro-card { padding: 28px 22px; }
    .pp-price-card { padding: 40px 24px; }
    .pp-results { flex-direction: column; }
    .pp-result-item { border-right: none; border-bottom: 1px solid rgba(0,198,204,.1); }
    .pp-result-item:last-child { border-bottom: none; }
  }
`;

/* ─── Data ──────────────────────────────────────────────────────────── */
const SCOPE = [
  { n: "01", title: "Landing page responsiva", desc: "Desktop, tablet e mobile. Testado em todos os navegadores modernos." },
  { n: "02", title: "Design no estilo do mockup", desc: "Paleta azul/água com hero, serviços, produtos e contato." },
  { n: "03", title: "Conteúdo sobre poços", desc: "Textos para semi-artesianos, artesianos, manutenção e materiais." },
  { n: "04", title: "Formulário + WhatsApp", desc: "Formulário funcional + botão WhatsApp com (11) 97149-5585." },
  { n: "05", title: "SEO local – Atibaia/SP", desc: "Meta tags e conteúdo otimizados para buscas locais em Atibaia." },
  { n: "06", title: "Arquivos prontos para subir", desc: "Entrega final com suporte gratuito na publicação e configuração." },
];

const CLIENT_FIELDS = [
  { label: "Razão Social", value: <><p>JS Poços Semi &amp; Artesiano</p><p>Jurandir dos Santos</p><div className="pp-diferencial-badge"><i className="fa-light fa-award" />+25 anos</div></> },
  { label: "CNPJ", value: <p>20.415.441/0001-61</p> },
  { label: "Endereço Sede", value: <p>Estrada Capibaribe, 8<br />Estância Lynce<br />Atibaia-SP · 12949-073</p> },
  { label: "Loja Física", value: <p>Rua João Ramalho, 323<br />Tubos, bombas, conexões</p> },
  { label: "WhatsApp", value: <p><a href="https://wa.me/5511971495585" target="_blank" rel="noopener noreferrer">(11) 97149-5585</a></p> },
  { label: "Redes Sociais", value: <p><a href="https://instagram.com/js_pocos_" target="_blank" rel="noopener noreferrer">@js_pocos_</a><br /><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">JS poços semi &amp; artesiano</a></p> },
  { label: "Serviços", value: <p>Perfuração semi-artesiana<br />Perfuração artesiana<br />Manutenção e limpeza</p> },
  { label: "Foco SEO", value: <p>Atibaia – SP e região</p> },
];

/* ─── Component ─────────────────────────────────────────────────────── */
export default function PropostaJsPocos() {
  return (
    <>
      <style suppressHydrationWarning>{css}</style>
      <div className="pp">

        {/* ── HERO ── */}
        <section className="pp-hero">
          <div className="pp-hero-badge">
            <span className="pp-pulse" />&nbsp;Proposta Comercial · Fev 2026
          </div>
          <h1>Landing Page para<br /><em>JS Poços</em></h1>
          <p className="pp-hero-sub">
            Olá, Giovana! Segue a proposta completa para desenvolvemos a landing page
            da JS Poços — com tudo que vocês precisam para aparecer no Google e
            receber mais clientes pelo WhatsApp.
          </p>
          <div className="pp-pills">
            <span className="pp-meta-pill"><i className="fa-light fa-circle-dollar" />R$ 600,00</span>
            <span className="pp-meta-pill"><i className="fa-light fa-clock" />7 a 10 dias</span>
            <span className="pp-meta-pill"><i className="fa-light fa-location-dot" />Atibaia – SP</span>
            <span className="pp-meta-pill"><i className="fa-light fa-mobile" />Responsivo</span>
          </div>
          <div className="pp-hero-actions">
            <a className="pp-btn-primary" href={WHATSAPP_ACEITAR} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-whatsapp" />Aceitar Proposta
            </a>
            <a className="pp-btn-ghost" href={WHATSAPP_DUVIDAS} target="_blank" rel="noopener noreferrer">
              <i className="fa-light fa-comment" />Tirar dúvidas
            </a>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="pp-section dark">
          <div className="pp-wrap">
            <div className="pp-section-eyebrow">01 — Mensagem</div>
            <h2 className="pp-section-title">Uma palavra <em>rápida</em></h2>
            <div className="pp-intro-card">
              <p>
                Giovana, obrigado pela confiança! Vou desenvolver a landing page da{" "}
                <strong>JS Poços Semi &amp; Artesiano</strong> seguindo a linha visual do
                mockup — com a paleta de azuis e tons de água que combinam perfeitamente
                com o segmento de poços.
              </p>
              <p>
                O site vai apresentar os serviços de <strong>perfuração, manutenção</strong> e
                a <strong>loja de materiais</strong>, com formulário de contato e botão WhatsApp
                integrado. Tudo otimizado para SEO local em <strong>Atibaia‑SP</strong>,
                responsivo e pronto para subir.
              </p>
              <p>Qualquer dúvida, é só me chamar no WhatsApp!</p>
              <div className="pp-sig">
                <div className="pp-sig-avatar">G</div>
                <div>
                  <div className="pp-sig-name">Guilherme Brandão</div>
                  <div className="pp-sig-role">Desenvolvedor Web · guilhermebrandao.dev</div>
                </div>
              </div>
            </div>
            <div className="pp-results">
              <div className="pp-result-item">
                <i className="fa-light fa-arrow-trend-up" />
                <div><strong>+ Leads via WhatsApp</strong>botão direto na página</div>
              </div>
              <div className="pp-result-item">
                <i className="fa-light fa-magnifying-glass" />
                <div><strong>Destaque no Google</strong>&quot;poços Atibaia&quot;</div>
              </div>
              <div className="pp-result-item">
                <i className="fa-light fa-medal" />
                <div><strong>Credibilidade</strong>presença digital profissional</div>
              </div>
            </div>
          </div>
        </section>

        <div className="pp-divider" />

        {/* ── SCOPE ── */}
        <section className="pp-section">
          <div className="pp-wrap">
            <div className="pp-section-eyebrow">02 — Escopo</div>
            <h2 className="pp-section-title">O que está <em>incluso</em></h2>
            <p className="pp-section-desc">Seis entregáveis contemplados no valor, sem surpresas.</p>
            <div className="pp-scope-grid">
              {SCOPE.map((s) => (
                <div key={s.n} className="pp-scope-item">
                  <div className="pp-scope-num">{s.n}</div>
                  <div className="pp-scope-title">{s.title}</div>
                  <div className="pp-scope-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="pp-divider" />

        {/* ── PRICING ── */}
        <section className="pp-section dark">
          <div className="pp-wrap">
            <div className="pp-section-eyebrow">03 — Investimento</div>
            <h2 className="pp-section-title">Valor &amp; <em>Pagamento</em></h2>
            <p className="pp-section-desc">Dividido em duas parcelas para facilitar o início.</p>
            <div className="pp-price-card">
              <div className="pp-price-badge">Landing Page Completa</div>
              <div className="pp-price-value"><sup>R$</sup>600</div>
              <div className="pp-price-label">Valor total · Projeto único</div>
              <div className="pp-payment-split">
                <div className="pp-payment-item">
                  <div className="pp-payment-step">1ª Parcela</div>
                  <div className="pp-payment-amount">R$ 300</div>
                  <div className="pp-payment-when">Para iniciar</div>
                </div>
                <div className="pp-payment-item">
                  <div className="pp-payment-step">2ª Parcela</div>
                  <div className="pp-payment-amount">R$ 300</div>
                  <div className="pp-payment-when">Na entrega</div>
                </div>
              </div>
              <div className="pp-timeline-badge">
                <i className="fa-light fa-calendar-check" />
                Prazo: 7 a 10 dias úteis após o 1º pagamento
              </div>
            </div>
          </div>
        </section>

        <div className="pp-divider" />

        {/* ── HOSTING ── */}
        <section className="pp-section">
          <div className="pp-wrap">
            <div className="pp-section-eyebrow">04 — Domínio + Hospedagem</div>
            <h2 className="pp-section-title">Para o site ficar <em>online</em></h2>
            <p className="pp-section-desc">
              Contratado direto por você — essencial para publicar o site. Valores anuais
              com domínio grátis incluso. Recomendo uma das duas opções:
            </p>
            <div className="pp-host-grid">
              <div className="pp-host-card">
                <div className="pp-host-card-name"><i className="fa-light fa-server" />HostGator – Plano P</div>
                <div className="pp-host-price">~R$ 153<small>/ano</small></div>
                <div className="pp-host-card-desc">
                  Domínio grátis 1º ano (ex: <strong style={{ color: '#fff' }}>jspocosatibaia.com.br</strong>).
                  Suporte em português, ótimo custo-benefício.
                </div>
                <a className="pp-host-link" href="https://www.hostgator.com.br" target="_blank" rel="noopener noreferrer">
                  <i className="fa-light fa-arrow-up-right-from-square" />Acessar HostGator
                </a>
              </div>
              <div className="pp-host-card">
                <div className="pp-host-card-name"><i className="fa-light fa-server" />Hostinger – Premium</div>
                <div className="pp-host-price">~R$ 144<small>/ano</small></div>
                <div className="pp-host-card-desc">
                  Promoção com domínio incluso. Painel simples e intuitivo,
                  boa opção para primeira hospedagem.
                </div>
                <a className="pp-host-link" href="https://www.hostinger.com.br" target="_blank" rel="noopener noreferrer">
                  <i className="fa-light fa-arrow-up-right-from-square" />Acessar Hostinger
                </a>
              </div>
            </div>
            <div className="pp-host-free">
              <i className="fa-light fa-circle-check" />
              <span><strong>Configuração grátis inclusa!</strong> Eu cuido de apontar o domínio, subir os arquivos e colocar o site no ar.</span>
            </div>
          </div>
        </section>

        <div className="pp-divider" />

        {/* ── GUARANTEES ── */}
        <section className="pp-section dark">
          <div className="pp-wrap">
            <div className="pp-section-eyebrow">05 — Garantias</div>
            <h2 className="pp-section-title">Sem riscos para <em>você</em></h2>
            <p className="pp-section-desc">Compromissos que assumo com cada projeto entregue.</p>
            <div className="pp-guarantee-grid">
              <div className="pp-guarantee-item">
                <div className="pp-guarantee-icon"><i className="fa-light fa-pen-ruler" /></div>
                <div className="pp-guarantee-title">1 Revisão Gratuita</div>
                <div className="pp-guarantee-desc">Após a entrega, uma rodada de ajustes em design ou conteúdo sem custo adicional.</div>
              </div>
              <div className="pp-guarantee-item">
                <div className="pp-guarantee-icon"><i className="fa-light fa-headset" /></div>
                <div className="pp-guarantee-title">30 dias de Suporte</div>
                <div className="pp-guarantee-desc">Suporte técnico gratuito por 30 dias após a publicação para corrigir qualquer problema.</div>
              </div>
              <div className="pp-guarantee-item">
                <div className="pp-guarantee-icon"><i className="fa-light fa-shield-check" /></div>
                <div className="pp-guarantee-title">100% Satisfação</div>
                <div className="pp-guarantee-desc">Se o resultado não atender suas expectativas, ajustamos sem custo até você aprovar.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="pp-divider" />

        {/* ── CLIENT INFO ── */}
        <section className="pp-section">
          <div className="pp-wrap">
            <div className="pp-section-eyebrow">06 — Dados do Projeto</div>
            <h2 className="pp-section-title">Informações da <em>Empresa</em></h2>
            <p className="pp-section-desc">Dados utilizados na construção da landing page.</p>
            <div className="pp-client-grid">
              {CLIENT_FIELDS.map((f, i) => (
                <div key={i} className="pp-client-field">
                  <label>{f.label}</label>
                  {f.value}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="pp-divider" />

        {/* ── CTA ── */}
        <section className="pp-cta">
          <div className="pp-wrap">
            <h2>Pronta para <em>começar?</em></h2>
            <p>Clique abaixo para confirmar e já iniciamos o projeto!</p>
            <div className="pp-cta-actions">
              <a className="pp-btn-primary" href={WHATSAPP_ACEITAR} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp" />Aceitar Proposta
              </a>
              <a className="pp-btn-ghost" href={WHATSAPP_DUVIDAS} target="_blank" rel="noopener noreferrer">
                <i className="fa-light fa-comment-dots" />Tenho dúvidas
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="pp-footer">
          Proposta elaborada por{" "}
          <a href="/" target="_blank" rel="noopener noreferrer">Guilherme Brandão</a>
          {" "}· {new Date().getFullYear()} · Validade: 15 dias
        </footer>

      </div>
    </>
  );
}
