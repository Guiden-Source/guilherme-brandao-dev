import React, { Suspense } from 'react';
import { Metadata } from 'next';
import OrcamentoBuilder from '@/components/orcamento/orcamento-builder';

export const metadata: Metadata = {
    title: "Orçamento | Guilherme Brandão - Desenvolvedor Web",
    description: "Monte seu orçamento personalizado para desenvolvimento web, SEO, rastreamento e muito mais.",
};

export default function OrcamentoPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#19191A' }} />}>
            <OrcamentoBuilder />
        </Suspense>
    );
}
