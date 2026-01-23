import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FirstBracket, FirstBracketTwo, RightArrow, SvgBg } from "../svg";
import icon from '@/assets/img/home-03/service/sv-icon-1.png';

const service_data = [
  {
    id: 1,
    title: "Desenvolvimento & Otimização",
    desc: "Criação e reestruturação de sites WordPress e Next.js focados em gerar vendas, leads e oportunidades de negócio. Código limpo, responsivo e otimizado para SEO, campanhas pagas e experimentos futuros.",
    category: ["WordPress", "Next.js", "Performance", "UX/UI"],
  },
  {
    id: 2,
    title: "Rastreamento & Mensuração",
    desc: "Configuração completa de GA4, GTM e painéis personalizados para que você saiba exatamente o que funciona no seu funil digital. Base sólida para otimizar anúncios e investir onde o retorno é maior.",
    category: ["GA4", "GTM", "Analytics", "Dashboards"],
  },
  {
    id: 3,
    title: "SEO Técnico & CRO",
    desc: "Diagnóstico e otimização técnica para buscadores, aliado a testes A/B para extrair mais resultado do tráfego que você já tem. Ideal para empresas que sentem que o site não converte o quanto poderia.",
    category: ["SEO", "Core Web Vitals", "CRO", "A/B Testing"],
  },
];
export default function ServiceFour() {

  return (
    <div className="tp-service-3-area pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div className="col-xl-9">
            <div className="tp-service-3-title-box mb-60 p-relative">
              <div className="tp-service-3-icon">
                <Image src={icon} alt="icon" />
              </div>
              <span className="tp-section-subtitle-2 tp_fade_bottom">
                <span>
                  <FirstBracket />
                </span>
                <span className="tp-subtitle-text tp_text_invert">
                  Serviços
                </span>
                <span>
                  <FirstBracketTwo />
                </span>
              </span>
              <h4 className="tp-section-title-90 tp_text_invert tp_fade_bottom">
                O que eu <br />faço
              </h4>
            </div>
          </div>
        </div>

        {service_data.map((item) => (
          <div key={item.id} className="tp-service-3-wrap tp_fade_bottom">
            <div className="row align-items-start">
              <div className="col-xl-3 col-lg-3">
                <div className="tp-service-3-title-box">
                  <h4 className="tp-service-3-title">
                    <Link href="https://wa.me/5511914767026" target="_blank">{item.title}</Link>
                  </h4>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9">
                <div className="tp-service-3-content">
                  <p>{item.desc}</p>
                  <div className="tp-service-3-category">
                    {item.category.map((c, i) => (
                      <span key={i}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
