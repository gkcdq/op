import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import { fetchBriefs } from './api/datagouv/briefs'
import CompanyLogo from './components/CompanyLogo.tsx'

const MARKETS = [
  { s: 'CAC 40', last: 8124.35, chg: 41.2, pct: 0.51 },
  { s: 'DAX', last: 19852.10, chg: -63.4, pct: -0.32 },
  { s: 'FTSE 100', last: 8301.77, chg: 12.9, pct: 0.16 },
  { s: 'S&P 500', last: 5921.4, chg: 28.6, pct: 0.49 },
  { s: 'EUR/USD', last: 1.0842, chg: -0.0021, pct: -0.19 },
  { s: 'BRENT', last: 74.12, chg: 0.88, pct: 1.2 },
  { s: 'OR', last: 2648.3, chg: -9.5, pct: -0.36 },
  { s: 'BTC/USD', last: 68240, chg: 1120, pct: 1.67 },
]

const fmt = (n) => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
}

function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="hdr-clock">{now.toLocaleTimeString('fr-FR')}</span>
}

function SkeletonLoader() {
  return (
    <div className="grid">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-line skeleton-short"></div>
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-text"></div>
          <div className="skeleton-line skeleton-text"></div>
          <div className="skeleton-line skeleton-text short"></div>
          <div className="skeleton-tags">
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [briefs, setBriefs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBrief, setSelectedBrief] = useState(null)
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    let timeoutId;
    
    const loadBriefs = async () => {
      try {
        const data = await fetchBriefs(search) 
        setBriefs(data)
        setError(null)
      } catch (err) {
        console.error("Erreur:", err)
        setError("Impossible de contacter le serveur. Nouvelle tentative...")
        timeoutId = setTimeout(loadBriefs, 5000);
      } finally {
        setTimeout(() => setLoading(false), 500)
      }
    }
    
    if (briefs.length === 0) setLoading(true)
    
    loadBriefs()
    const interval = setInterval(loadBriefs, 60000)
    
    return () => {
      clearInterval(interval)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [search])

  const ticks = [...MARKETS, ...MARKETS]

  return (
    <>
      <AnimatePresence>
        {!isStarted && (
          <motion.div 
            className="splash"
            onClick={() => setIsStarted(true)}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} 
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Bergdot
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              [ Cliquez pour accéder au terminal ]
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="hdr">
        <div className="hdr-logo">BERGDOT TERMINAL</div>
        <Clock />
      </header>

      <div className="ticker">
        <div className="ticker-track">
          {ticks.map((m, i) => (
            <span className="tick" key={i}>
              <b>{m.s}</b>{fmt(m.last)}{' '}
              <span className={m.pct >= 0 ? 'up' : 'down'}>
                {m.pct >= 0 ? '▲' : '▼'} {Math.abs(m.pct).toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>

      <main className="main">
        <AnimatePresence>
          {!selectedBrief && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}
            >
              <input 
                type="text" 
                className="search-input"
                placeholder="Rechercher une société ou un titre..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div style={{
            background: 'rgba(255, 107, 107, 0.1)',
            border: '1px solid var(--down)',
            color: 'var(--down)',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <SkeletonLoader />
        ) : (
          <AnimatePresence mode="wait">
            {selectedBrief ? (
              <motion.div 
                key="detail"
                className="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="detail-header">
                  <div className="detail-id"> {/* Utilisation de ta classe CSS */}
                    <CompanyLogo societe={selectedBrief.briefJson.societe} size={48} />
                    <div>
                      <span className="detail-societe">{selectedBrief.briefJson.societe || 'N/A'}</span>
                      <h2 className="detail-title">{selectedBrief.briefJson.titre}</h2>
                    </div>
                  </div>
                  <span style={{ 
                    padding: '0.4rem 0.8rem', 
                    border: `1px solid ${selectedBrief.status === 'OK' ? 'var(--up)' : 'var(--amber)'}`,
                    color: selectedBrief.status === 'OK' ? 'var(--up)' : 'var(--amber)',
                    fontSize: '0.8rem', borderRadius: '3px',
                    whiteSpace: 'nowrap'
                  }}>
                    {selectedBrief.status === 'OK' ? 'VÉRIFIÉ' : 'PARTIEL'}
                  </span>
                </div>
                
                <p className="detail-content">{selectedBrief.briefJson.breve}</p>
                
                {selectedBrief.briefJson.chiffres_cles && selectedBrief.briefJson.chiffres_cles.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ color: 'var(--dim)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                      Données financières extraites
                    </h4>
                    
                    <div className="table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th style={{ width: '40%' }}>Indicateur</th>
                            <th>Valeur</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedBrief.briefJson.chiffres_cles.map((c, i) => (
                            <tr key={i}>
                              <td>{c.label || 'Donnée'}</td>
                              <td>{c.valeur || c}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {selectedBrief.status !== 'OK' && (
                      <div style={{ 
                        marginTop: '1rem', padding: '0.75rem', 
                        background: 'rgba(255, 159, 28, 0.1)', border: '1px solid rgba(255, 159, 28, 0.3)',
                        borderRadius: '4px', color: 'var(--amber)', fontSize: '0.8rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                      }}>
                        <span>⚠️</span>
                        <span>Certains chiffres n'ont pas pu être vérifiés dans le document source.</span>
                      </div>
                    )}
                  </div>
                )}

                {selectedBrief.error && (
                  <div style={{ 
                    background: 'rgba(255,64,64,0.1)', color: 'var(--down)', 
                    padding: '1rem', marginBottom: '1rem', fontSize: '0.85rem', 
                    borderLeft: '3px solid var(--down)' 
                  }}>
                    ⚠️ Détail de la vérification : {selectedBrief.error}
                  </div>
                )}

                <div className="detail-actions">
                  <button className="btn" onClick={() => setSelectedBrief(null)}>
                    ← Retour au terminal
                  </button>
                  <a href={selectedBrief.documentUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                    Consulter le PDF source ↗
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                className="grid"
                variants={gridVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, x: -20 }}
              >
                {briefs.map((b) => (
                  <motion.div 
                    key={b.id} 
                    className="card" 
                    onClick={() => setSelectedBrief(b)}
                    variants={cardVariants}
                    whileHover={{ scale: 1.02, y: -4 }} 
                    whileTap={{ scale: 0.98 }}        
                  >
                    <div className="card-head"> {/* Utilisation de ta classe CSS */}
                      <CompanyLogo societe={b.briefJson.societe} size={24} />
                      <div className="card-societe">{b.briefJson.societe || 'Inconnue'}</div>
                    </div>
                    <h3>{b.briefJson.titre}</h3>
                    <div className="card-excerpt">{b.briefJson.breve}</div>
                    
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {b.briefJson.chiffres_cles?.slice(0, 2).map((c, i) => (
                        <span key={i} style={{ 
                          fontSize: '0.7rem', padding: '0.2rem 0.5rem', 
                          background: '#151515', border: '1px solid #2a2a2a',
                          color: 'var(--dim)', borderRadius: '2px'
                        }}>
                          {c.label}: <strong style={{ color: 'var(--text)' }}>{c.valeur}</strong>
                        </span>
                      ))}
                      {b.briefJson.chiffres_cles?.length > 2 && (
                        <span style={{ color: 'var(--dim)', fontSize: '0.7rem', alignSelf: 'center' }}>
                          +{b.briefJson.chiffres_cles.length - 2} autres
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
                {briefs.length === 0 && !loading && (
                  <div style={{ color: 'var(--dim)', gridColumn: '1 / -1', textAlign: 'center', marginTop: '3rem' }}>
                    Aucune dépêche trouvée.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </>
  )
}

export default App