'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { stokData as d } from '@/data/mockStokLaporan';
import styles from './stok.module.css';

function formatRp(n: number) {
  return 'Rp' + n.toLocaleString('id-ID');
}

type FilterType = 'Semua' | 'Menipis' | 'Habis';

export default function StokPage() {
  const [filter, setFilter] = useState<FilterType>('Semua');
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [approved, setApproved] = useState(false);

  const filtered = d.products.filter(p => {
    if (filter === 'Menipis') return p.status === 'menipis';
    if (filter === 'Habis') return p.status === 'habis';
    return true;
  });

  return (
    <div className={styles.layout}>
      <Sidebar active="stok"/>
      <div className={styles.main}>
        <TopBar />
        <div className={styles.content}>

          {/* Header */}
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Stok Barang</h1>
              <p className={styles.pageSub}>Terakhir diperbarui: 11 Okt 2026, 14:35</p>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.searchBox}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input placeholder="Cari barang..." className={styles.searchInput} id="stok-search"/>
              </div>
              <button className="btn btn-primary" id="add-barang-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Tambah Barang
              </button>
            </div>
          </div>

          {/* Summary cards */}
          <div className={styles.summaryRow}>
            <div className={`${styles.summaryCard} card`}>
              <span className={styles.summaryIcon}>📦</span>
              <strong className={styles.summaryNum}>{d.summary.totalBarang}</strong>
              <p className={styles.summaryLabel}>Total Barang</p>
            </div>
            <div className={`${styles.summaryCard} card`} style={{borderColor:'var(--color-accent)'}}>
              <span className={styles.summaryIcon}>⚠️</span>
              <strong className={styles.summaryNum} style={{color:'#B07B10'}}>{d.summary.stokMenipis}</strong>
              <p className={styles.summaryLabel}>Stok Menipis</p>
            </div>
            <div className={`${styles.summaryCard} card`} style={{borderColor:'var(--color-danger)'}}>
              <span className={styles.summaryIcon}>❌</span>
              <strong className={styles.summaryNum} style={{color:'var(--color-danger)'}}>{d.summary.habis}</strong>
              <p className={styles.summaryLabel}>Habis</p>
            </div>
            <div className={`${styles.summaryCard} card`}>
              <span className={styles.summaryIcon}>💰</span>
              <strong className={`${styles.summaryNum} money`} style={{fontSize:18}}>{formatRp(d.summary.nilaiStok)}</strong>
              <p className={styles.summaryLabel}>Nilai Stok</p>
            </div>
          </div>

          {/* Filter chips */}
          <div className={styles.filterRow}>
            {(['Semua', 'Menipis', 'Habis'] as FilterType[]).map(f => (
              <button
                key={f}
                className={`chip ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
                id={`filter-${f.toLowerCase()}`}
              >
                {f === 'Menipis' && '⚠️ '}{f === 'Habis' && '❌ '}{f}
              </button>
            ))}
            <span className={styles.filterCount}>{filtered.length} barang</span>
          </div>

          {/* Main content area */}
          <div className={`${styles.mainArea} ${drawerOpen ? styles.withDrawer : ''}`}>
            {/* Product table */}
            <div className="card" style={{overflow:'hidden', flex:1}}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th>Kategori</th>
                    <th>Stok</th>
                    <th>Min. Stok</th>
                    <th>Harga Jual</th>
                    <th>Perkiraan AI</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className={styles.productCell}>
                          <span className={styles.productEmoji}>{product.emoji}</span>
                          <span className={styles.productName}>{product.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-gray">{product.category}</span>
                      </td>
                      <td>
                        <div className={styles.stockCell}>
                          <div className={styles.stockBar}>
                            <div
                              className={styles.stockFill}
                              style={{
                                width: `${Math.min((product.stok / (product.min * 2)) * 100, 100)}%`,
                                background: product.status === 'habis' ? 'var(--color-danger)'
                                  : product.status === 'menipis' ? 'var(--color-accent)'
                                  : 'var(--color-primary)',
                              }}
                            />
                          </div>
                          <span className={`${styles.stockNum} ${product.status === 'habis' ? styles.stockHabis : product.status === 'menipis' ? styles.stockMenipis : ''}`}>
                            {product.stok} {product.stok === 0 ? '— Habis' : ''}
                          </span>
                        </div>
                      </td>
                      <td className={styles.tdMuted}>{product.min}</td>
                      <td className={`${styles.tdMoney} money`}>{formatRp(product.harga)}</td>
                      <td>
                        {product.forecastDays === 0 ? (
                          <span className="badge badge-red">Habis</span>
                        ) : product.forecastDays <= 3 ? (
                          <span className="badge badge-amber">
                            Habis dalam {product.forecastDays} hari
                          </span>
                        ) : (
                          <span className="badge badge-green">
                            {product.forecastDays} hari lagi
                          </span>
                        )}
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-sm">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Supplier Drawer */}
            {drawerOpen && (
              <div className={`${styles.drawer} card`}>
                <div className={styles.drawerHeader}>
                  <div>
                    <h3 className={styles.drawerTitle}>📋 Draft Pesanan Supplier</h3>
                    <div className={styles.aiTag}>🤖 Dibuat oleh AI</div>
                  </div>
                  <button className={styles.drawerClose} onClick={() => setDrawerOpen(false)}>✕</button>
                </div>

                <div className={styles.supplierInfo}>
                  <p className={styles.supplierName}>🏪 {d.supplierDraft.supplier}</p>
                  <p className={styles.supplierPhone}>{d.supplierDraft.phone}</p>
                </div>

                <div className={styles.draftItems}>
                  {d.supplierDraft.items.map((item, i) => (
                    <div key={i} className={styles.draftItem}>
                      <div>
                        <p className={styles.draftItemName}>{item.name}</p>
                        <p className={styles.draftItemQty}>{item.qty} {item.unit} × {formatRp(item.harga)}</p>
                      </div>
                      <strong className="money" style={{color:'var(--color-primary)'}}>{formatRp(item.total)}</strong>
                    </div>
                  ))}
                  <div className={styles.draftTotal}>
                    <strong>Total Pesanan</strong>
                    <strong className="money" style={{color:'var(--color-primary-dark)', fontSize:18}}>{formatRp(d.supplierDraft.total)}</strong>
                  </div>
                </div>

                <p className={styles.draftNote}>
                  📊 {d.supplierDraft.note}
                </p>

                <div className={styles.drawerActions}>
                  {!approved ? (
                    <>
                      <button
                        className="btn btn-primary"
                        style={{width:'100%'}}
                        onClick={() => setApproved(true)}
                        id="approve-supplier-btn"
                      >
                        📱 Setujui dan Kirim via WhatsApp
                      </button>
                      <button className="btn btn-ghost" style={{width:'100%'}}>
                        ✏️ Ubah Jumlah
                      </button>
                    </>
                  ) : (
                    <div style={{textAlign:'center', padding:'16px 0'}}>
                      <span style={{fontSize:40}}>✅</span>
                      <p style={{fontWeight:700, color:'var(--color-primary)', marginTop:8}}>
                        Pesanan terkirim!
                      </p>
                      <p style={{fontSize:12, color:'var(--color-text-secondary)'}}>
                        Draft dikirim ke {d.supplierDraft.supplier} via WhatsApp
                      </p>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div className={styles.timeline}>
                  <div className={`${styles.timelineItem} ${styles.timelineDone}`}>
                    <div className={styles.timelineDot}/>
                    <span>Draft dibuat</span>
                    <span className={styles.timelineTime}>14:30</span>
                  </div>
                  <div className={`${styles.timelineItem} ${approved ? styles.timelineDone : styles.timelineActive}`}>
                    <div className={styles.timelineDot}/>
                    <span>Menunggu persetujuan</span>
                    <span className={styles.timelineTime}>{approved ? 'Selesai' : 'Sekarang'}</span>
                  </div>
                  <div className={`${styles.timelineItem} ${approved ? styles.timelineDone : ''}`}>
                    <div className={styles.timelineDot}/>
                    <span>Terkirim ke supplier</span>
                    <span className={styles.timelineTime}>—</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
