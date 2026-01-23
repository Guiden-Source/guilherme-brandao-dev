import React from 'react';
import Image from 'next/image';
import logo from '@/assets/img/logo/logo-white.png';
import { RightArrow, SvgBgSm } from '@/components/svg';
import Link from 'next/link';

export default function FooterFour() {
  return (
    <footer>
      <div className="tp-footer-3-area dark-bg pt-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6 mb-60">
              <div className="tp-footer-3-widget-wrapper footer-col-3-1">
                <div className="tp-footer-3-widget mb-40">
                  <h4 className="tp-footer-3-title">Menu</h4>
                  <div className="tp-footer-3-menu">
                    <ul>
                      <li><a href="#hero">Início</a></li>
                      <li><a href="#about">Sobre</a></li>
                      <li><a href="#services">Serviços</a></li>
                      <li><a href="#pricing">Preços</a></li>
                      <li><a href="/contact">Contato</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 mb-60">
              <div className="tp-footer-3-widget text-md-center footer-col-3-2">
                <div className="tp-footer-3-logo-box">
                  <p className="mb-100">
                    Desenvolvedor Web especializado em <br />
                    performance, conversão e mensuração.
                  </p>
                  <Link className="tp-footer-3-logo p-relative" href="/">
                    <h3 style={{ color: '#fff', fontWeight: 'bold' }}>Guilherme Brandão</h3>
                  </Link>
                  <p className="tp-footer-3-copyright">
                    {new Date().getFullYear()} Guilherme Brandão <br /> © Todos os direitos reservados
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 mb-60">
              <div className="tp-footer-3-widget-wrapper footer-col-3-3">
                <div className="tp-footer-3-widget mb-30">
                  <h4 className="tp-footer-3-title">Contato</h4>
                  <div className="tp-footer-2-contact-item">
                    <span>São Paulo, Brasil</span>
                  </div>
                  <div className="tp-footer-2-contact-item">
                    <span>E: <a href="mailto:guidjvb@gmail.com">guidjvb@gmail.com</a></span>
                  </div>
                </div>
                <div className="tp-footer-3-widget">
                  <h4 className="tp-footer-3-title">Redes Sociais</h4>
                  <div className="tp-footer-3-social">
                    <a href="https://linkedin.com/in/guilhermevbrandao" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="https://github.com/guilhermevbrandao" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}
