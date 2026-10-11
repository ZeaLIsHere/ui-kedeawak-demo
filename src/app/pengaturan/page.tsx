'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';

export default function PengaturanPage() {
  const [shopName, setShopName] = useState('Warung Berkah Medan');
  const [ownerName, setOwnerName] = useState('Bu Rina');
  const [notifStok, setNotifStok] = useState(true);
  const [notifPesanan, setNotifPesanan] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <Sidebar active="pengaturan" />
      <div style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <div style={{ padding: '24px 32px 40px', maxWidth: 720 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 24 }}>
            Pengaturan
          </h1>

          {/* Profil */}
          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--color-text-primary)' }}>
              👤 Profil Warung
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                  Nama Warung
                </label>
                <input
                  className="input"
                  value={shopName}
                  onChange={e => setShopName(e.target.value)}
                  id="shop-name-input"
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                  Nama Pemilik
                </label>
                <input
                  className="input"
                  value={ownerName}
                  onChange={e => setOwnerName(e.target.value)}
                  id="owner-name-input"
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 6 }}>
                  Kota
                </label>
                <input className="input" defaultValue="Medan, Sumatera Utara" id="city-input" />
              </div>
            </div>
          </div>

          {/* Notifikasi */}
          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--color-text-primary)' }}>
              🔔 Notifikasi
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { label: 'Alert stok menipis', desc: 'Beritahu saya saat stok barang hampir habis', value: notifStok, setter: setNotifStok, id: 'notif-stok' },
                { label: 'Pesanan baru dari WhatsApp', desc: 'Beritahu saya saat ada pesanan masuk', value: notifPesanan, setter: setNotifPesanan, id: 'notif-pesanan' },
              ].map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 0', borderBottom: '1px solid var(--color-border-light)' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.label}</p>
                    <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>{item.desc}</p>
                  </div>
                  <label className="toggle" id={item.id}>
                    <input type="checkbox" checked={item.value} onChange={e => item.setter(e.target.checked)} />
                    <span className="toggle-slider" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Paket */}
          <div className="card" style={{ padding: 24, marginBottom: 20, border: '1.5px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ display: 'inline-block', background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', fontSize: 12, fontWeight: 700, padding: '3px 12px', borderRadius: 999, marginBottom: 8 }}>
                  ⭐ Paket Warung
                </span>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)' }}>Aktif hingga 11 Nov 2026</p>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>Rp19.900/bulan · 142/200 permintaan AI digunakan</p>
              </div>
              <button className="btn btn-outline btn-sm" id="upgrade-plan-btn">Kelola Paket</button>
            </div>
          </div>

          <button
            className={`btn btn-primary`}
            onClick={handleSave}
            id="save-settings-btn"
            style={{ minWidth: 160 }}
          >
            {saved ? '✅ Tersimpan!' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}
