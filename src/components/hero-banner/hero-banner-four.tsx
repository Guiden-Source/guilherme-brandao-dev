'use client';
import React from "react";
import { ArrowBg, RightArrowTwo } from "../svg";
import Link from "next/link";

export default function HeroBannerFour() {
  return (
    <div className="tp-hero-3-area tp-hero-3-ptb fix">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-hero-3-content-box text-center p-relative">
              <div className="tp-hero-3-circle-shape">
                <span></span>
              </div>
              <h4 className="tp-hero-3-title tp_reveal_anim">
                <span className="tp-reveal-line">Websites rápidos e mensuráveis</span>
                <span className="tp-reveal-line">que geram vendas, não só visitas</span>
              </h4>
              <span className="tp-hero-3-category tp_reveal_anim">
                Especialista em WordPress, Next.js, GA4 e CRO para startups e e-commerces em crescimento
              </span>
              <Link className="tp-btn-black-2" href="https://wa.me/5511914767026?text=Olá!%20Gostaria%20de%20agendar%20um%20diagnóstico%20gratuito." target="_blank">
                Agendar Diagnóstico Gratuito{" "}
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
