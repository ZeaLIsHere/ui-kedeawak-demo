'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bot, Camera, CheckCircle2, Mic, Package, PenLine, ShoppingCart, Smartphone, TrendingUp, Wallet } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { dashboardData as d } from '@/data/mockDashboard';
import styles from './dashboard.module.css';

function formatRp(n: number) {
  return 'Rp' + n.toLocaleString('id-ID');
}

// ─── KPI Cards ────────────────────────────────────────────────────────────────
function KPICards() {
  const cards = [
    {
      label: 'Penjualan Hari Ini',
      value: d.kpi.penjualanHariIni,
      change: d.kpi.penjualanChange,
      icon: <Wallet size={24} aria-hidden="true" />,
      positive: true,
    },
    {
      label: 'Pengeluaran',
      value: d.kpi.pengeluaran,
      change: d.kpi.pengeluaranChange,
      icon: <ShoppingCart size={24} aria-hidden="true" />,
      positive: false,
    },
    {
      label: 'Laba Bersih',
      value: d.kpi.labaBersih,
      change: d.kpi.labaChange,
      icon: <TrendingUp size={24} aria-hidden="true" />,
      positive: true,
    },
    {
      label: 'Pesanan Baru',
      value: d.kpi.pesananBaru,
      change: null,
      icon: <Package size={24} aria-hidden="true" />,
      positive: true,
      sub: `${d.kpi.pesananWhatsApp} dari WhatsApp`,
    },
  ];

  return (
    <div className={styles.kpiRow}>
      {cards.map((card, i) => (
        <div key={i} className={`${styles.kpiCard} card`}>
          <div className={styles.kpiTop}>
            <span className={styles.kpiIcon}>{card.icon}</span>
            {card.change !== null && (
              <span className={`badge ${card.change >= 0 ? 'badge-green' : 'badge-red'}`}>
                {card.change >= 0 ? '↑' : '↓'} {Math.abs(card.change)}%
              </span>
            )}
          </div>
          <div className={styles.kpiValue}>
            {i === 3 ? (
              <span className={styles.kpiNumber}>{card.value}</span>
            ) : (
              <span className={`${styles.kpiNumber} money`}>{formatRp(card.value as number)}</span>
            )}
          </div>
          <p className={styles.kpiLabel}>{card.label}</p>
          {card.sub && (
            <p className={styles.kpiSub}>
              <span className="wa-badge">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </span>
              {card.sub}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Sales Chart ───────────────────────────────────────────────────────────────
function SalesChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.chartTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          <p style={{ color: 'var(--color-primary)' }}>
            Penjualan: <strong>{formatRp(payload[0]?.value)}</strong>
          </p>
          <p style={{ color: 'var(--color-danger)' }}>
            Pengeluaran: <strong>{formatRp(payload[1]?.value)}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${styles.salesChartCard} card`}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Penjualan 7 Hari Terakhir</h3>
          <p className={styles.cardSub}>5 Okt sampai 11 Okt 2026</p>
        </div>
        <div className={styles.chartLegend}>
          <span className={styles.legendItem}>
            <span style={{ background: 'var(--color-primary)' }} className={styles.legendDot}/>
            Penjualan
          </span>
          <span className={styles.legendItem}>
            <span style={{ background: 'var(--color-danger)' }} className={styles.legendDot}/>
            Pengeluaran
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={d.salesChart} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#128C5A" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#128C5A" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D64545" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#D64545" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false}/>
          <XAxis dataKey="hari" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false}/>
          <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `${(v/1000000).toFixed(1)}jt`}/>
          <Tooltip content={<CustomTooltip/>}/>
          <Area type="monotone" dataKey="penjualan" stroke="#128C5A" strokeWidth={2.5} fill="url(#salesGrad)" dot={false} activeDot={{ r: 5, fill: '#128C5A' }}/>
          <Area type="monotone" dataKey="pengeluaran" stroke="#D64545" strokeWidth={2} fill="url(#expGrad)" dot={false} activeDot={{ r: 4, fill: '#D64545' }}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── WhatsApp Feed ─────────────────────────────────────────────────────────────
function WhatsAppFeed() {
  const typeColors: Record<string, string> = {
    green: 'badge-green',
    blue: 'badge-blue',
    gray: 'badge-gray',
  };

  return (
    <div className={`${styles.wafeedCard} card`}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Masuk dari WhatsApp</h3>
          <p className={styles.cardSub}>Live feed hari ini</p>
        </div>
        <Link href="/whatsapp" className="btn btn-outline btn-sm">Buka Kotak Masuk</Link>
      </div>
      <div className={styles.wafeedList}>
        {d.whatsappFeed.map((item) => (
          <div key={item.id} className={styles.wafeedItem}>
            <div className={styles.wafeedAvatar}>
              {item.name.split(' ').map(w => w[0]).join('').slice(0,2)}
            </div>
            <div className={styles.wafeedContent}>
              <div className={styles.wafeedTop}>
                <span className={styles.wafeedName}>{item.name}</span>
                <span className={styles.wafeedTime}>{item.time}</span>
              </div>
              <p className={styles.wafeedMsg}>{item.message}</p>
            </div>
            <div className="wa-badge" style={{flexShrink:0}}>
              <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <span className={`badge ${typeColors[item.typeColor] || 'badge-gray'}`} style={{flexShrink:0}}>
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Stock Alert ───────────────────────────────────────────────────────────────
function StockAlert() {
  return (
    <div className={`${styles.alertCard}`} style={{background:'#FFFBF0', border:'1px solid #F5A524', borderRadius:'var(--radius-card)'}}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle} style={{color:'#B07B10'}}>Stok Menipis</h3>
          <p className={styles.cardSub}>3 produk perlu segera diisi</p>
        </div>
        <button className="btn btn-sm" style={{background:'var(--color-accent)', color:'#fff', border:'none', minHeight:36}}>
          Buat Draft Pesanan
        </button>
      </div>
      <div className={styles.alertList}>
        {d.stockAlerts.map((item, i) => (
          <div key={i} className={styles.alertItem}>
            <span className={styles.alertName}>{item.name}</span>
            <div className={styles.alertBar}>
              <div
                className={styles.alertFill}
                style={{ width: `${(item.sisa / item.min) * 100}%` }}
              />
            </div>
            <span className={styles.alertCount} style={{ color: 'var(--color-danger)' }}>
              Sisa {item.sisa} {item.satuan}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AI Suggestion ─────────────────────────────────────────────────────────────
function AISuggestion() {
  const [approved, setApproved] = useState(false);

  if (approved) {
    return (
      <div className={`${styles.aiCard} card`} style={{textAlign:'center', padding:24}}>
        <CheckCircle2 size={40} aria-hidden="true" style={{color:'var(--color-primary)'}} />
        <p style={{fontWeight:700, color:'var(--color-primary)', marginTop:8}}>Pesanan disetujui!</p>
        <p style={{fontSize:13, color:'var(--color-text-secondary)'}}>Draft pesanan dikirim ke Toko Grosir Sinar via WhatsApp</p>
      </div>
    );
  }

  return (
    <div className={`${styles.aiCard} card`}>
      <div className={styles.aiCardHeader}>
        <span className={styles.aiChip}><Bot size={16} aria-hidden="true" /> Saran AI</span>
      </div>
      <p className={styles.aiText}>
        AI menyiapkan draft pesanan ke{' '}
        <strong>{d.aiSuggestion.supplier}</strong>:
      </p>
      <div className={styles.aiItems}>
        {d.aiSuggestion.items.map((item, i) => (
          <div key={i} className={styles.aiItem}>
            <span>{item.name}</span>
            <span>{item.qty}</span>
            <strong className="money" style={{color:'var(--color-primary)'}}>
              {formatRp(item.total)}
            </strong>
          </div>
        ))}
        <div className={`${styles.aiItem} ${styles.aiTotal}`}>
          <span><strong>Total</strong></span>
          <span></span>
          <strong className="money" style={{color:'var(--color-primary-dark)', fontSize:16}}>
            {formatRp(d.aiSuggestion.total)}
          </strong>
        </div>
      </div>
      <div className={styles.aiActions}>
        <button className="btn btn-primary" onClick={() => setApproved(true)} id="ai-approve-btn">
          Setujui
        </button>
        <button className="btn btn-ghost">Ubah</button>
      </div>
    </div>
  );
}

// ─── Transaction Table ─────────────────────────────────────────────────────────
function TransactionTable() {
  const sourceColors: Record<string, string> = {
    'WhatsApp': '#25D366',
    'Suara': 'var(--color-info)',
    'Foto Struk': 'var(--color-accent)',
    'Manual': 'var(--color-text-muted)',
  };
  const sourceIcons: Record<string, React.ReactNode> = {
    'WhatsApp': <Smartphone size={14} aria-hidden="true" />,
    'Suara': <Mic size={14} aria-hidden="true" />,
    'Foto Struk': <Camera size={14} aria-hidden="true" />,
    'Manual': <PenLine size={14} aria-hidden="true" />,
  };

  return (
    <div className={`${styles.transactionCard} card`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Transaksi Terbaru</h3>
        <button className="btn btn-ghost btn-sm">Lihat Semua</button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Deskripsi</th>
              <th>Sumber</th>
              <th>Jumlah</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {d.transactions.map((tx) => (
              <tr key={tx.id}>
                <td className={styles.tdTime}>{tx.time}</td>
                <td className={styles.tdDesc}>{tx.description}</td>
                <td>
                  <span className={styles.sourceChip}>
                    <span>{sourceIcons[tx.source]}</span>
                    {tx.source}
                  </span>
                </td>
                <td className={`${styles.tdAmount} money`} style={{color:'var(--color-primary)'}}>
                  +{formatRp(tx.amount)}
                </td>
                <td>
                  <span className={`badge ${tx.status === 'Selesai' ? 'badge-green' : 'badge-amber'}`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Debt Card ─────────────────────────────────────────────────────────────────
function DebtCard() {
  const u = d.utangPelanggan;
  return (
    <div className={`${styles.debtCard} card`}>
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.cardTitle}>Utang Pelanggan</h3>
          <p className={`money ${styles.debtTotal}`} style={{color:'var(--color-danger)'}}>
            {formatRp(u.total)}
          </p>
        </div>
        <button className="btn btn-outline btn-sm">Kirim Tagihan</button>
      </div>
      <div className={styles.debtList}>
        {u.pelanggan.map((p, i) => (
          <div key={i} className={styles.debtItem}>
            <div className={styles.debtAvatar}>{p.name.split(' ').map(w => w[0]).join('').slice(0,2)}</div>
            <div className={styles.debtInfo}>
              <p className={styles.debtName}>{p.name}</p>
              <p className={styles.debtDays}>{p.days} hari lalu</p>
            </div>
            <span className={`money ${styles.debtAmount}`}>{formatRp(p.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className={styles.layout}>
      <Sidebar active="beranda"/>
      <div className={styles.main}>
        <TopBar />
        <div className={styles.content}>
          <KPICards />
          <div className={styles.gridRow}>
            <SalesChart />
            <WhatsAppFeed />
          </div>
          <div className={styles.gridRow3}>
            <StockAlert />
            <AISuggestion />
            <DebtCard />
          </div>
          <TransactionTable />
        </div>
      </div>
    </div>
  );
}
