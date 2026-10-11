'use client';

import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';

export default function PelangganPage() {
  const pelanggan = [
    { initials: 'KD', name: 'Kak Dewi Anggraini', phone: '+62 812-8765-4321', orders: 14, total: 1042000, lastOrder: '11 Okt 2026' },
    { initials: 'PB', name: 'Pak Budi Lubis', phone: '+62 813-5678-9012', orders: 8, total: 584000, lastOrder: '10 Okt 2026' },
    { initials: 'IS', name: 'Ibu Sri Wahyuni', phone: '+62 819-2345-6789', orders: 22, total: 1820000, lastOrder: '11 Okt 2026' },
    { initials: 'BA', name: 'Bang Andi', phone: '+62 815-6789-0123', orders: 6, total: 420000, lastOrder: '9 Okt 2026' },
    { initials: 'PH', name: 'Pak Hotman Siregar', phone: '+62 812-3456-7890', orders: 11, total: 924000, lastOrder: '8 Okt 2026' },
    { initials: 'ND', name: 'Nita Dewi', phone: '+62 818-9012-3456', orders: 5, total: 385000, lastOrder: '7 Okt 2026' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Sidebar active="pelanggan" />
      <div style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <div style={{ padding: '24px 32px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, color: 'var(--color-text-primary)' }}>
                Pelanggan
              </h1>
              <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 2 }}>
                {pelanggan.length} pelanggan aktif
              </p>
            </div>
            <button className="btn btn-primary" id="add-pelanggan-btn">+ Tambah Pelanggan</button>
          </div>

          <div className="card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
                  {['Pelanggan', 'No. WhatsApp', 'Pesanan', 'Total Belanja', 'Terakhir Pesan', ''].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pelanggan.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border-light)', transition: 'background var(--transition)' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: '50%',
                          background: 'var(--color-primary-light)', color: 'var(--color-primary)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, fontSize: 12, flexShrink: 0,
                        }}>
                          {p.initials}
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-text-primary)' }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--color-text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                      {p.phone}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--color-text-primary)', fontWeight: 600 }}>
                      {p.orders}x
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 700, color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums' }}>
                      Rp{p.total.toLocaleString('id-ID')}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--color-text-muted)' }}>
                      {p.lastOrder}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button className="btn btn-ghost btn-sm">Chat WA</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
