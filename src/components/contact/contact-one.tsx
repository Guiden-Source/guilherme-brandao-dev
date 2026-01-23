import React from "react";
import Image from "next/image";
import { ProjectShape, RightArrow } from "../svg";
import cta from '@/assets/img/home-03/cta/cta-1.png';
import Link from "next/link";

export default function ContactOne() {
  const whatsappLink = "https://wa.me/5511914767026?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços%20de%20desenvolvimento%20web.";

  return (
    <div className="tp-cta-area black-bg pt-120 pb-120 z-index fix">
      <div className="container">
        <div className="col-xl-12">
          <div className="tp-cta-title-box p-relative">
            <h4 className="tp-cta-title cta-text">
              Vamos conversar
              <span> sobre seu projeto?</span>
            </h4>
            <p className="tp_fade_bottom">
              Entre em contato pelo WhatsApp e vamos discutir como posso ajudar
              seu negócio a crescer com um site de alta performance.
            </p>
            <div className="tp-cta-icon">
              <Image src={cta} alt="cta-img" />
            </div>
            <div className="tp-cta-btn-box">
              <Link className="tp-btn-zikzak p-relative" href={whatsappLink} target="_blank">
                <span className="zikzak-content">
                  Falar no <br /> WhatsApp
                  <RightArrow clr="#19191A" />
                </span>
                <ProjectShape />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
