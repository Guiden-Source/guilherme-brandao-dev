"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

/* ─── CSS (same design system as proposta pages) ─────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600;700;800&display=swap');

  .ob * { box-sizing: border-box; margin: 0; padding: 0; }
  .ob {
    font-family: var(--tp-ff-marcellus), 'Marcellus', Georgia, serif;
    background: #05111f;
    color: #d4e6f5;
    min-height: 100vh;
  }

  /* Force Marcellus on headings */
  .ob h1, .ob h2, .ob h3 {
    font-family: var(--tp-ff-marcellus), 'Marcellus', Georgia, serif !important;
    font-weight: 400;
  }

  /* Inter for body / UI */
  .ob p, .ob span, .ob label, .ob input, .ob textarea, .ob button,
  .ob small, .ob .ob-ui { font-family: 'Inter', system-ui, sans-serif; }

  /* ── Hero ── */
  .ob-hero {
    background: linear-gradient(160deg, #040f1d 0%, #081e36 55%, #041a2c 100%);
    border-bottom: 1px solid rgba(0,198,204,.1);
    padding: 72px 20px 64px;
    text-align: center;
    position: relative; overflow: hidden;
  }
  .ob-hero::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 650px 400px at 75% -5%, rgba(0,198,204,.12) 0%, transparent 65%),
      radial-gradient(ellipse 450px 320px at 15% 110%, rgba(0,100,180,.09) 0%, transparent 65%);
  }
  .ob-hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(0,198,204,.07); border: 1px solid rgba(0,198,204,.22);
    border-radius: 100px; padding: 7px 18px;
    font-family: 'Inter', sans-serif;
    font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: #00C6CC;
    margin-bottom: 28px;
  }
  .ob-hero h1 {
    font-size: clamp(36px, 6vw, 68px); line-height: 1.08;
    color: #fff; margin-bottom: 16px; letter-spacing: -.01em;
  }
  .ob-hero h1 em { font-style: italic; color: #00C6CC; }
  .ob-hero p {
    font-family: 'Inter', sans-serif;
    font-size: 16px; color: #7fa8c8; max-width: 500px; margin: 0 auto;
    line-height: 1.7;
  }

  /* ── Layout ── */
  .ob-body { padding: 56px 20px 80px; }
  .ob-wrap { max-width: 960px; margin: 0 auto; }
  .ob-layout { display: grid; grid-template-columns: 1fr 340px; gap: 28px; align-items: start; }
  @media (max-width: 860px) { .ob-layout { grid-template-columns: 1fr; } }

  /* ── Stepper ── */
  .ob-stepper {
    display: flex; align-items: center; gap: 0;
    margin-bottom: 36px;
  }
  .ob-step {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: #4a6a82; flex: 1;
  }
  .ob-step.active { color: #00C6CC; }
  .ob-step.done { color: #7fa8c8; }
  .ob-step-num {
    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    border: 1.5px solid rgba(74,106,130,.4);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700;
  }
  .ob-step.active .ob-step-num {
    background: #00C6CC; border-color: #00C6CC; color: #031a2a;
  }
  .ob-step.done .ob-step-num {
    background: rgba(0,198,204,.12); border-color: rgba(0,198,204,.3); color: #00C6CC;
  }
  .ob-step-label { display: none; }
  @media (min-width: 540px) { .ob-step-label { display: block; } }
  .ob-step-line { flex: 1; height: 1px; background: rgba(255,255,255,.07); margin: 0 8px; }
  .ob-step-line.done { background: rgba(0,198,204,.25); }

  /* ── Card ── */
  .ob-card {
    background: rgba(8,22,42,.7); border: 1px solid rgba(0,198,204,.1);
    border-radius: 18px; padding: 32px;
  }
  .ob-card-title {
    font-size: clamp(20px, 3vw, 26px); color: #fff; margin-bottom: 6px;
  }
  .ob-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: #7fa8c8; margin-bottom: 28px; line-height: 1.6;
  }

  /* ── Plan cards ── */
  .ob-plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  @media (max-width: 700px) { .ob-plans { grid-template-columns: 1fr; } }

  .ob-plan {
    border: 1.5px solid rgba(255,255,255,.07); border-radius: 14px;
    padding: 24px 20px; cursor: pointer; transition: all .2s;
    background: rgba(5,17,31,.6); position: relative;
  }
  .ob-plan:hover { border-color: rgba(0,198,204,.3); transform: translateY(-2px); }
  .ob-plan.selected {
    border-color: #00C6CC;
    background: rgba(0,198,204,.05);
    box-shadow: 0 0 0 3px rgba(0,198,204,.12);
  }
  .ob-plan-badge {
    font-family: 'Inter', sans-serif;
    position: absolute; top: -11px; left: 50%; transform: translateX(-50%);
    background: #00C6CC; color: #031a2a; font-size: 10px; font-weight: 800;
    letter-spacing: .08em; text-transform: uppercase;
    padding: 3px 12px; border-radius: 100px; white-space: nowrap;
  }
  .ob-plan-icon {
    width: 40px; height: 40px; border-radius: 11px; margin-bottom: 14px;
    background: rgba(0,198,204,.09);
    display: flex; align-items: center; justify-content: center;
  }
  .ob-plan-icon i { color: #00C6CC; font-size: 17px; }
  .ob-plan-name { font-size: 17px; color: #fff; margin-bottom: 6px; }
  .ob-plan-price {
    font-family: 'Inter', sans-serif;
    font-size: 26px; font-weight: 800; color: #00C6CC; margin-bottom: 16px;
  }
  .ob-plan-price small { font-size: 13px; font-weight: 400; color: #7fa8c8; }
  .ob-plan-features { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .ob-plan-features li {
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: #a8c8e0; display: flex; align-items: flex-start; gap: 8px;
    line-height: 1.4;
  }
  .ob-plan-features li i { color: #00C6CC; flex-shrink: 0; margin-top: 1px; }

  /* ── Add-ons ── */
  .ob-addons { display: flex; flex-direction: column; gap: 12px; }
  .ob-addon {
    display: flex; align-items: center; gap: 16px;
    background: rgba(5,17,31,.6); border: 1.5px solid rgba(255,255,255,.07);
    border-radius: 12px; padding: 16px 20px; cursor: pointer; transition: all .2s;
  }
  .ob-addon:hover { border-color: rgba(0,198,204,.25); }
  .ob-addon.selected { border-color: rgba(0,198,204,.5); background: rgba(0,198,204,.04); }
  .ob-addon-check {
    width: 22px; height: 22px; border-radius: 6px; flex-shrink: 0;
    border: 1.5px solid rgba(255,255,255,.15);
    display: flex; align-items: center; justify-content: center;
    transition: all .2s;
  }
  .ob-addon.selected .ob-addon-check {
    background: #00C6CC; border-color: #00C6CC;
  }
  .ob-addon-check i { color: #031a2a; font-size: 11px; display: none; }
  .ob-addon.selected .ob-addon-check i { display: block; }
  .ob-addon-info { flex: 1; }
  .ob-addon-name {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 3px;
  }
  .ob-addon-desc {
    font-family: 'Inter', sans-serif;
    font-size: 12px; color: #7fa8c8;
  }
  .ob-addon-price {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 700; color: #00C6CC; flex-shrink: 0;
  }

  /* ── Form ── */
  .ob-form { display: flex; flex-direction: column; gap: 18px; }
  .ob-field label {
    display: block; font-family: 'Inter', sans-serif;
    font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
    color: #6a90ab; margin-bottom: 8px; font-weight: 600;
  }
  .ob-field input, .ob-field textarea {
    width: 100%; background: rgba(5,17,31,.8);
    border: 1.5px solid rgba(255,255,255,.08); border-radius: 10px;
    padding: 13px 16px; font-size: 14px; color: #d4e6f5;
    transition: border-color .2s; outline: none;
    font-family: 'Inter', sans-serif;
  }
  .ob-field input:focus, .ob-field textarea:focus { border-color: rgba(0,198,204,.4); }
  .ob-field input::placeholder, .ob-field textarea::placeholder { color: #3a5570; }
  .ob-field textarea { resize: vertical; min-height: 90px; line-height: 1.6; }

  /* ── Buttons ── */
  .ob-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 28px; gap: 12px; }
  .ob-btn-primary {
    display: inline-flex; align-items: center; gap: 9px;
    background: #00C6CC; color: #031a2a; font-weight: 700; font-size: 14px;
    padding: 14px 26px; border-radius: 10px; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; transition: background .2s, transform .2s;
    text-decoration: none; white-space: nowrap;
  }
  .ob-btn-primary:hover { background: #00dae3; transform: translateY(-1px); }
  .ob-btn-primary:disabled { opacity: .45; cursor: not-allowed; transform: none; }
  .ob-btn-ghost {
    display: inline-flex; align-items: center; gap: 9px;
    background: transparent; color: #7fa8c8; font-weight: 600; font-size: 14px;
    padding: 14px 20px; border-radius: 10px; border: 1.5px solid rgba(255,255,255,.1);
    cursor: pointer; font-family: 'Inter', sans-serif; transition: all .2s;
  }
  .ob-btn-ghost:hover { border-color: rgba(0,198,204,.3); color: #00C6CC; }
  .ob-btn-ghost:disabled { opacity: .35; cursor: not-allowed; }

  /* ── Summary (sidebar) ── */
  .ob-summary {
    background: rgba(4,15,29,.9); border: 1px solid rgba(0,198,204,.12);
    border-radius: 18px; padding: 28px; position: sticky; top: 24px;
  }
  .ob-summary-title {
    font-size: 18px; color: #fff; margin-bottom: 20px;
    padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,.06);
  }
  .ob-summary-rows { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
  .ob-summary-row {
    display: flex; justify-content: space-between; align-items: center; gap: 12px;
    font-family: 'Inter', sans-serif; font-size: 13px; color: #7fa8c8;
  }
  .ob-summary-row.plan { color: #c0d8ec; font-weight: 500; }
  .ob-summary-row span:last-child { color: #fff; font-weight: 600; white-space: nowrap; }
  .ob-summary-divider { height: 1px; background: rgba(255,255,255,.06); margin: 8px 0; }
  .ob-summary-total {
    display: flex; justify-content: space-between; align-items: center;
    font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; color: #fff;
    padding-top: 4px;
  }
  .ob-summary-total .val { font-size: 24px; color: #00C6CC; }
  .ob-summary-note {
    font-family: 'Inter', sans-serif;
    font-size: 12px; color: #4a6a82; margin-top: 14px;
    padding-top: 14px; border-top: 1px solid rgba(255,255,255,.05);
    line-height: 1.5;
  }
  .ob-empty-row {
    font-family: 'Inter', sans-serif;
    font-size: 12px; color: #3a5570; font-style: italic; margin-bottom: 4px;
  }

  /* Divider */
  .ob-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(0,198,204,.1), transparent); margin: 40px 0; }

  /* Footer */
  .ob-footer {
    background: #030c18; border-top: 1px solid rgba(255,255,255,.04);
    text-align: center; padding: 24px 20px;
    font-family: 'Inter', sans-serif; font-size: 13px; color: #3a5570;
  }
  .ob-footer a { color: #00C6CC; text-decoration: none; }
`;

/* ─── Data ────────────────────────────────────────────────────────── */
const PLANS = [
    {
        id: "landing",
        name: "Landing Page",
        price: 600,
        badge: null,
        icon: "fa-light fa-browser",
        features: [
            "Design responsivo (mobile + desktop)",
            "Formulário de contato + WhatsApp",
            "1 seção hero + serviços + contato",
            "SEO básico on-page",
            "Entrega em 7–10 dias",
        ],
    },
    {
        id: "site",
        name: "Site Institucional",
        price: 1200,
        badge: "Mais Popular",
        icon: "fa-light fa-globe",
        features: [
            "Até 5 páginas responsivas",
            "Design customizado completo",
            "Blog simples integrado",
            "SEO técnico avançado",
            "Entrega em 15–20 dias",
        ],
    },
    {
        id: "ecommerce",
        name: "E-commerce",
        price: 2500,
        badge: null,
        icon: "fa-light fa-bag-shopping",
        features: [
            "Loja completa com catálogo",
            "Checkout e pagamento integrado",
            "Painel de pedidos e estoque",
            "SEO para produtos",
            "Entrega em 25–35 dias",
        ],
    },
];

const ADDONS = [
    { id: "seo", name: "SEO Local Avançado", desc: "Otimização para buscas na sua cidade/região", price: 300, icon: "fa-light fa-magnifying-glass-chart" },
    { id: "analytics", name: "Google Analytics 4 + Tag Manager", desc: "Configuração completa de rastreamento", price: 200, icon: "fa-light fa-chart-line" },
    { id: "whatsapp", name: "Integração WhatsApp Business", desc: "Botão flutuante + API de mensagens", price: 150, icon: "fa-brands fa-whatsapp" },
    { id: "maintenance", name: "Manutenção Mensal", desc: "Suporte, updates e pequenas alterações", price: 150, icon: "fa-light fa-screwdriver-wrench" },
    { id: "copywriting", name: "Copywriting Profissional", desc: "Criação de textos persuasivos para o site", price: 350, icon: "fa-light fa-pen-nib" },
    { id: "logo", name: "Design de Logo", desc: "Identidade visual com 3 propostas", price: 400, icon: "fa-light fa-pen-ruler" },
];

const fmt = (n: number) =>
    "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

/* ─── Inner Component (uses useSearchParams) ──────────────────────── */
function OrcamentoInner() {
    const params = useSearchParams();
    const initialPlan = params.get("plano") || "landing";

    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState(initialPlan);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [form, setForm] = useState({ name: "", company: "", email: "", whatsapp: "", notes: "" });

    const plan = PLANS.find((p) => p.id === selectedPlan) || PLANS[0];
    const addonTotal = ADDONS.filter((a) => selectedAddons.includes(a.id)).reduce((s, a) => s + a.price, 0);
    const total = plan.price + addonTotal;

    useEffect(() => {
        const p = params.get("plano");
        if (p && PLANS.find((x) => x.id === p)) setSelectedPlan(p);
    }, [params]);

    const toggleAddon = (id: string) =>
        setSelectedAddons((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

    const handleWhatsApp = () => {
        const addonNames = ADDONS.filter((a) => selectedAddons.includes(a.id)).map((a) => `  • ${a.name}`).join("\n");
        const msg = [
            `Olá, Guilherme! Gostaria de um orçamento:`,
            ``,
            `*Plano:* ${plan.name} — ${fmt(plan.price)}`,
            addonNames ? `*Adicionais:*\n${addonNames}` : "",
            `*Total estimado:* ${fmt(total)}`,
            ``,
            `*Nome:* ${form.name}`,
            form.company ? `*Empresa:* ${form.company}` : "",
            `*E-mail:* ${form.email}`,
            `*WhatsApp:* ${form.whatsapp}`,
            form.notes ? `*Observações:* ${form.notes}` : "",
        ].filter(Boolean).join("\n");
        window.open(`https://wa.me/5511914767026?text=${encodeURIComponent(msg)}`, "_blank");
    };

    return (
        <>
            <style suppressHydrationWarning>{css}</style>
            <div className="ob">

                {/* ── HERO ── */}
                <section className="ob-hero">
                    <div className="ob-hero-badge">
                        <i className="fa-light fa-calculator" />Montador de Orçamento
                    </div>
                    <h1>Monte seu <em>orçamento</em></h1>
                    <p>Selecione o plano ideal e os recursos que você precisa.<br />Em segundos você recebe uma estimativa completa.</p>
                </section>

                {/* ── BODY ── */}
                <div className="ob-body">
                    <div className="ob-wrap">

                        {/* Stepper */}
                        <div className="ob-stepper">
                            {["Plano", "Adicionais", "Detalhes"].map((label, i) => {
                                const num = i + 1;
                                const cls = step > num ? "done" : step === num ? "active" : "";
                                return (
                                    <React.Fragment key={num}>
                                        {i > 0 && <div className={`ob-step-line ${step > i ? "done" : ""}`} />}
                                        <div className={`ob-step ${cls}`}>
                                            <div className="ob-step-num">
                                                {step > num ? <i className="fa-light fa-check" /> : num}
                                            </div>
                                            <span className="ob-step-label">{label}</span>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        <div className="ob-layout">
                            {/* ── LEFT PANEL ── */}
                            <div>
                                {/* STEP 1 — Plan */}
                                {step === 1 && (
                                    <div className="ob-card">
                                        <h2 className="ob-card-title">Escolha o <em style={{ fontStyle: "italic", color: "#00C6CC" }}>plano</em></h2>
                                        <p className="ob-card-desc">Qual tipo de projeto você precisa?</p>
                                        <div className="ob-plans">
                                            {PLANS.map((p) => (
                                                <div
                                                    key={p.id}
                                                    className={`ob-plan ${selectedPlan === p.id ? "selected" : ""}`}
                                                    onClick={() => setSelectedPlan(p.id)}
                                                    role="button" tabIndex={0}
                                                    onKeyDown={(e) => e.key === "Enter" && setSelectedPlan(p.id)}
                                                >
                                                    {p.badge && <div className="ob-plan-badge">{p.badge}</div>}
                                                    <div className="ob-plan-icon"><i className={p.icon} /></div>
                                                    <div className="ob-plan-name">{p.name}</div>
                                                    <div className="ob-plan-price">
                                                        {fmt(p.price)}<small> /projeto</small>
                                                    </div>
                                                    <ul className="ob-plan-features">
                                                        {p.features.map((f, j) => (
                                                            <li key={j}><i className="fa-light fa-check" />{f}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="ob-actions">
                                            <span />
                                            <button className="ob-btn-primary" onClick={() => setStep(2)}>
                                                Próximo <i className="fa-light fa-arrow-right" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2 — Add-ons */}
                                {step === 2 && (
                                    <div className="ob-card">
                                        <h2 className="ob-card-title">Recursos <em style={{ fontStyle: "italic", color: "#00C6CC" }}>adicionais</em></h2>
                                        <p className="ob-card-desc">Selecione os extras que fazem sentido para o seu negócio.</p>
                                        <div className="ob-addons">
                                            {ADDONS.map((a) => {
                                                const on = selectedAddons.includes(a.id);
                                                return (
                                                    <div
                                                        key={a.id}
                                                        className={`ob-addon ${on ? "selected" : ""}`}
                                                        onClick={() => toggleAddon(a.id)}
                                                        role="checkbox" aria-checked={on} tabIndex={0}
                                                        onKeyDown={(e) => e.key === " " && toggleAddon(a.id)}
                                                    >
                                                        <div className="ob-addon-check">
                                                            <i className="fa-solid fa-check" />
                                                        </div>
                                                        <div className="ob-addon-info">
                                                            <div className="ob-addon-name">{a.name}</div>
                                                            <div className="ob-addon-desc">{a.desc}</div>
                                                        </div>
                                                        <div className="ob-addon-price">+{fmt(a.price)}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="ob-actions">
                                            <button className="ob-btn-ghost" onClick={() => setStep(1)}>
                                                <i className="fa-light fa-arrow-left" /> Voltar
                                            </button>
                                            <button className="ob-btn-primary" onClick={() => setStep(3)}>
                                                Próximo <i className="fa-light fa-arrow-right" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3 — Details */}
                                {step === 3 && (
                                    <div className="ob-card">
                                        <h2 className="ob-card-title">Seus <em style={{ fontStyle: "italic", color: "#00C6CC" }}>dados</em></h2>
                                        <p className="ob-card-desc">Preencha para eu entrar em contato e confirmar o orçamento.</p>
                                        <div className="ob-form">
                                            <div className="ob-field">
                                                <label>Seu nome *</label>
                                                <input
                                                    type="text" placeholder="Ex: Giovana Silva"
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="ob-field">
                                                <label>Empresa / Negócio</label>
                                                <input
                                                    type="text" placeholder="Ex: JS Poços Semi & Artesiano"
                                                    value={form.company}
                                                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                                                />
                                            </div>
                                            <div className="ob-field">
                                                <label>E-mail *</label>
                                                <input
                                                    type="email" placeholder="seu@email.com"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="ob-field">
                                                <label>WhatsApp *</label>
                                                <input
                                                    type="tel" placeholder="(11) 9 9999-9999"
                                                    value={form.whatsapp}
                                                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                                                />
                                            </div>
                                            <div className="ob-field">
                                                <label>Observações</label>
                                                <textarea
                                                    placeholder="Conte um pouco sobre o seu projeto..."
                                                    value={form.notes}
                                                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="ob-actions">
                                            <button className="ob-btn-ghost" onClick={() => setStep(2)}>
                                                <i className="fa-light fa-arrow-left" /> Voltar
                                            </button>
                                            <button
                                                className="ob-btn-primary"
                                                onClick={handleWhatsApp}
                                                disabled={!form.name || !form.email || !form.whatsapp}
                                            >
                                                <i className="fa-brands fa-whatsapp" /> Enviar pelo WhatsApp
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── SUMMARY SIDEBAR ── */}
                            <div className="ob-summary">
                                <h3 className="ob-summary-title">Resumo</h3>
                                <div className="ob-summary-rows">
                                    <div className="ob-summary-row plan">
                                        <span>{plan.name}</span>
                                        <span>{fmt(plan.price)}</span>
                                    </div>
                                    {selectedAddons.length === 0 && (
                                        <p className="ob-empty-row">Nenhum adicional selecionado</p>
                                    )}
                                    {ADDONS.filter((a) => selectedAddons.includes(a.id)).map((a) => (
                                        <div key={a.id} className="ob-summary-row">
                                            <span>{a.name}</span>
                                            <span>+{fmt(a.price)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="ob-summary-divider" />
                                <div className="ob-summary-total">
                                    <span>Total estimado</span>
                                    <span className="val">{fmt(total)}</span>
                                </div>
                                <p className="ob-summary-note">
                                    Estimativa sem compromisso. O valor final é confirmado após análise do projeto.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── FOOTER ── */}
                <footer className="ob-footer">
                    Desenvolvido por{" "}
                    <a href="/" rel="noopener noreferrer">Guilherme Brandão</a>
                    {" "}· Orçamento sem compromisso
                </footer>
            </div>
        </>
    );
}

/* ─── Export (wrapped in Suspense for useSearchParams) ────────────── */
export default function OrcamentoBuilder() {
    return (
        <Suspense>
            <OrcamentoInner />
        </Suspense>
    );
}
