'use client';

import Link from 'next/link';
import { Archive, BarChart3, Home, MessageCircle, Package, Settings, Smartphone, Users } from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  active?: string;
}

const navItems = [
  { id: 'beranda', label: 'Beranda', icon: Home, href: '/dashboard' },
  { id: 'chat', label: 'Chat AI', icon: MessageCircle, href: '/chat' },
  { id: 'pesanan', label: 'Pesanan', icon: Package, href: '/pesanan' },
  { id: 'stok', label: 'Stok', icon: Archive, href: '/stok' },
  { id: 'laporan', label: 'Laporan', icon: BarChart3, href: '/laporan' },
  { id: 'pelanggan', label: 'Pelanggan', icon: Users, href: '/pelanggan' },
  { id: 'whatsapp', label: 'Integrasi WhatsApp', icon: Smartphone, href: '/whatsapp' },
  { id: 'pengaturan', label: 'Pengaturan', icon: Settings, href: '/pengaturan' },
];

export default function Sidebar({ active = 'beranda' }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 10h.01M12 10h.01M15 10h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span className={styles.logoText}>KedeAwak</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`${styles.navItem} ${active === item.id ? styles.navItemActive : ''}`}
          >
            <span className={styles.navIcon}><item.icon size={20} aria-hidden="true" /></span>
            <span className={styles.navLabel}>{item.label}</span>
            {item.id === 'chat' && (
              <span className={styles.badge}>3</span>
            )}
          </Link>
        ))}
      </nav>

      <div className={styles.planCard}>
        <div className={styles.planHeader}>
          <span className={styles.planBadge}>Paket Warung</span>
        </div>
        <p className={styles.planUsage}>142 / 200 permintaan AI</p>
        <div className="progress-bar" style={{ marginTop: 8 }}>
          <div
            className="progress-fill"
            style={{
              width: '71%',
              background: 'var(--color-primary)',
            }}
          />
        </div>
        <p className={styles.planHint}>Sisa 58 permintaan bulan ini</p>
      </div>
    </aside>
  );
}
