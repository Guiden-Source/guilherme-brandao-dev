"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// ─── Data ───────────────────────────────────────────────────────────────────

const BASE_PLANS = [
    {
        id: "landing-page",
        title: "Landing Page",
        subtitle: "Ideal para lançamentos e campanhas",
        price: 600,
        features: [
            "Landing page ou site institucional",
            "Até 5 páginas internas",
            "Responsivo e otimizado",
            "Configuração básica de SEO",
            "Integração com formulário de contato",
        ],
    },
    {
        id: "site-institucional",
        title: "Site Institucional",
        subtitle: "Solução completa para empresas",
        price: 1700,
        features: [
            "Site institucional completo",
            "Design personalizado",
            "CMS WordPress ou Next.js",
            "SEO técnico completo",
            "Integração GA4 + GTM",
            "1 mês de suporte",
        ],
    },
    {
        id: "ecommerce",
        title: "E-commerce",
        subtitle: "Loja online pronta para vender",
        price: 4000,
        features: [
            "E-commerce completo",
            "Shopify ou WooCommerce",
            "Produtos ilimitados",
            "Integração com pagamentos",
            "Performance otimizada",
            "Rastreamento de conversões",
            "3 meses de suporte",
        ],
    },
];

const ADDONS = [
    { id: "seo", label: "SEO Técnico Completo", price: 400, icon: "fa-magnifying-glass" },
    { id: "ga4", label: "Configuração GA4 + GTM", price: 300, icon: "fa-chart-line" },
    { id: "crm", label: "Integração CRM / E-mail Marketing", price: 250, icon: "fa-envelope" },
    { id: "ads", label: "Rastreamento de Conversões (Ads)", price: 200, icon: "fa-bullseye" },
    { id: "manutencao", label: "Manutenção Mensal (3 meses)", price: 500, icon: "fa-screwdriver-wrench" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function buildWhatsAppMessage(
    plan: (typeof BASE_PLANS)[0],
    selectedAddons: string[],
    total: number,
    details: { name: string; url: string; deadline: string; notes: string }
) {
    const addonLines = selectedAddons
        .map((id) => {
            const a = ADDONS.find((a) => a.id === id);
            return a ? `  • ${a.label} (+${formatCurrency(a.price)})` : "";
        })
        .filter(Boolean)
        .join("\n");

    return encodeURIComponent(
        `Olá Guilherme! Montei um orçamento pelo seu site:\n\n` +
        `📦 *Plano:* ${plan.title} (${formatCurrency(plan.price)})\n` +
        (addonLines ? `\n🔧 *Add-ons:*\n${addonLines}\n` : "") +
        `\n💰 *Total estimado:* ${formatCurrency(total)}\n` +
        `\n📋 *Dados do projeto:*\n` +
        `  • Nome/Empresa: ${details.name || "Não informado"}\n` +
        `  • Site atual: ${details.url || "Não há"}\n` +
        `  • Prazo desejado: ${details.deadline || "A combinar"}\n` +
        (details.notes ? `  • Observações: ${details.notes}\n` : "") +
        `\nGostaria de conversar sobre esse projeto!`
    );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
    const steps = ["Serviço", "Add-ons", "Detalhes"];
    return (
        <div className="orc-stepper">
            {steps.map((label, i) => (
                <React.Fragment key={i}>
                    <div className={`orc-step ${i + 1 === current ? "active" : ""} ${i + 1 < current ? "done" : ""}`}>
                        <div className="orc-step-circle">
                            {i + 1 < current ? <i className="fa-sharp fa-light fa-check" /> : i + 1}
                        </div>
                        <span className="orc-step-label">{label}</span>
                    </div>
                    {i < steps.length - 1 && <div className={`orc-step-line ${i + 1 < current ? "done" : ""}`} />}
                </React.Fragment>
            ))}
        </div>
    );
}

function Summary({
    plan,
    selectedAddons,
    total,
    details,
    onPrint,
}: {
    plan: (typeof BASE_PLANS)[0] | null;
    selectedAddons: string[];
    total: number;
    details: { name: string; url: string; deadline: string; notes: string };
    onPrint: () => void;
}) {
    if (!plan) return null;
    const whatsappMsg = buildWhatsAppMessage(plan, selectedAddons, total, details);
    const whatsappUrl = `https://wa.me/5511914767026?text=${whatsappMsg}`;

    return (
        <div className="orc-summary-box">
            <h5 className="orc-summary-title">Resumo do Orçamento</h5>
            {details.name && (
                <p className="orc-summary-client">
                    <i className="fa-light fa-user" /> {details.name}
                </p>
            )}
            <div className="orc-summary-line">
                <span>{plan.title}</span>
                <span>{formatCurrency(plan.price)}</span>
            </div>
            {selectedAddons.map((id) => {
                const a = ADDONS.find((a) => a.id === id);
                if (!a) return null;
                return (
                    <div key={id} className="orc-summary-line addon">
                        <span>+ {a.label}</span>
                        <span>{formatCurrency(a.price)}</span>
                    </div>
                );
            })}
            <div className="orc-summary-total">
                <span>Total estimado</span>
                <span>{formatCurrency(total)}</span>
            </div>
            <div className="orc-summary-actions no-print">
                <a className="orc-btn-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-whatsapp" /> Enviar via WhatsApp
                </a>
                <button className="orc-btn-secondary" onClick={onPrint}>
                    <i className="fa-light fa-file-pdf" /> Salvar PDF
                </button>
            </div>
            <p className="orc-summary-note">
                * Valores são estimativas e podem variar conforme escopo final.
            </p>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function OrcamentoBuilder() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [selectedPlanId, setSelectedPlanId] = useState<string>("site-institucional");
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [details, setDetails] = useState({ name: "", url: "", deadline: "", notes: "" });

    // Pre-select plan from query string e.g. ?plano=landing-page
    useEffect(() => {
        const plano = searchParams?.get("plano");
        if (plano && BASE_PLANS.find((p) => p.id === plano)) {
            setSelectedPlanId(plano);
        }
    }, [searchParams]);

    const selectedPlan = BASE_PLANS.find((p) => p.id === selectedPlanId) ?? BASE_PLANS[1];

    const addonTotal = selectedAddons.reduce((acc, id) => {
        const a = ADDONS.find((a) => a.id === id);
        return acc + (a?.price ?? 0);
    }, 0);

    const total = selectedPlan.price + addonTotal;

    function toggleAddon(id: string) {
        setSelectedAddons((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
        );
    }

    function handlePrint() {
        window.print();
    }

    return (
        <>
            <style>{`
        /* ── Layout ── */
        .orc-page { min-height: 100vh; background: #19191A; padding: 60px 0 120px; }
        .orc-header { text-align: center; margin-bottom: 60px; }
        .orc-header .back-link { color: #ccc; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 24px; transition: color .2s; }
        .orc-header .back-link:hover { color: #fff; }
        .orc-header h1 { font-size: clamp(32px, 5vw, 64px); color: #fff; font-weight: 800; line-height: 1.1; }
        .orc-header h1 span { color: #B5F72C; }
        .orc-header p { color: #aaa; margin-top: 16px; font-size: 16px; }

        /* ── Stepper ── */
        .orc-stepper { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 56px; }
        .orc-step { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .orc-step-circle { width: 44px; height: 44px; border-radius: 50%; border: 2px solid #333; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #666; font-size: 15px; transition: all .3s; }
        .orc-step.active .orc-step-circle { border-color: #B5F72C; color: #B5F72C; background: rgba(181,247,44,.08); }
        .orc-step.done .orc-step-circle { border-color: #B5F72C; background: #B5F72C; color: #19191A; }
        .orc-step-label { font-size: 12px; color: #666; letter-spacing: .05em; text-transform: uppercase; }
        .orc-step.active .orc-step-label, .orc-step.done .orc-step-label { color: #B5F72C; }
        .orc-step-line { flex: 1; height: 2px; background: #333; margin: 0 8px; min-width: 40px; transition: background .3s; }
        .orc-step-line.done { background: #B5F72C; }

        /* ── Grid ── */
        .orc-grid { display: grid; grid-template-columns: 1fr 340px; gap: 32px; align-items: start; }
        @media (max-width: 900px) { .orc-grid { grid-template-columns: 1fr; } }

        /* ── Card / Panel ── */
        .orc-panel { background: #111; border: 1px solid #242424; border-radius: 16px; padding: 40px; }
        .orc-panel h3 { color: #fff; font-size: 22px; font-weight: 700; margin-bottom: 8px; }
        .orc-panel > p { color: #888; font-size: 14px; margin-bottom: 32px; }

        /* ── Plan Cards ── */
        .orc-plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 700px) { .orc-plans { grid-template-columns: 1fr; } }
        .orc-plan-card { border: 2px solid #2a2a2a; border-radius: 12px; padding: 24px; cursor: pointer; transition: all .25s; position: relative; }
        .orc-plan-card:hover { border-color: #444; }
        .orc-plan-card.selected { border-color: #B5F72C; background: rgba(181,247,44,.04); }
        .orc-plan-card .orc-plan-name { color: #fff; font-weight: 700; font-size: 16px; margin-bottom: 4px; }
        .orc-plan-card .orc-plan-sub { color: #888; font-size: 12px; margin-bottom: 16px; }
        .orc-plan-card .orc-plan-price { color: #B5F72C; font-size: 22px; font-weight: 800; margin-bottom: 16px; }
        .orc-plan-card .orc-plan-price small { font-size: 13px; color: #888; font-weight: 400; }
        .orc-plan-card ul { list-style: none; padding: 0; margin: 0; }
        .orc-plan-card ul li { color: #aaa; font-size: 13px; padding: 4px 0; display: flex; gap: 8px; align-items: flex-start; }
        .orc-plan-card ul li i { color: #B5F72C; margin-top: 2px; flex-shrink: 0; }
        .orc-plan-check { position: absolute; top: 16px; right: 16px; width: 22px; height: 22px; border-radius: 50%; border: 2px solid #333; display: flex; align-items: center; justify-content: center; }
        .orc-plan-card.selected .orc-plan-check { background: #B5F72C; border-color: #B5F72C; }
        .orc-plan-card.selected .orc-plan-check i { color: #19191A; font-size: 11px; }

        /* ── Add-ons ── */
        .orc-addon-grid { display: flex; flex-direction: column; gap: 12px; }
        .orc-addon-item { display: flex; align-items: center; gap: 16px; padding: 18px 20px; border: 2px solid #2a2a2a; border-radius: 12px; cursor: pointer; transition: all .2s; }
        .orc-addon-item:hover { border-color: #444; }
        .orc-addon-item.selected { border-color: #B5F72C; background: rgba(181,247,44,.04); }
        .orc-addon-icon { width: 40px; height: 40px; border-radius: 10px; background: #1e1e1e; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .orc-addon-item.selected .orc-addon-icon { background: rgba(181,247,44,.15); }
        .orc-addon-icon i { color: #888; font-size: 16px; }
        .orc-addon-item.selected .orc-addon-icon i { color: #B5F72C; }
        .orc-addon-info { flex: 1; }
        .orc-addon-label { color: #fff; font-size: 15px; font-weight: 600; }
        .orc-addon-price { color: #B5F72C; font-size: 13px; margin-top: 2px; }
        .orc-addon-cb { width: 22px; height: 22px; border-radius: 6px; border: 2px solid #333; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all .2s; }
        .orc-addon-item.selected .orc-addon-cb { background: #B5F72C; border-color: #B5F72C; }
        .orc-addon-item.selected .orc-addon-cb i { color: #19191A; font-size: 12px; }

        /* ── Form ── */
        .orc-form { display: flex; flex-direction: column; gap: 20px; }
        .orc-field label { display: block; color: #aaa; font-size: 13px; letter-spacing: .05em; text-transform: uppercase; margin-bottom: 8px; }
        .orc-field input, .orc-field textarea, .orc-field select {
          width: 100%; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px;
          padding: 14px 18px; color: #fff; font-size: 15px; font-family: inherit;
          transition: border-color .2s; outline: none;
        }
        .orc-field input:focus, .orc-field textarea:focus, .orc-field select:focus { border-color: #B5F72C; }
        .orc-field textarea { min-height: 100px; resize: vertical; }
        .orc-field select option { background: #1a1a1a; }

        /* ── Navigation buttons ── */
        .orc-nav { display: flex; gap: 12px; margin-top: 32px; }
        .orc-btn-next { flex: 1; padding: 16px; background: #B5F72C; color: #19191A; font-weight: 700; font-size: 15px; border: none; border-radius: 10px; cursor: pointer; transition: opacity .2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .orc-btn-next:hover { opacity: .85; }
        .orc-btn-back { padding: 16px 24px; background: transparent; color: #aaa; font-weight: 600; font-size: 15px; border: 1px solid #333; border-radius: 10px; cursor: pointer; transition: all .2s; }
        .orc-btn-back:hover { border-color: #666; color: #fff; }

        /* ── Summary ── */
        .orc-summary-box { background: #111; border: 1px solid #242424; border-radius: 16px; padding: 32px; position: sticky; top: 100px; }
        .orc-summary-title { color: #fff; font-size: 16px; font-weight: 700; margin-bottom: 6px; padding-bottom: 16px; border-bottom: 1px solid #242424; }
        .orc-summary-client { color: #888; font-size: 13px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .orc-summary-client i { color: #B5F72C; }
        .orc-summary-line { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #222; font-size: 14px; }
        .orc-summary-line span:first-child { color: #ccc; }
        .orc-summary-line span:last-child { color: #fff; font-weight: 600; }
        .orc-summary-line.addon span:first-child { color: #888; font-size: 13px; }
        .orc-summary-line.addon span:last-child { color: #B5F72C; font-size: 13px; }
        .orc-summary-total { display: flex; justify-content: space-between; padding: 16px 0 0; font-size: 18px; font-weight: 800; }
        .orc-summary-total span:first-child { color: #fff; }
        .orc-summary-total span:last-child { color: #B5F72C; }
        .orc-summary-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 24px; }
        .orc-btn-primary { background: #25D366; color: #fff; font-weight: 700; font-size: 14px; padding: 14px 16px; border-radius: 10px; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; transition: opacity .2s; border: none; cursor: pointer; }
        .orc-btn-primary:hover { opacity: .85; }
        .orc-btn-secondary { background: transparent; color: #aaa; font-weight: 600; font-size: 14px; padding: 14px 16px; border-radius: 10px; border: 1px solid #333; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all .2s; font-family: inherit; }
        .orc-btn-secondary:hover { border-color: #666; color: #fff; }
        .orc-summary-note { font-size: 11px; color: #555; margin-top: 14px; line-height: 1.5; }

        /* ── Empty state ── */
        .orc-empty { color: #666; font-size: 14px; text-align: center; padding: 40px 0; }

        /* ── Print ── */
        @media print {
          .no-print, .orc-stepper, .orc-header .back-link, .orc-nav, .orc-panel { display: none !important; }
          .orc-page { background: #fff !important; padding: 0; }
          .orc-grid { grid-template-columns: 1fr !important; }
          .orc-summary-box { border: 1px solid #ccc; position: static; background: #fff !important; }
          .orc-summary-box * { color: #000 !important; }
          .orc-summary-title { border-color: #ccc; }
          .orc-summary-line { border-color: #ddd; }
          .orc-header h1 { color: #000 !important; }
          .orc-header p { color: #666 !important; }
        }
      `}</style>

            <div className="orc-page">
                <div className="container">
                    {/* Header */}
                    <div className="orc-header">
                        <Link href="/" className="back-link">
                            <i className="fa-light fa-arrow-left" /> Voltar ao portfólio
                        </Link>
                        <h1>Monte seu <span>Orçamento</span></h1>
                        <p>Selecione o serviço e add-ons desejados. Você receberá uma estimativa imediata.</p>
                    </div>

                    {/* Stepper */}
                    <StepIndicator current={step} />

                    {/* Main Grid */}
                    <div className="orc-grid">
                        {/* Left: Steps */}
                        <div>
                            {/* Step 1 — Plan */}
                            {step === 1 && (
                                <div className="orc-panel">
                                    <h3>Escolha o serviço base</h3>
                                    <p>Qual tipo de projeto você precisa?</p>
                                    <div className="orc-plans">
                                        {BASE_PLANS.map((plan) => (
                                            <div
                                                key={plan.id}
                                                className={`orc-plan-card ${selectedPlanId === plan.id ? "selected" : ""}`}
                                                onClick={() => setSelectedPlanId(plan.id)}
                                            >
                                                <div className="orc-plan-check">
                                                    {selectedPlanId === plan.id && <i className="fa-sharp fa-solid fa-check" />}
                                                </div>
                                                <div className="orc-plan-name">{plan.title}</div>
                                                <div className="orc-plan-sub">{plan.subtitle}</div>
                                                <div className="orc-plan-price">
                                                    {formatCurrency(plan.price)}<small> / projeto</small>
                                                </div>
                                                <ul>
                                                    {plan.features.map((f, i) => (
                                                        <li key={i}>
                                                            <i className="fa-sharp fa-light fa-check" />
                                                            {f}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="orc-nav">
                                        <button className="orc-btn-next" onClick={() => setStep(2)}>
                                            Próximo — Add-ons <i className="fa-light fa-arrow-right" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2 — Add-ons */}
                            {step === 2 && (
                                <div className="orc-panel">
                                    <h3>Add-ons opcionais</h3>
                                    <p>Potencialize seu projeto com serviços complementares.</p>
                                    <div className="orc-addon-grid">
                                        {ADDONS.map((addon) => {
                                            const active = selectedAddons.includes(addon.id);
                                            return (
                                                <div
                                                    key={addon.id}
                                                    className={`orc-addon-item ${active ? "selected" : ""}`}
                                                    onClick={() => toggleAddon(addon.id)}
                                                >
                                                    <div className="orc-addon-icon">
                                                        <i className={`fa-light fa-${addon.icon}`} />
                                                    </div>
                                                    <div className="orc-addon-info">
                                                        <div className="orc-addon-label">{addon.label}</div>
                                                        <div className="orc-addon-price">+{formatCurrency(addon.price)}</div>
                                                    </div>
                                                    <div className="orc-addon-cb">
                                                        {active && <i className="fa-sharp fa-solid fa-check" />}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="orc-nav">
                                        <button className="orc-btn-back" onClick={() => setStep(1)}>
                                            <i className="fa-light fa-arrow-left" /> Voltar
                                        </button>
                                        <button className="orc-btn-next" onClick={() => setStep(3)}>
                                            Próximo — Detalhes <i className="fa-light fa-arrow-right" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3 — Details */}
                            {step === 3 && (
                                <div className="orc-panel">
                                    <h3>Dados do projeto</h3>
                                    <p>Essas informações serão incluídas na mensagem enviada ao Guilherme.</p>
                                    <div className="orc-form">
                                        <div className="orc-field">
                                            <label>Nome / Empresa</label>
                                            <input
                                                type="text"
                                                placeholder="Ex: João Silva ou Empresa XPTO"
                                                value={details.name}
                                                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="orc-field">
                                            <label>Site atual (opcional)</label>
                                            <input
                                                type="url"
                                                placeholder="https://seusite.com.br"
                                                value={details.url}
                                                onChange={(e) => setDetails({ ...details, url: e.target.value })}
                                            />
                                        </div>
                                        <div className="orc-field">
                                            <label>Prazo desejado</label>
                                            <select
                                                value={details.deadline}
                                                onChange={(e) => setDetails({ ...details, deadline: e.target.value })}
                                            >
                                                <option value="">Selecione...</option>
                                                <option value="Urgente (até 2 semanas)">Urgente (até 2 semanas)</option>
                                                <option value="1 mês">1 mês</option>
                                                <option value="2 meses">2 meses</option>
                                                <option value="3 meses ou mais">3 meses ou mais</option>
                                                <option value="A combinar">A combinar</option>
                                            </select>
                                        </div>
                                        <div className="orc-field">
                                            <label>Observações (opcional)</label>
                                            <textarea
                                                placeholder="Conte mais sobre seu projeto, referências de design, funcionalidades específicas..."
                                                value={details.notes}
                                                onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="orc-nav">
                                        <button className="orc-btn-back" onClick={() => setStep(2)}>
                                            <i className="fa-light fa-arrow-left" /> Voltar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Summary (always visible) */}
                        <div>
                            <Summary
                                plan={selectedPlan}
                                selectedAddons={selectedAddons}
                                total={total}
                                details={details}
                                onPrint={handlePrint}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
