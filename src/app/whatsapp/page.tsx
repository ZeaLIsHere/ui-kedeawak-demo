'use client';

import { useState } from 'react';
import { Bot, Camera, Check, CheckCircle2, Inbox, LockKeyhole, Mail, Package, Settings, Trash2 } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import styles from './whatsapp.module.css';

function formatRp(n: number) {
  return 'Rp' + n.toLocaleString('id-ID');
}

// Mock WhatsApp conversations
const conversations = [
  {
    id: 1,
    name: 'Kak Dewi',
    initials: 'KD',
    preview: 'Bu, pesen telur 2 kg sama gula ya',
    time: '14:32',
    unread: 2,
    type: 'Pesanan',
    active: true,
  },
  {
    id: 2,
    name: 'Pak Budi Lubis',
    initials: 'PB',
    preview: 'Transfer sdh ya Bu, ini buktinnya',
    time: '14:18',
    unread: 0,
    type: 'Bukti Transfer',
    active: false,
  },
  {
    id: 3,
    name: 'Ibu Sri',
    initials: 'IS',
    preview: 'Bu minyak goreng masih ada stoknya?',
    time: '13:55',
    unread: 1,
    type: 'Pertanyaan',
    active: false,
  },
  {
    id: 4,
    name: 'Bang Andi',
    initials: 'BA',
    preview: 'Pesen indomie 10 bungkus dikirim ya',
    time: '13:12',
    unread: 0,
    type: 'Pesanan',
    active: false,
  },
  {
    id: 5,
    name: 'Pak Hotman Siregar',
    initials: 'PH',
    preview: 'Beras 5 kg ada gak bu?',
    time: '12:44',
    unread: 0,
    type: 'Pertanyaan',
    active: false,
  },
];

const chatMessages = [
  { id: 1, from: 'customer', text: 'Bu, pesen telur 2 kg sama gula 1 kg ya', time: '14:28' },
  { id: 2, from: 'ai', text: 'Pesanan Bu Dewi tercatat:\n• Telur 2 kg: Rp56.000\n• Gula 1 kg: Rp17.000\nTotal: Rp73.000\n\nSilakan transfer ke rek BRI 1234-5678-9012 a/n Warung Berkah, lalu kirim buktiny ya!', time: '14:28', isAI: true },
  { id: 3, from: 'customer', text: 'Oke Bu, transfer dulu ya', time: '14:29' },
  { id: 4, from: 'customer', isPhoto: true, time: '14:31', photoCaption: 'bukti_transfer_bca.jpg' },
  { id: 5, from: 'ai', text: 'Transfer Rp73.000 terdeteksi. Pesanan Bu Dewi lunas ya!', time: '14:32', isAI: true },
];

type TabType = 'integrasi' | 'inbox';

export default function WhatsAppPage() {
  const [tab, setTab] = useState<TabType>('integrasi');
  const [autoOrder, setAutoOrder] = useState(true);
  const [autoReply, setAutoReply] = useState(true);
  const [autoReceipt, setAutoReceipt] = useState(true);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar active="whatsapp"/>
      <div className={styles.main}>
        <TopBar />
        <div className={styles.content}>
          {/* Tabs */}
          <div className={styles.tabsRow}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${tab === 'integrasi' ? styles.tabActive : ''}`}
                onClick={() => setTab('integrasi')}
                id="tab-integrasi"
              >
                <Settings size={16} aria-hidden="true" /> Integrasi WhatsApp
              </button>
              <button
                className={`${styles.tab} ${tab === 'inbox' ? styles.tabActive : ''}`}
                onClick={() => setTab('inbox')}
                id="tab-inbox"
              >
                <Inbox size={16} aria-hidden="true" /> Kotak Masuk
                <span className={styles.tabBadge}>3</span>
              </button>
            </div>
          </div>

          {/* ─── SCREEN A: Integration ─────────────────────────── */}
          {tab === 'integrasi' && (
            <div className={styles.integrasiContent}>
              {/* Connected state */}
              <div className={`${styles.connectedCard} card`}>
                <div className={styles.connectedLeft}>
                  <div className={styles.waIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.connectedNum}>+62 812 3456 78xx</p>
                    <p className={styles.connectedSync}>Sinkronisasi terakhir 2 menit lalu</p>
                  </div>
                </div>
                <div className={styles.connectedRight}>
                  <span className="badge badge-green">● Terhubung</span>
                  <button className="btn btn-ghost btn-sm" id="disconnect-btn">Putuskan</button>
                </div>
              </div>

              {/* Stepper */}
              <div className={`${styles.stepperCard} card`}>
                <h3 className={styles.cardTitle}>Langkah Koneksi</h3>
                <div className={styles.stepper}>
                  {['Masukkan nomor', 'Verifikasi kode', 'Selesai'].map((step, i) => (
                    <div key={i} className={styles.stepperItem}>
                      <div className={`${styles.stepperDot} ${styles.stepperDone}`}><Check size={16} aria-hidden="true" /></div>
                      {i < 2 && <div className={`${styles.stepperLine} ${styles.stepperLineDone}`}/>}
                      <p className={styles.stepperLabel}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className={`${styles.togglesCard} card`}>
                <h3 className={styles.cardTitle}>Pengaturan Otomasi</h3>
                <div className={styles.toggleList}>
                  {[
                    {
                      label: 'Catat pesanan otomatis',
                      desc: 'Pesanan dari chat WhatsApp langsung dicatat tanpa perlu ketik ulang',
                      value: autoOrder,
                      setter: setAutoOrder,
                      id: 'toggle-order',
                    },
                    {
                      label: 'Balas pertanyaan umum otomatis (24 jam)',
                      desc: 'Pertanyaan soal jam buka, daftar produk, dan harga dijawab otomatis kapan saja',
                      value: autoReply,
                      setter: setAutoReply,
                      id: 'toggle-reply',
                    },
                    {
                      label: 'Baca bukti transfer otomatis',
                      desc: 'Foto bukti transfer pelanggan langsung diverifikasi dan dicatat sebagai pembayaran',
                      value: autoReceipt,
                      setter: setAutoReceipt,
                      id: 'toggle-receipt',
                    },
                  ].map((toggle) => (
                    <div key={toggle.id} className={styles.toggleItem}>
                      <div className={styles.toggleText}>
                        <p className={styles.toggleLabel}>{toggle.label}</p>
                        <p className={styles.toggleDesc}>{toggle.desc}</p>
                      </div>
                      <label className="toggle" id={toggle.id}>
                        <input
                          type="checkbox"
                          checked={toggle.value}
                          onChange={e => toggle.setter(e.target.checked)}
                        />
                        <span className="toggle-slider"/>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy panel */}
              <div className={`${styles.privacyCard} card`}>
                <div className={styles.privacyIcon}><LockKeyhole size={24} aria-hidden="true" /></div>
                <div className={styles.privacyText}>
                  <h3 className={styles.privacyTitle}>Privasi Terjaga</h3>
                  <p>Hanya pesan ke nomor bisnis ini yang diproses. WhatsApp pribadi Ibu tidak tersentuh.</p>
                </div>
                <button className="btn btn-danger btn-sm" id="delete-data-btn">
                  <Trash2 size={16} aria-hidden="true" /> Hapus data pelanggan
                </button>
              </div>

              {/* Stats */}
              <div className={styles.statsRow}>
                {[
                  { icon: Mail, num: '1.284', label: 'Pesan masuk bulan ini' },
                  { icon: Package, num: '312', label: 'Pesanan tercatat' },
                  { icon: Bot, num: '689', label: 'Dibalas otomatis' },
                ].map((stat, i) => (
                  <div key={i} className={`${styles.statCard} card`}>
                    <span className={styles.statIcon}><stat.icon size={24} aria-hidden="true" /></span>
                    <strong className={styles.statNum}>{stat.num}</strong>
                    <p className={styles.statLabel}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SCREEN B: Inbox ───────────────────────────────── */}
          {tab === 'inbox' && (
            <div className={styles.inboxLayout}>
              {/* Left: Conversation list */}
              <div className={`${styles.convList} card`}>
                <div className={styles.convHeader}>
                  <h3 className={styles.cardTitle}>Pesan Masuk</h3>
                  <span className={styles.convCount}>
                    {conversations.filter(c => c.unread > 0).length} belum dibaca
                  </span>
                </div>
                <div className={styles.convItems}>
                  {conversations.map(conv => (
                    <div
                      key={conv.id}
                      className={`${styles.convItem} ${conv.active ? styles.convItemActive : ''}`}
                    >
                      <div className={styles.convAvatar}>{conv.initials}</div>
                      <div className={styles.convContent}>
                        <div className={styles.convTop}>
                          <span className={styles.convName}>{conv.name}</span>
                          <span className={styles.convTime}>{conv.time}</span>
                        </div>
                        <p className={styles.convPreview}>{conv.preview}</p>
                        <span className={`badge ${
                          conv.type === 'Pesanan' ? 'badge-green'
                          : conv.type === 'Bukti Transfer' ? 'badge-blue'
                          : 'badge-gray'
                        }`} style={{marginTop:4}}>{conv.type}</span>
                      </div>
                      {conv.unread > 0 && (
                        <span className={styles.unreadBadge}>{conv.unread}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle: Chat thread */}
              <div className={`${styles.chatThread} card`}>
                <div className={styles.threadHeader}>
                  <div className={styles.convAvatar}>KD</div>
                  <div>
                    <p className={styles.threadName}>Kak Dewi</p>
                    <p className={styles.threadPhone}>+62 812 8765 4321</p>
                  </div>
                </div>
                <div className={styles.threadMessages}>
                  {chatMessages.map(msg => (
                    <div key={msg.id} className={`${styles.threadMsg} ${msg.from === 'customer' ? styles.threadMsgCustomer : styles.threadMsgAI}`}>
                      {msg.isPhoto ? (
                        <div className={styles.photoMsg}>
                          <div className={styles.photoThumb}>
                            <span><Camera size={20} aria-hidden="true" /></span>
                            <span>{msg.photoCaption}</span>
                          </div>
                          <p className={styles.msgTime}>{msg.time}</p>
                        </div>
                      ) : (
                        <div>
                          <p className={styles.msgText} style={{whiteSpace:'pre-line'}}>{msg.text}</p>
                          <div className={styles.msgMeta}>
                            {msg.isAI && <span className={styles.aiTag}><Bot size={14} aria-hidden="true" /> Dibalas AI</span>}
                            <span className={styles.msgTime}>{msg.time}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: AI summary panel */}
              <div className={`${styles.aiPanel} card`}>
                <div className={styles.aiPanelHeader}>
                  <h3 className={styles.cardTitle}><Bot size={18} aria-hidden="true" /> Ringkasan AI</h3>
                </div>
                <div className={styles.aiPanelContent}>
                  <div className={styles.orderDetected}>
                    <p className={styles.orderTitle}><Package size={16} aria-hidden="true" /> Pesanan Terdeteksi</p>
                    <div className={styles.orderItems}>
                      <div className={styles.orderItem}>
                        <span>Telur Ayam 2 kg</span>
                        <strong className="money">Rp56.000</strong>
                      </div>
                      <div className={styles.orderItem}>
                        <span>Gula Pasir 1 kg</span>
                        <strong className="money">Rp17.000</strong>
                      </div>
                      <div className={`${styles.orderItem} ${styles.orderTotal}`}>
                        <strong>Total</strong>
                        <strong className="money" style={{color:'var(--color-primary)'}}>Rp73.000</strong>
                      </div>
                    </div>
                  </div>

                  <div className={styles.paymentStatus}>
                    <span className={styles.paymentCheck}><Check size={16} aria-hidden="true" /></span>
                    <div>
                      <p className={styles.paymentTitle}>Transfer Rp73.000 cocok</p>
                      <p className={styles.paymentSub}>Verifikasi AI berhasil</p>
                    </div>
                    <span className="badge badge-green">Lunas</span>
                  </div>

                  <div className={styles.panelActions}>
                    {!orderConfirmed ? (
                      <>
                        <button
                          className="btn btn-primary"
                          style={{width:'100%'}}
                          onClick={() => setOrderConfirmed(true)}
                          id="confirm-order-btn"
                        >
                          <Check size={16} aria-hidden="true" /> Konfirmasi Pesanan
                        </button>
                        <button className="btn btn-outline" style={{width:'100%'}} id="mark-paid-btn">
                          Tandai Lunas
                        </button>
                      </>
                    ) : (
                      <div style={{textAlign:'center', padding:16}}>
                        <CheckCircle2 size={36} aria-hidden="true" />
                        <p style={{fontWeight:700, color:'var(--color-primary)', marginTop:8}}>
                          Pesanan dikonfirmasi!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
