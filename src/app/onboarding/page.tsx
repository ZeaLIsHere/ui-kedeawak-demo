'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './onboarding.module.css';

type Screen = 1 | 2 | 3;

// Screen 1 — Selamat Datang
function Screen1({ onNext }: { onNext: () => void }) {
  return (
    <div className={styles.screen}>
      <div className={styles.warungPhoto}>
        <div className={styles.warungBg}>
          <div className={styles.warungVisual}>
            <div className={styles.warungSign}>🏪 Warung Berkah</div>
            <div className={styles.warungProducts}>
              <div className={styles.warungProduct} style={{background:'#FF6B35'}}>Indomie</div>
              <div className={styles.warungProduct} style={{background:'#4CAF50'}}>Bimoli</div>
              <div className={styles.warungProduct} style={{background:'#2196F3'}}>Aqua</div>
            </div>
            <div className={styles.warungOwnerScene}>
              <div className={styles.warungOwnerAvatar}>BR</div>
              <div>
                <p style={{color:'white', fontWeight:700, fontSize:14}}>Bu Rina</p>
                <p style={{color:'rgba(255,255,255,0.7)', fontSize:12}}>Warung Berkah Medan</p>
              </div>
              <div style={{marginLeft:'auto', fontSize:28}}>📱</div>
            </div>
          </div>
        </div>
        {/* Floating cards on photo */}
        <div className={styles.photoFloat1}>
          <span>✅</span>
          <p>Pesanan dari WA tercatat!</p>
        </div>
        <div className={styles.photoFloat2}>
          <span>📊</span>
          <p>Laba hari ini Rp1.227.000</p>
        </div>
      </div>

      <div className={styles.bottomSheet}>
        <div className={styles.logoSmall}>
          <div className={styles.logoIconSm}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2.2"/>
            </svg>
          </div>
          <span>KedeAwak</span>
        </div>
        <h1 className={styles.sheetHeadline}>Catatan warung, cukup lewat WhatsApp</h1>
        <p className={styles.sheetSub}>
          Pesanan, stok, dan keuangan warung Ibu otomatis tercatat. AI yang kerja keras, Ibu tinggal lihat hasilnya.
        </p>
        <button className="btn btn-primary btn-lg" style={{width:'100%'}} onClick={onNext} id="onboard-mulai-btn">
          Mulai →
        </button>
        <Link href="/dashboard" className={styles.loginLink}>
          Saya sudah punya akun — Masuk
        </Link>
      </div>
    </div>
  );
}

// Screen 2 — Hubungkan WhatsApp
function Screen2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (phone.length >= 8) {
      setSent(true);
      setTimeout(() => onNext(), 1200);
    }
  };

  return (
    <div className={styles.screen}>
      <div className={styles.screen2Header}>
        <button className={styles.backBtn} onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
        </button>
        <div className={styles.logoSmall} style={{justifyContent:'center', flex:1}}>
          <div className={styles.logoIconSm}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2.2"/>
            </svg>
          </div>
          <span>KedeAwak</span>
        </div>
        <div style={{width:36}}/>
      </div>

      <div className={styles.screen2Content}>
        <div className={styles.screen2Icon}>📱</div>
        <h2 className={styles.screen2Title}>Hubungkan WhatsApp Business</h2>
        <p className={styles.screen2Sub}>
          Masukkan nomor WA yang dipakai untuk bisnis warung Ibu. Kami akan kirim kode verifikasi.
        </p>

        <div className={styles.phoneInputWrap}>
          <div className={styles.phonePrefix}>+62</div>
          <input
            className={styles.phoneInput}
            type="tel"
            placeholder="812-3456-7890"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
            id="phone-input"
          />
        </div>

        <div className={styles.privacyNote}>
          <span>🔒</span>
          <p>Kami hanya membaca pesan yang masuk ke nomor bisnis Ibu. WhatsApp pribadi tidak tersentuh.</p>
        </div>

        <div className={styles.steps}>
          <div className={styles.stepDot} style={{background:'var(--color-primary)'}}/>
          <div className={styles.stepDot} style={{background:'var(--color-primary)', opacity:0.4}}/>
          <div className={styles.stepDot} style={{background:'var(--color-border)'}}/>
        </div>

        <button
          className={`btn btn-primary btn-lg ${styles.kirimBtn}`}
          onClick={handleSend}
          disabled={phone.length < 8}
          id="kirim-kode-btn"
        >
          {sent ? '✅ Kode Terkirim!' : 'Kirim Kode →'}
        </button>
      </div>
    </div>
  );
}

// Screen 3 — Siap Digunakan
function Screen3() {
  const chips = [
    '🎤 Catat penjualan lewat suara',
    '📸 Foto struk belanja',
    '📊 Tanya laporan hari ini',
  ];

  return (
    <div className={styles.screen3}>
      <div className={styles.screen3Content}>
        <div className={styles.successCircle}>
          <span className={styles.successCheck}>✓</span>
        </div>
        <h2 className={styles.screen3Title}>AI sudah siap membantu Ibu! 🎉</h2>
        <p className={styles.screen3Sub}>
          WhatsApp bisnis Ibu sudah terhubung. Mulai kirim pesan atau coba fitur-fitur di bawah ini.
        </p>

        <div className={styles.exampleChips}>
          <p className={styles.chipLabel}>Coba sekarang:</p>
          {chips.map((chip, i) => (
            <div key={i} className={styles.exampleChip}>
              {chip}
              <span className={styles.chipArrow}>→</span>
            </div>
          ))}
        </div>

        <Link href="/dashboard" className="btn btn-primary btn-lg" style={{width:'100%', marginTop:24}} id="buka-beranda-btn">
          Buka Beranda →
        </Link>

        <Link href="/chat" className="btn btn-outline" style={{width:'100%', marginTop:10}} id="mulai-chat-btn">
          💬 Mulai Chat dengan AI
        </Link>
      </div>
    </div>
  );
}

// ─── Main Onboarding ──────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const [screen, setScreen] = useState<Screen>(1);

  return (
    <div className={styles.onboardingWrap}>
      <div className={styles.mobileFrame}>
        {screen === 1 && <Screen1 onNext={() => setScreen(2)}/>}
        {screen === 2 && <Screen2 onNext={() => setScreen(3)} onBack={() => setScreen(1)}/>}
        {screen === 3 && <Screen3/>}
      </div>

      {/* Dots */}
      <div className={styles.screenDots}>
        {([1, 2, 3] as Screen[]).map(s => (
          <button
            key={s}
            className={`${styles.dot} ${screen === s ? styles.dotActive : ''}`}
            onClick={() => setScreen(s)}
            id={`dot-${s}`}
          />
        ))}
      </div>
    </div>
  );
}
