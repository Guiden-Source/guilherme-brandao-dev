import React from "react";
import { UpArrow } from "../svg";
import Link from "next/link";

const pricing_data = [
  {
    id: 1,
    bg: "/assets/img/price/price-bg-1.jpg",
    title: "Landing Page",
    price: "600",
    features: [
      "Landing page ou site institucional",
      "Até 5 páginas internas",
      "Responsivo e otimizado",
      "Configuração básica de SEO",
      "Integração com formulário de contato",
    ],
  },
  {
    id: 2,
    bg: "/assets/img/price/price-bg-2.jpg",
    title: "Site Institucional",
    price: "1.700",
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
    id: 3,
    bg: "/assets/img/price/price-bg-3.jpg",
    title: "E-commerce",
    price: "4.000",
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

export default function PricingArea() {
  return (
    <div className="tp-price-area pt-130 pb-130">
      <div className="container">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="tp-price-title-box text-center">
              <h4 className="tp-section-title-90">
                Serviços & <span>Investimento</span>
              </h4>
              <p className="mt-20">
                Preços transparentes para diferentes escopos de projeto
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {pricing_data.map((item) => (
            <div key={item.id} className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div
                className={`tp-price-item ${item.id === 2 ? "active" : ""}`}
                style={{
                  backgroundImage: item.id === 2 ? `url(${item.bg})` : "",
                }}
              >
                <div
                  className="tp-price-head"
                  style={{
                    backgroundImage: item.id !== 2 ? `url(${item.bg})` : "",
                  }}
                >
                  <span>#{item.id}</span>
                  <h5>{item.title}</h5>
                </div>
                <div className="tp-price-body">
                  <span className="tp-price-monthly">
                    R$ <i>{item.price}</i>
                  </span>
                  <div className="tp-price-list">
                    <ul>
                      {item.features.map((l, i) => (
                        <li key={i}>
                          <i className="fa-sharp fa-light fa-check"></i>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    className={`tp-btn-black-md ${item.id === 2 ? "white-bg" : ""} w-100 text-center`}
                    href={`https://wa.me/5511914767026?text=Olá!%20Tenho%20interesse%20no%20plano%20${item.title}.`}
                    target="_blank"
                  >
                    Escolher Plano
                    <span>
                      <UpArrow />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
