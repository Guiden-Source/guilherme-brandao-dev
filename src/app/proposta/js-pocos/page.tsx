import { Metadata } from "next";
import PropostaJsPocos from "@/components/propostas/proposta-js-pocos";

export const metadata: Metadata = {
    title: "Proposta Comercial | JS Poços Semi & Artesiano",
    description: "Proposta de desenvolvimento de landing page para JS Poços.",
    robots: "noindex, nofollow",
};

export default function Page() {
    return <PropostaJsPocos />;
}
