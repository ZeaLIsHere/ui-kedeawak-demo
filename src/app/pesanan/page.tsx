'use client';

import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';

function PlaceholderPage({ title, icon, desc, href, hrefLabel }: {
  title: string;
  icon: string;
  desc: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Sidebar active={title.toLowerCase()} />
      <div style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 20,
          padding: 40,
        }}>
          <span style={{ fontSize: 64 }}>{icon}</span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 28,
            fontWeight: 800,
            color: 'var(--color-text-primary)',
          }}>
            {title}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 16, textAlign: 'center', maxWidth: 400 }}>
            {desc}
          </p>
          {href && (
            <Link href={href} className="btn btn-primary">
              {hrefLabel}
            </Link>
          )}
          <Link href="/dashboard" className="btn btn-ghost btn-sm">
            ← Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PesananPage() {
  return (
    <PlaceholderPage
      title="Pesanan"
      icon="📦"
      desc="Halaman Pesanan akan menampilkan semua pesanan masuk dari WhatsApp, status pengiriman, dan konfirmasi pembayaran."
      href="/whatsapp"
      hrefLabel="Buka Kotak Masuk WhatsApp →"
    />
  );
}
