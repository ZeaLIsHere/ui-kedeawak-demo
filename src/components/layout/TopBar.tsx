'use client';

import styles from './TopBar.module.css';

interface TopBarProps {
  greeting?: string;
  date?: string;
  notifCount?: number;
  avatar?: string;
  name?: string;
}

export default function TopBar({
  greeting = 'Selamat sore',
  date = 'Minggu, 11 Okt 2026',
  notifCount = 3,
  avatar = 'BR',
  name = 'Bu Rina',
}: TopBarProps) {
  return (
    <header className={styles.topBar}>
      <div className={styles.left}>
        <div>
          <h2 className={styles.greeting}>{greeting}, {name} 👋</h2>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.search}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Cari transaksi, pelanggan..." className={styles.searchInput} />
        </div>
        <button className={styles.notifBtn} id="notif-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {notifCount > 0 && (
            <span className={styles.notifBadge}>{notifCount}</span>
          )}
        </button>
        <div className={styles.avatar}>
          <span>{avatar}</span>
        </div>
      </div>
    </header>
  );
}
