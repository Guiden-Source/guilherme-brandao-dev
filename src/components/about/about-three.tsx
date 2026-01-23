import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal imports
import { ArrowBg, RightArrowTwo, FirstBracket, FirstBracketTwo } from "../svg";

export default function AboutThree() {

  return (
    <div className="tp-about-3-area pt-120 pb-110">
      <div className="container">
        <div className="row">
          <div className="col-xl-11">
            <div className="tp-about-3-title-box">
              <span className="tp-section-subtitle-2 tp_fade_bottom">
                <span>
                  <FirstBracket />
                </span>
                <span className="tp-subtitle-text tp_text_invert">
                  Sobre Mim
                </span>
                <span>
                  <FirstBracketTwo />
                </span>
              </span>
              <h4 className="tp-section-title-90 tp_text_invert tp_fade_bottom">
                Desenvolvedor Web focado em{" "}
                <span>
                  {" "}
                  <br />Performance, UX e Conversão
                </span>
              </h4>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-4">
            <div style={{ textAlign: "right", padding: "0 20px" }}>
              <img
                src="/assets/img/2.jpg"
                alt="Guilherme Brandão"
                style={{
                  width: "100%",
                  maxWidth: "450px",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  display: "inline-block"
                }}
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-8">
            <div className="tp-about-3-content">
              <p className="mb-30 tp_fade_bottom">
                Sou desenvolvedor web focado em performance e conversão, com mais de 3 anos implementando
                sites WordPress e Next.js para startups, e-commerces e empresas B2B em crescimento.
              </p>
              <p className="mb-30 tp_fade_bottom">
                Trabalho sempre com três pilares: <strong>Performance técnica</strong> (Core Web Vitals, otimização de código),
                <strong> Experiência do usuário</strong> (UX focada em objetivo de negócio), e <strong>Mensuração e melhoria
                  contínua</strong> (GA4, GTM, SEO técnico e CRO).
              </p>
              <p className="mb-45 tp_fade_bottom">
                Se o seu site hoje é lento, difícil de medir ou não está entregando o resultado que deveria,
                posso ajudar a transformá-lo em um ativo de crescimento previsível para o seu negócio.
              </p>
              <Link className="tp-btn-black-2 tp_fade_bottom" href="https://wa.me/5511914767026?text=Olá!%20Gostaria%20de%20agendar%20um%20diagnóstico." target="_blank">
                Agendar Diagnóstico
                <span className="p-relative">
                  <RightArrowTwo />
                  <ArrowBg />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
