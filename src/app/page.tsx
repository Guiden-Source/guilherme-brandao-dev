import { Metadata } from "next";
import HomeFourMain from "@/pages/homes/home-4";

export const metadata: Metadata = {
  title: "Guilherme Brandão - Desenvolvedor Web | WordPress, Next.js, GA4, SEO",
  description: "Desenvolvedor web freelancer especializado em WordPress, Next.js, rastreamento GA4/GTM, SEO técnico e CRO. Sites de alta performance focados em conversão.",
  openGraph: {
    title: "Guilherme Brandão - Desenvolvedor Web",
    description: "Desenvolvedor web freelancer especializado em WordPress, Next.js, rastreamento GA4/GTM, SEO técnico e CRO.",
    url: "https://guilherme-brandao-portfolio.vercel.app",
    siteName: "Guilherme Brandão Portfolio",
    images: [
      {
        url: "/assets/img/2.jpg",
        width: 1200,
        height: 630,
        alt: "Guilherme Brandão - Desenvolvedor Web",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guilherme Brandão - Desenvolvedor Web",
    description: "Desenvolvedor web freelancer especializado em WordPress, Next.js, GA4/GTM, SEO técnico e CRO.",
    images: ["/assets/img/2.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <HomeFourMain />
    </>
  );
}
