'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './landing.module.css';

// ─── Helper ──────────────────────────────────────────────────────────────────
function formatRp(n: number) {
  return 'Rp' + n.toLocaleString('id-ID');
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className={styles.navbar} id="navbar">
      <div className={styles.navInner}>
        <div className={styles.navLogo}>
          <div className={styles.navLogoIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 10h.01M12 10h.01M15 10h.01" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className={styles.navLogoText}>KedeAwak</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#fitur">Fitur</a>
          <a href="#cara-kerja">Cara Kerja</a>
          <a href="#harga">Harga</a>
          <a href="#faq">Tanya Jawab</a>
        </div>
        <div className={styles.navActions}>
          <Link href="/dashboard" className={styles.navMasuk}>Masuk</Link>
          <Link href="/onboarding" className="btn btn-primary btn-sm">Coba Gratis</Link>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroInner}>
        <div className={styles.heroLeft}>
          <span className={styles.heroPill}>
            🚀 Baru di Medan — AI untuk Warung Indonesia
          </span>
          <h1 className={styles.heroHeadline}>
            WhatsApp warung Ibu,{' '}
            <span className={styles.heroHighlight}>otomatis tercatat.</span>
          </h1>
          <p className={styles.heroSub}>
            Pesanan, chat pelanggan, dan bukti transfer dari WhatsApp langsung masuk ke aplikasi. AI yang mencatat, Ibu tinggal terima hasilnya.
          </p>
          <div className={styles.heroActions}>
            <Link href="/onboarding" className="btn btn-primary btn-lg" id="hero-cta-primary">
              Coba Gratis
            </Link>
            <a href="#cara-kerja" className="btn btn-outline btn-lg" id="hero-cta-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/>
              </svg>
              Lihat Cara Kerja
            </a>
          </div>
          <p className={styles.heroTrust}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Tanpa ganti kebiasaan. Tetap pakai WhatsApp seperti biasa.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <strong>500+</strong>
              <span>Warung terdaftar</span>
            </div>
            <div className={styles.heroStatDivider}/>
            <div className={styles.heroStat}>
              <strong>98%</strong>
              <span>Kepuasan pengguna</span>
            </div>
            <div className={styles.heroStatDivider}/>
            <div className={styles.heroStat}>
              <strong>Rp0</strong>
              <span>Untuk mulai</span>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroPhotoWrap}>
            <div className={styles.heroPhotoPlaceholder}>
              <div className={styles.warungScene}>
                <div className={styles.warungCounter}>
                  <div className={styles.warungShelf}>
                    <div className={styles.shelfItem} style={{background:'#FF6B35'}}>Indomie</div>
                    <div className={styles.shelfItem} style={{background:'#4CAF50'}}>Bimoli</div>
                    <div className={styles.shelfItem} style={{background:'#2196F3'}}>Aqua</div>
                    <div className={styles.shelfItem} style={{background:'#9C27B0'}}>Kapal Api</div>
                  </div>
                  <div className={styles.warungOwner}>
                    <div className={styles.ownerAvatar}>BR</div>
                    <div>
                      <p className={styles.ownerName}>Bu Rina</p>
                      <p className={styles.ownerShop}>Warung Berkah Medan</p>
                    </div>
                    <div className={styles.ownerPhone}>📱</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating phone mockup */}
            <div className={styles.floatingPhone}>
              <div className={styles.phoneFrame}>
                <div className={styles.phoneScreen}>
                  <div className={styles.phoneHeader}>
                    <div className={styles.phoneHeaderDot} style={{background:'var(--color-whatsapp)'}}/>
                    <span>KedeAwak</span>
                  </div>
                  <div className={styles.phoneKPI}>
                    <div className={styles.phoneKPILabel}>Penjualan Hari Ini</div>
                    <div className={styles.phoneKPIVal}>Rp1.842.000</div>
                    <div className={styles.phoneKPIChange}>↑ 12% dari kemarin</div>
                  </div>
                  <div className={styles.phoneMsgList}>
                    <div className={styles.phoneMsg}>
                      <div className={styles.phoneMsgWA}>
                        <div className={styles.waBadgeSmall}/>
                      </div>
                      <span>Pesanan baru dari Kak Dewi</span>
                    </div>
                    <div className={styles.phoneMsg}>
                      <div className={styles.phoneMsgWA}>
                        <div className={styles.waBadgeSmall}/>
                      </div>
                      <span>Bukti transfer diterima</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className={`${styles.floatingCard} ${styles.floatingCard1}`}>
              <div className={styles.floatingCardIcon}>📦</div>
              <div>
                <p className={styles.floatingCardTitle}>Pesanan baru dari WhatsApp</p>
                <p className={styles.floatingCardSub}>Telur 2 kg + Gula 1 kg — Rp73.000</p>
              </div>
            </div>
            <div className={`${styles.floatingCard} ${styles.floatingCard2}`}>
              <div className={styles.floatingCardIcon}>⚠️</div>
              <div>
                <p className={styles.floatingCardTitle}>Stok Gula menipis</p>
                <p className={styles.floatingCardSub}>Sisa 4 kg — habis dalam 2 hari</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Problem Strip ────────────────────────────────────────────────────────────
function ProblemStrip() {
  const stats = [
    {
      icon: '🤖',
      number: '90%',
      label: 'UMKM belum memakai AI',
      source: 'Sumber: McKinsey Indonesia SME Report 2025',
    },
    {
      icon: '📒',
      number: '3,5%',
      label: 'UMKM punya laporan keuangan',
      source: 'Sumber: Bank Indonesia Financial Inclusion Survey',
    },
    {
      icon: '📱',
      number: '7 dari 10',
      label: 'Pemilik warung berhenti pakai aplikasi pencatatan dalam 2 minggu',
      source: 'Sumber: Penelitian UX Warung Digital Medan 2025',
    },
  ];
  return (
    <section className={styles.problemStrip} id="masalah">
      <div className="container">
        <p className={styles.problemTitle}>Kenapa ini penting?</p>
        <div className={styles.problemGrid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.problemCard}>
              <span className={styles.problemIcon}>{s.icon}</span>
              <strong className={styles.problemNumber}>{s.number}</strong>
              <p className={styles.problemLabel}>{s.label}</p>
              <p className={styles.problemSource}>{s.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: '1',
      title: 'Hubungkan nomor WhatsApp Business',
      desc: 'Masukkan nomor WA bisnis warung Ibu. Verifikasi dengan kode OTP. Selesai dalam 2 menit.',
      icon: '📱',
    },
    {
      num: '2',
      title: 'AI mencatat otomatis dari teks, suara, dan foto struk',
      desc: 'Pelanggan chat pesan? Ibu kirim voice note penjualan? Foto struk belanja? Semua otomatis terbaca dan tercatat.',
      icon: '🤖',
    },
    {
      num: '3',
      title: 'Lihat laporan dan setujui aksi AI',
      desc: 'Ibu tinggal buka aplikasi, lihat ringkasan, dan setujui atau ubah saran AI. Selalu ada kontrol di tangan Ibu.',
      icon: '✅',
    },
  ];
  return (
    <section className={styles.howItWorks} id="cara-kerja">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPill}>Cara Kerja</span>
          <h2 className={styles.sectionTitle}>Tiga langkah, dan warung Ibu sudah terhubung</h2>
          <p className={styles.sectionSub}>Tidak perlu ganti aplikasi WhatsApp. Tidak perlu belajar sistem baru.</p>
        </div>
        <div className={styles.stepsWrap}>
          {steps.map((step, i) => (
            <div key={i} className={styles.stepItem}>
              <div className={styles.stepNumber}>{step.num}</div>
              {i < steps.length - 1 && <div className={styles.stepLine}/>}
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function FeaturesGrid() {
  const features = [
    {
      icon: '📱',
      title: 'Integrasi WhatsApp ke Aplikasi',
      desc: 'Semua pesan WA bisnis masuk langsung ke dashboard. Tidak ada yang terlewat.',
      badge: 'WhatsApp',
    },
    {
      icon: '🎤',
      title: 'Catat dari Suara dan Foto Struk',
      desc: 'Kirim voice note atau foto struk belanja — AI langsung baca dan catat hasilnya.',
      badge: 'AI OCR',
    },
    {
      icon: '⚠️',
      title: 'Alert Stok Menipis',
      desc: 'AI pantau stok dan ingatkan Ibu sebelum barang habis. Tidak perlu cek manual.',
      badge: 'Smart Alert',
    },
    {
      icon: '💬',
      title: 'Balas Pelanggan 24 Jam',
      desc: 'Pertanyaan umum pelanggan dijawab otomatis — jam berapapun, tanpa Ibu online.',
      badge: '24 Jam',
    },
    {
      icon: '📊',
      title: 'Laporan Keuangan Sekali Tanya',
      desc: 'Ketik "laporan hari ini" di chat — AI kirim ringkasan penjualan, laba, dan pengeluaran.',
      badge: 'AI Chat',
    },
    {
      icon: '🚚',
      title: 'Pesan Barang ke Supplier',
      desc: 'AI buat draft pesanan ke supplier berdasarkan stok. Ibu tinggal setujui dan kirim via WA.',
      badge: 'Otomatis',
    },
  ];

  return (
    <section className={styles.features} id="fitur">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPill}>Fitur Unggulan</span>
          <h2 className={styles.sectionTitle}>Semua yang Ibu butuhkan, dalam satu tempat</h2>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureTop}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <span className={`badge badge-green`}>{f.badge}</span>
              </div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Chat Demo ─────────────────────────────────────────────────────────────────
function ChatDemo() {
  return (
    <section className={styles.chatDemo} id="demo">
      <div className="container">
        <div className={styles.chatDemoInner}>
          <div className={styles.chatDemoPhone}>
            <div className={styles.cdPhoneFrame}>
              <div className={styles.cdHeader}>
                <div className={styles.cdAvatar}>AI</div>
                <div>
                  <p className={styles.cdName}>Asisten KedeAwak</p>
                  <p className={styles.cdStatus}>● Aktif 24 jam</p>
                </div>
              </div>
              <div className={styles.cdMessages}>
                <div className={styles.cdMsgOwner}>Laporan hari ini</div>
                <div className={styles.cdMsgAI}>
                  <div className={styles.cdSummaryCard}>
                    <p className={styles.cdSummaryTitle}>📊 Ringkasan Hari Ini — Minggu, 11 Okt</p>
                    <div className={styles.cdSummaryRow}>
                      <span>Penjualan</span>
                      <strong className="money" style={{color:'var(--color-primary)'}}>Rp1.842.000</strong>
                    </div>
                    <div className={styles.cdSummaryRow}>
                      <span>Pengeluaran</span>
                      <strong className="money" style={{color:'var(--color-danger)'}}>Rp615.000</strong>
                    </div>
                    <div className={styles.cdSummaryRow} style={{borderTop:'1px solid var(--color-border)', paddingTop:8, marginTop:4}}>
                      <span style={{fontWeight:700}}>Laba Bersih</span>
                      <strong className="money" style={{color:'var(--color-primary)', fontWeight:800}}>Rp1.227.000</strong>
                    </div>
                    <button className={`btn btn-primary btn-sm`} style={{width:'100%', marginTop:12}}>Lihat laporan lengkap</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.chatDemoText}>
            <span className={styles.sectionPill}>Demo Chat AI</span>
            <h2 className={styles.sectionTitle} style={{marginTop:12}}>Cukup tanya,<br/>AI yang menghitung.</h2>
            <p className={styles.chatDemoSub}>
              Tidak perlu buka menu berlapis atau isi formulir rumit. Cukup kirim pesan ke AI seperti chatting biasa — AI langsung jawab dengan data warung Ibu yang sebenarnya.
            </p>
            <div className={styles.chatDemoPoints}>
              <div className={styles.chatDemoPoint}>
                <div className={styles.chatDemoDot}/>
                <span>Tanya dalam bahasa sehari-hari</span>
              </div>
              <div className={styles.chatDemoPoint}>
                <div className={styles.chatDemoDot}/>
                <span>Jawaban instan dengan angka nyata</span>
              </div>
              <div className={styles.chatDemoPoint}>
                <div className={styles.chatDemoDot}/>
                <span>Bisa lewat suara juga</span>
              </div>
            </div>
            <Link href="/chat" className="btn btn-primary" id="demo-chat-cta">Coba Chat AI →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
function ComparisonTable() {
  const rows = [
    { label: 'Integrasi WhatsApp otomatis', kedeawak: true, bukuwarung: false, bukukas: false, moka: false },
    { label: 'Input suara dan foto struk', kedeawak: true, bukuwarung: false, bukukas: false, moka: false },
    { label: 'AI yang bisa bertindak', kedeawak: true, bukuwarung: false, bukukas: false, moka: false },
    { label: 'Balas pelanggan otomatis', kedeawak: true, bukuwarung: false, bukukas: false, moka: false },
    { label: 'Harga mulai dari', kedeawak: 'Gratis', bukuwarung: 'Gratis*', bukukas: 'Gratis*', moka: 'Rp299.000/bln' },
  ];

  return (
    <section className={styles.comparison} id="perbandingan">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPill}>Perbandingan</span>
          <h2 className={styles.sectionTitle}>Apa bedanya KedeAwak?</h2>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.compTable}>
            <thead>
              <tr>
                <th className={styles.compFeatureCol}>Fitur</th>
                <th className={styles.compHighlightCol}>
                  <div className={styles.compHighlightBadge}>
                    <span>🏆</span> KedeAwak
                  </div>
                </th>
                <th>BukuWarung</th>
                <th>BukuKas</th>
                <th>Moka POS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className={styles.compFeatureLabel}>{row.label}</td>
                  <td className={styles.compHighlightCell}>
                    {typeof row.kedeawak === 'boolean' ? (
                      row.kedeawak
                        ? <span className={styles.checkYes}>✓</span>
                        : <span className={styles.checkNo}>—</span>
                    ) : (
                      <strong style={{color:'var(--color-primary)'}}>{row.kedeawak}</strong>
                    )}
                  </td>
                  {['bukuwarung', 'bukukas', 'moka'].map((key) => (
                    <td key={key} className={styles.compCell}>
                      {typeof row[key as keyof typeof row] === 'boolean' ? (
                        row[key as keyof typeof row]
                          ? <span className={styles.checkYes}>✓</span>
                          : <span className={styles.checkNo}>—</span>
                      ) : (
                        <span style={{color:'var(--color-text-secondary)'}}>{String(row[key as keyof typeof row])}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      avatar: 'SR',
      name: 'Ibu Sri Wahyuni',
      shop: 'Warung Sri — Medan Petisah',
      quote: 'Dulu saya catat di buku terus lupa. Sekarang tinggal voice note, langsung masuk semua. Cocok banget buat saya yang gaptek.',
      rating: 5,
    },
    {
      avatar: 'PH',
      name: 'Pak Hotman Siregar',
      shop: 'Toko Hotman — Binjai',
      quote: 'Pesanan WhatsApp dulu sering ketinggalan. Sekarang semuanya ada di satu tempat. Omset naik 20% bulan pertama.',
      rating: 5,
    },
    {
      avatar: 'KD',
      name: 'Kak Dewi Anggraini',
      shop: 'Toko Online Dewi — Deli Serdang',
      quote: 'Saya jual online lewat WA. KedeAwak bantu saya balas pelanggan otomatis waktu tidur. Pelanggan senang, saya juga!',
      rating: 5,
    },
  ];

  return (
    <section className={styles.testimonials} id="testimoni">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPill}>Testimoni</span>
          <h2 className={styles.sectionTitle}>Kata mereka yang sudah pakai</h2>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>
                {'★'.repeat(t.rating)}
              </div>
              <p className={styles.testimonialQuote}>"{t.quote}"</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>{t.avatar}</div>
                <div>
                  <p className={styles.testimonialName}>{t.name}</p>
                  <p className={styles.testimonialShop}>{t.shop}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
  const plans = [
    {
      name: 'Gratis',
      price: 0,
      unit: '',
      badge: null,
      features: [
        '10 transaksi per hari',
        'Chat AI terbatas',
        'Laporan harian',
        'Integrasi WhatsApp',
      ],
      notIncluded: ['Alert stok otomatis', 'Balas pelanggan 24 jam', 'Pesanan ke supplier'],
      cta: 'Mulai Gratis',
      ctaStyle: 'outline',
    },
    {
      name: 'Warung',
      price: 19900,
      unit: '/bulan',
      badge: 'Paling Populer',
      features: [
        'Transaksi tidak terbatas',
        'Chat AI penuh (200 permintaan/bln)',
        'Laporan harian, mingguan, bulanan',
        'Integrasi WhatsApp penuh',
        'Alert stok otomatis',
        'Balas pelanggan 24 jam',
        'Pesanan ke supplier otomatis',
        'Laporan untuk KUR',
      ],
      notIncluded: [],
      cta: 'Coba Gratis 14 Hari',
      ctaStyle: 'primary',
    },
    {
      name: 'Koin Pintar',
      price: 10000,
      unit: '= 100 koin',
      badge: 'Bayar sesuai pakai',
      features: [
        'Beli koin sesuai kebutuhan',
        'Tidak ada langganan bulanan',
        'Semua fitur Paket Warung',
        'Cocok untuk warung musiman',
      ],
      notIncluded: [],
      cta: 'Beli Koin',
      ctaStyle: 'outline',
    },
  ];

  return (
    <section className={styles.pricing} id="harga">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPill}>Harga</span>
          <h2 className={styles.sectionTitle}>Terjangkau untuk semua warung</h2>
          <p className={styles.sectionSub}>Mulai gratis, upgrade kapan Ibu mau.</p>
        </div>
        <div className={styles.pricingGrid}>
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`${styles.pricingCard} ${plan.badge === 'Paling Populer' ? styles.pricingPopular : ''}`}
            >
              {plan.badge && (
                <div className={styles.pricingBadge}>{plan.badge}</div>
              )}
              <h3 className={styles.pricingName}>{plan.name}</h3>
              <div className={styles.pricingPrice}>
                {plan.price === 0 ? (
                  <span className={styles.pricingAmount}>Rp0</span>
                ) : (
                  <span className={styles.pricingAmount}>{formatRp(plan.price)}</span>
                )}
                <span className={styles.pricingUnit}>{plan.unit}</span>
              </div>
              <ul className={styles.pricingFeatures}>
                {plan.features.map((f, j) => (
                  <li key={j} className={styles.pricingFeatureItem}>
                    <span className={styles.featureCheck}>✓</span>
                    {f}
                  </li>
                ))}
                {plan.notIncluded.map((f, j) => (
                  <li key={`no-${j}`} className={`${styles.pricingFeatureItem} ${styles.pricingFeatureNo}`}>
                    <span className={styles.featureCross}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className={`btn btn-${plan.ctaStyle} ${plan.badge === 'Paling Populer' ? '' : ''}`}
                style={{width:'100%', marginTop:'auto'}}
                id={`pricing-cta-${plan.name.toLowerCase().replace(' ', '-')}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Privacy ──────────────────────────────────────────────────────────────────
function PrivacyBand() {
  const points = [
    { icon: '📱', text: 'Hanya nomor WhatsApp Business warung yang terhubung' },
    { icon: '🔒', text: 'Data dienkripsi end-to-end' },
    { icon: '🚫', text: 'Tidak dibagikan ke pihak ketiga' },
    { icon: '🗑️', text: 'Bisa dihapus kapan saja' },
  ];

  return (
    <section className={styles.privacy}>
      <div className="container">
        <div className={styles.privacyInner}>
          <div className={styles.privacyLeft}>
            <span className={styles.privacyLock}>🔐</span>
            <h2 className={styles.privacyTitle}>Data pelanggan Ibu aman</h2>
            <p className={styles.privacyDesc}>Privasi adalah hak, bukan fitur tambahan.</p>
          </div>
          <div className={styles.privacyPoints}>
            {points.map((p, i) => (
              <div key={i} className={styles.privacyPoint}>
                <span className={styles.privacyPointIcon}>{p.icon}</span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    {
      q: 'Apakah saya harus ganti nomor WhatsApp?',
      a: 'Tidak perlu. Ibu tetap pakai nomor WhatsApp Business yang sama. KedeAwak hanya membaca pesan yang masuk ke nomor bisnis itu — WhatsApp pribadi tidak tersentuh sama sekali.',
    },
    {
      q: 'Bagaimana AI membaca voice note dan foto struk?',
      a: 'AI kami menggunakan teknologi speech-to-text dan OCR (optical character recognition). Voice note diubah jadi teks, lalu angkanya diekstrak. Foto struk dibaca dan total belanja dikenali otomatis.',
    },
    {
      q: 'Apakah data transaksi saya aman?',
      a: 'Ya. Semua data dienkripsi dan disimpan di server Indonesia. Kami tidak pernah menjual atau membagikan data Ibu ke pihak mana pun. Ibu bisa minta hapus data kapan saja.',
    },
    {
      q: 'Bagaimana cara AI membalas pelanggan?',
      a: 'Ibu bisa atur template jawaban untuk pertanyaan umum seperti jam buka, daftar produk, atau konfirmasi pesanan. AI hanya balas berdasarkan template yang Ibu setujui — tidak pernah improvisasi di luar itu.',
    },
    {
      q: 'Apakah bisa dipakai di HP biasa?',
      a: 'Bisa. Aplikasi KedeAwak berjalan di browser HP Android maupun iPhone. Tidak perlu HP mahal. Koneksi internet yang stabil sudah cukup.',
    },
    {
      q: 'Bagaimana kalau saya mau berhenti langganan?',
      a: 'Tidak ada kontrak jangka panjang. Ibu bisa berhenti kapan saja. Data bisa diunduh atau dihapus sesuai permintaan. Tidak ada biaya penalti.',
    },
  ];

  return (
    <section className={styles.faq} id="faq">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPill}>Tanya Jawab</span>
          <h2 className={styles.sectionTitle}>Pertanyaan yang sering ditanya</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div key={i} className={`${styles.faqItem} ${openIndex === i ? styles.faqOpen : ''}`}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                id={`faq-btn-${i}`}
              >
                {faq.q}
                <span className={styles.faqChevron}>
                  {openIndex === i ? '▲' : '▼'}
                </span>
              </button>
              {openIndex === i && (
                <div className={styles.faqAnswer}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className={styles.finalCta}>
      <div className="container">
        <div className={styles.finalCtaInner}>
          <h2 className={styles.finalCtaTitle}>Warung Ibu bisa lebih mudah dikelola hari ini</h2>
          <p className={styles.finalCtaSub}>Mulai gratis. Tidak perlu kartu kredit. Hubungkan WhatsApp dalam 2 menit.</p>
          <Link href="/onboarding" className="btn btn-primary btn-lg" id="final-cta-btn" style={{background:'#fff', color:'var(--color-primary)'}}>
            Mulai Gratis Sekarang →
          </Link>
          <p style={{color:'rgba(255,255,255,0.7)', fontSize:13, marginTop:12}}>
            Bergabung dengan 500+ pemilik warung di Medan dan sekitarnya
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <div className={styles.navLogoIcon} style={{width:32, height:32}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.footerLogoText}>KedeAwak</span>
            </div>
            <p className={styles.footerDesc}>
              AI assistant untuk warung dan toko Indonesia. Catat otomatis lewat WhatsApp, AI yang kerja keras.
            </p>
            <p className={styles.footerMade}>🇮🇩 Dibuat di Medan, untuk UMKM Indonesia</p>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>Produk</h4>
            <a href="#fitur">Fitur</a>
            <a href="#harga">Harga</a>
            <Link href="/dashboard">Dashboard Demo</Link>
            <Link href="/chat">Chat AI Demo</Link>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>Perusahaan</h4>
            <a href="#">Tentang Kami</a>
            <a href="#">Blog</a>
            <a href="#">Karier</a>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>Bantuan</h4>
            <a href="#">Pusat Bantuan</a>
            <a href="#">Status Layanan</a>
            <a href="https://wa.me/6281234567890">
              💬 WhatsApp Support
            </a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 KedeAwak. Hak cipta dilindungi.</p>
          <div className={styles.footerLinks}>
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProblemStrip />
      <HowItWorks />
      <FeaturesGrid />
      <ChatDemo />
      <ComparisonTable />
      <Testimonials />
      <Pricing />
      <PrivacyBand />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
