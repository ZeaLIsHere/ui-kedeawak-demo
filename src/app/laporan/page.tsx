'use client';

import { useState } from 'react';
import { CalendarDays, ChartColumn, ChartNoAxesCombined, FileText, HeartPulse, Package, ShoppingCart, Smartphone, Trophy, Wallet } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
} from 'recharts';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { laporanData as d } from '@/data/mockStokLaporan';
import styles from './laporan.module.css';

function formatRp(n: number) {
  return 'Rp' + n.toLocaleString('id-ID');
}

type Period = 'Harian' | 'Mingguan' | 'Bulanan';

export default function LaporanPage() {
  const [period, setPeriod] = useState<Period>('Mingguan');

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label}</p>
        <p style={{ color: 'var(--color-primary)' }}>Pendapatan: <strong>{formatRp(payload[0]?.value)}</strong></p>
        <p style={{ color: 'var(--color-danger)' }}>Pengeluaran: <strong>{formatRp(payload[1]?.value)}</strong></p>
      </div>
    );
  };

  return (
    <div className={styles.layout}>
      <Sidebar active="laporan"/>
      <div className={styles.main}>
        <TopBar />
        <div className={styles.content}>

          {/* Period selector */}
          <div className={styles.periodRow}>
            <div className={styles.periodLeft}>
              <h1 className={styles.pageTitle}>Laporan Keuangan</h1>
              <div className={styles.segmented}>
                {(['Harian', 'Mingguan', 'Bulanan'] as Period[]).map(p => (
                  <button
                    key={p}
                    className={`${styles.segBtn} ${period === p ? styles.segActive : ''}`}
                    onClick={() => setPeriod(p)}
                    id={`period-${p.toLowerCase()}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <span className={styles.dateRange}><CalendarDays size={16} aria-hidden="true" /> {d.period.range}</span>
            </div>
            <button className="btn btn-outline" id="download-pdf-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Unduh PDF
            </button>
          </div>

          {/* Summary KPI */}
          <div className={styles.summaryRow}>
            {[
              { label: 'Pendapatan', value: d.summary.pendapatan, change: d.summary.pendapatanChange, color: 'var(--color-primary)', icon: Wallet },
              { label: 'Pengeluaran', value: d.summary.pengeluaran, change: d.summary.pengeluaranChange, color: 'var(--color-danger)', icon: ShoppingCart },
              { label: 'Laba', value: d.summary.laba, change: d.summary.labaChange, color: 'var(--color-primary-dark)', icon: ChartNoAxesCombined },
              { label: 'Margin', value: null, margin: d.summary.margin, change: d.summary.marginChange, color: 'var(--color-info)', icon: ChartColumn },
            ].map((card, i) => (
              <div key={i} className={`${styles.kpiCard} card`}>
                <div className={styles.kpiTop}>
                  <span><card.icon size={20} aria-hidden="true" /></span>
                  <span className={`badge ${card.change >= 0 ? 'badge-green' : 'badge-red'}`}>
                    {card.change >= 0 ? '↑' : '↓'} {Math.abs(card.change)}%
                  </span>
                </div>
                <p className={`${styles.kpiValue} money`} style={{ color: card.color }}>
                  {card.value !== null ? formatRp(card.value) : `${card.margin}%`}
                </p>
                <p className={styles.kpiLabel}>{card.label}</p>
                <p className={styles.kpiVs}>vs periode lalu</p>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className={styles.chartsRow}>
            {/* Bar chart */}
            <div className={`${styles.chartCard} card`}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Pendapatan vs Pengeluaran</h3>
                <p className={styles.chartSub}>{period}: {d.period.range}</p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={d.dailyChart} margin={{ top: 8, right: 8, left: 8, bottom: 0 }} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false}/>
                  <XAxis dataKey="hari" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false}
                    tickFormatter={v => `${(v/1000000).toFixed(1)}jt`}/>
                  <Tooltip content={<CustomBarTooltip/>}/>
                  <Bar dataKey="pendapatan" fill="#128C5A" radius={[4, 4, 0, 0]} maxBarSize={28}/>
                  <Bar dataKey="pengeluaran" fill="#D64545" radius={[4, 4, 0, 0]} maxBarSize={28}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Donut chart */}
            <div className={`${styles.donutCard} card`}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Kategori Pengeluaran</h3>
                <p className={styles.chartSub}>Total: {formatRp(d.summary.pengeluaran)}</p>
              </div>
              <div className={styles.donutWrap}>
                <PieChart width={160} height={160}>
                  <Pie data={d.expenseCategories} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3}>
                    {d.expenseCategories.map((entry, i) => (
                      <Cell key={i} fill={entry.color}/>
                    ))}
                  </Pie>
                </PieChart>
                <div className={styles.donutLegend}>
                  {d.expenseCategories.map((cat, i) => (
                    <div key={i} className={styles.legendRow}>
                      <span className={styles.legendDot} style={{ background: cat.color }}/>
                      <span className={styles.legendName}>{cat.name}</span>
                      <span className={styles.legendPct}>{cat.value}%</span>
                      <span className={`money ${styles.legendAmt}`}>{formatRp(cat.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className={styles.bottomRow}>
            {/* Top products */}
            <div className={`${styles.topProductsCard} card`}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}><Trophy size={18} aria-hidden="true" /> Produk Terlaris</h3>
              </div>
              <div className={styles.productList}>
                {d.topProducts.map((p, i) => (
                  <div key={i} className={styles.productRow}>
                    <span className={styles.productRank}>{i + 1}</span>
                    <span className={styles.productIcon}><Package size={20} aria-hidden="true" /></span>
                    <div className={styles.productInfo}>
                      <p className={styles.productName}>{p.name}</p>
                      <p className={styles.productQty}>{p.qty} terjual</p>
                    </div>
                    <strong className="money" style={{ color: 'var(--color-primary)' }}>
                      {formatRp(p.revenue)}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Source breakdown */}
            <div className={`${styles.sourceCard} card`}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}><Smartphone size={18} aria-hidden="true" /> Sumber Pencatatan</h3>
              </div>
              <div className={styles.sourceList}>
                {d.sumberPencatatan.map((s, i) => (
                  <div key={i} className={styles.sourceRow}>
                    <span className={styles.sourceName}>{s.source}</span>
                    <div className={styles.sourceBar}>
                      <div
                        className={styles.sourceFill}
                        style={{ width: `${s.pct}%`, background: s.color }}
                      />
                    </div>
                    <span className={styles.sourcePct}>{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Health card */}
            <div className={`${styles.healthCard} card`}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}><HeartPulse size={18} aria-hidden="true" /> Kesehatan Keuangan</h3>
              </div>
              <div className={styles.scoreWrap}>
                <div className={styles.scoreCircle}>
                  <span className={styles.scoreNum}>{d.kesehatanKeuangan.score}</span>
                  <span className={styles.scoreMax}>/100</span>
                </div>
                <p className={styles.scoreLabel}>Sangat Sehat</p>
              </div>
              <div className={styles.insights}>
                {d.kesehatanKeuangan.insights.map((insight, i) => (
                  <div key={i} className={styles.insightItem}>
                    <span className={styles.insightBullet}>•</span>
                    <p className={styles.insightText}>{insight}</p>
                  </div>
                ))}
              </div>
              <div className={styles.kurBanner}>
                <p className={styles.kurText}><FileText size={16} aria-hidden="true" /> Laporan ini bisa dipakai untuk pengajuan KUR</p>
                <button className="btn btn-primary btn-sm" id="share-bank-btn">
                  Bagikan ke Bank/Koperasi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
