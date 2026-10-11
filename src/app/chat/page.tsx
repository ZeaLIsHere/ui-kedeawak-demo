'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Archive, BarChart3, Camera, House, MessageCircle, Package, Play } from 'lucide-react';
import styles from './chat.module.css';

function formatRp(n: number) {
  return 'Rp' + n.toLocaleString('id-ID');
}

// ─── Message types ────────────────────────────────────────────────────────────
type Message =
  | { id: number; type: 'owner-voice'; duration: string; transcript: string }
  | { id: number; type: 'ai-receipt'; items: { name: string; qty: number; price: number }[]; total: number }
  | { id: number; type: 'owner-photo'; caption: string }
  | { id: number; type: 'ai-ocr'; total: number }
  | { id: number; type: 'owner-text'; text: string }
  | { id: number; type: 'ai-summary'; sales: number; expense: number; profit: number }
  | { id: number; type: 'ai-stock-alert'; product: string; qty: number; supplier: string; qtyOrder: number };

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'owner-voice',
    duration: '0:12',
    transcript: 'Tadi laku 3 Indomie goreng sama 2 teh botol, dua puluh dua ribu',
  },
  {
    id: 2,
    type: 'ai-receipt',
    items: [
      { name: 'Indomie Goreng', qty: 3, price: 3500 },
      { name: 'Teh Botol Sosro', qty: 2, price: 5500 },
    ],
    total: 22000,
  },
  {
    id: 3,
    type: 'owner-photo',
    caption: 'struk_belanja.jpg',
  },
  {
    id: 4,
    type: 'ai-ocr',
    total: 150000,
  },
  {
    id: 5,
    type: 'owner-text',
    text: 'Laporan hari ini',
  },
  {
    id: 6,
    type: 'ai-summary',
    sales: 1842000,
    expense: 615000,
    profit: 1227000,
  },
  {
    id: 7,
    type: 'ai-stock-alert',
    product: 'Gula',
    qty: 4,
    supplier: 'Toko Sinar',
    qtyOrder: 20,
  },
];

// ─── Waveform ─────────────────────────────────────────────────────────────────
// Fixed heights to prevent hydration mismatch (no Math.random on server)
const WAVE_HEIGHTS = [8, 16, 12, 20, 10, 18, 14, 8, 16, 12, 6, 18, 14, 10, 20, 8, 16, 12];

function Waveform() {
  return (
    <div className={styles.waveform}>
      {WAVE_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className={styles.waveBar}
          style={{
            height: `${h}px`,
            animationDelay: `${i * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Message Bubbles ──────────────────────────────────────────────────────────
function MessageBubble({ msg }: { msg: Message }) {
  const [ocrConfirmed, setOcrConfirmed] = useState<boolean | null>(null);
  const [stockSent, setStockSent] = useState<boolean | null>(null);
  const [receiptCancelled, setReceiptCancelled] = useState(false);

  switch (msg.type) {
    case 'owner-voice':
      return (
        <div className={styles.msgRow}>
          <div className={styles.bubbleOwner}>
            <div className={styles.voiceNote}>
              <div className={styles.voicePlayBtn}><Play size={14} aria-hidden="true" /></div>
              <Waveform />
              <span className={styles.voiceDuration}>{msg.duration}</span>
            </div>
            <p className={styles.voiceTranscript}>{msg.transcript}</p>
          </div>
        </div>
      );

    case 'ai-receipt':
      return (
        <div className={styles.msgRowAI}>
          <div className={styles.aiAvatar}>AI</div>
          <div className={styles.bubbleAI}>
            {!receiptCancelled ? (
              <>
                <p className={styles.aiGreeting}>Sudah saya catat</p>
                <div className={styles.receiptCard}>
                  {msg.items.map((item, i) => (
                    <div key={i} className={styles.receiptRow}>
                      <span>{item.name} x{item.qty}</span>
                      <span className="money">{formatRp(item.qty * item.price)}</span>
                    </div>
                  ))}
                  <div className={`${styles.receiptRow} ${styles.receiptTotal}`}>
                    <strong>Total</strong>
                    <strong className="money" style={{ color: 'var(--color-primary)' }}>
                      {formatRp(msg.total)}
                    </strong>
                  </div>
                </div>
                <button
                  className={styles.cancelLink}
                  onClick={() => setReceiptCancelled(true)}
                >
                  Batalkan catatan ini
                </button>
              </>
            ) : (
              <p style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>
                Catatan dibatalkan.
              </p>
            )}
          </div>
        </div>
      );

    case 'owner-photo':
      return (
        <div className={styles.msgRow}>
          <div className={styles.bubbleOwner}>
            <div className={styles.photoThumb}>
              <div className={styles.photoPlaceholder}>
                <span><Camera size={32} aria-hidden="true" /></span>
                <span>{msg.caption}</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'ai-ocr':
      return (
        <div className={styles.msgRowAI}>
          <div className={styles.aiAvatar}>AI</div>
          <div className={styles.bubbleAI}>
            <p className={styles.aiGreeting}>
              Saya baca total{' '}
              <strong className="money">{formatRp(msg.total)}</strong>, benar?
            </p>
            {ocrConfirmed === null ? (
              <div className={styles.ocrActions}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setOcrConfirmed(true)}
                  id="ocr-benar-btn"
                >
                  Benar
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setOcrConfirmed(false)}
                  id="ocr-ubah-btn"
                >
                  Ubah
                </button>
              </div>
            ) : ocrConfirmed ? (
              <p className={styles.ocrDone}>Dicatat sebagai pengeluaran {formatRp(msg.total)}</p>
            ) : (
              <p className={styles.ocrDone}>Silakan ketik jumlah yang benar</p>
            )}
          </div>
        </div>
      );

    case 'owner-text':
      return (
        <div className={styles.msgRow}>
          <div className={styles.bubbleOwner}>
            <p>{msg.text}</p>
          </div>
        </div>
      );

    case 'ai-summary':
      return (
        <div className={styles.msgRowAI}>
          <div className={styles.aiAvatar}>AI</div>
          <div className={styles.bubbleAI}>
            <div className={styles.summaryCard}>
              <p className={styles.summaryTitle}>Ringkasan Hari Ini: Minggu, 11 Okt</p>
              <div className={styles.summaryRow}>
                <span>Penjualan</span>
                <strong className="money" style={{ color: 'var(--color-primary)' }}>
                  {formatRp(msg.sales)}
                </strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Pengeluaran</span>
                <strong className="money" style={{ color: 'var(--color-danger)' }}>
                  {formatRp(msg.expense)}
                </strong>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotalRow}`}>
                <strong>Laba Bersih</strong>
                <strong className="money" style={{ color: 'var(--color-primary)', fontSize: 17 }}>
                  {formatRp(msg.profit)}
                </strong>
              </div>
              <div className={styles.summaryBar}>
                <div
                  className={styles.summaryBarFill}
                  style={{ width: `${(msg.profit / msg.sales) * 100}%` }}
                />
              </div>
              <p className={styles.summaryMargin}>
                Margin laba: <strong>{((msg.profit / msg.sales) * 100).toFixed(1)}%</strong>
              </p>
              <Link href="/laporan" className="btn btn-outline btn-sm" style={{ marginTop: 12, width: '100%' }}>
                Lihat laporan lengkap
              </Link>
            </div>
          </div>
        </div>
      );

    case 'ai-stock-alert':
      return (
        <div className={styles.msgRowAI}>
          <div className={styles.aiAvatar}>AI</div>
          <div className={styles.bubbleAI}>
            <p className={styles.aiGreeting}>
              {msg.product} tinggal {msg.qty} kg. Kirim pesanan {msg.qtyOrder} kg {msg.product} ke {msg.supplier}?
            </p>
            {stockSent === null ? (
              <div className={styles.ocrActions}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setStockSent(true)}
                  id="stock-kirim-btn"
                >
                  Kirim
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setStockSent(false)}
                  id="stock-nanti-btn"
                >
                  Nanti
                </button>
              </div>
            ) : stockSent ? (
              <p className={styles.ocrDone}>Pesanan dikirim ke {msg.supplier} via WhatsApp!</p>
            ) : (
              <p className={styles.ocrDone}>Oke, saya ingatkan lagi nanti.</p>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}

// ─── Quick Chips ──────────────────────────────────────────────────────────────
const quickChips = [
  'Laporan hari ini',
  'Cek stok',
  'Catat pengeluaran',
  'Utang pelanggan',
];

// ─── Main Chat Page ────────────────────────────────────────────────────────────
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newId = messages.length + 1;
    setMessages(prev => [...prev, { id: newId, type: 'owner-text', text }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: newId + 1,
          type: 'ai-summary',
          sales: 1842000,
          expense: 615000,
          profit: 1227000,
        },
      ]);
    }, 900);
  };

  return (
    <div className={styles.mobileWrap}>
      <div className={styles.phoneFrame}>
        {/* Header */}
        <div className={styles.chatHeader}>
          <Link href="/dashboard" className={styles.backBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
          </Link>
          <div className={styles.headerAvatar}>AI</div>
          <div className={styles.headerInfo}>
            <p className={styles.headerName}>Asisten KedeAwak</p>
            <p className={styles.headerStatus}>
              <span className={styles.statusDot}/>
              Aktif 24 jam
            </p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.headerBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages} id="chat-messages">
          <div className={styles.dateLabel}>Minggu, 11 Okt 2026</div>
          {messages.map(msg => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          <div ref={endRef}/>
        </div>

        {/* Quick chips */}
        <div className={styles.quickChips}>
          {quickChips.map((chip) => (
            <button
              key={chip}
              className={styles.quickChip}
              onClick={() => sendMessage(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Composer */}
        <div className={styles.composer}>
          <button className={styles.composerBtn} id="camera-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </button>
          <input
            className={styles.composerInput}
            placeholder="Ketik atau tekan mik untuk bicara..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            id="chat-input"
          />
          {input ? (
            <button
              className={styles.sendBtn}
              onClick={() => sendMessage(input)}
              id="send-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          ) : (
            <button
              className={`${styles.micBtn} ${isRecording ? styles.micActive : ''}`}
              onMouseDown={() => setIsRecording(true)}
              onMouseUp={() => setIsRecording(false)}
              id="mic-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </button>
          )}
        </div>

        {/* Tab Bar */}
        <div className={styles.tabBar}>
          {[
            { id: 'beranda', label: 'Beranda', icon: House, href: '/dashboard' },
            { id: 'chat', label: 'Chat AI', icon: MessageCircle, href: '/chat', active: true },
            { id: 'pesanan', label: 'Pesanan', icon: Package, href: '/pesanan' },
            { id: 'stok', label: 'Stok', icon: Archive, href: '/stok' },
            { id: 'laporan', label: 'Laporan', icon: BarChart3, href: '/laporan' },
          ].map(tab => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`${styles.tabItem} ${tab.active ? styles.tabItemActive : ''}`}
            >
              <span className={styles.tabIcon}><tab.icon size={20} aria-hidden="true" /></span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
