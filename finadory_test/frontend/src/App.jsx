import { useEffect, useState } from 'react'
import './App.css'
import { fetchBriefs } from './api/datagouv/briefs'

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

function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="hdr-clock">{now.toLocaleTimeString('fr-FR')}</span>
}

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [briefs, setBriefs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBrief, setSelectedBrief] = useState(null)

  useEffect(() => {
    const loadBriefs = async () => {
      try {
        const data = await fetchBriefs()
        setBriefs(data)
      } catch (err) {
        console.error("Erreur:", err)
      } finally {
        setLoading(false)
      }
    }
    loadBriefs()
    // Rafraîchissement toutes les 60 secondes (polling)
    const interval = setInterval(loadBriefs, 60000)
    return () => clearInterval(interval)
  }, [])

  const ticks = [...MARKETS, ...MARKETS]

  return (
    <>
      {/* ÉCRAN D'ACCUEIL */}
      <div className={`splash ${isStarted ? 'hidden' : ''}`} onClick={() => setIsStarted(true)}>
        <h1>Bergdot</h1>
        <p>[ Cliquez pour accéder au terminal ]</p>
      </div>

      {/* HEADER */}
      <header className="hdr">
        <div className="hdr-logo">BERGDOT TERMINAL</div>
        <Clock />
      </header>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {ticks.map((m, i) => (
            <span className="tick" key={i}>
              <b>{m.s}</b>{fmt(m.last)}{' '}
              <span style={{ color: m.pct >= 0 ? 'var(--up)' : 'var(--down)' }}>
                {m.pct >= 0 ? '▲' : '▼'} {Math.abs(m.pct).toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* CONTENU PRINCIPAL */}
      <main className="main">
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--amber)', marginTop: '3rem' }}>
            Chargement des données...
          </div>
        ) : selectedBrief ? (
          
          /* VUE DÉTAILLÉE */
          <div className="detail">
            <div className="detail-header">
              <div>
                <span className="detail-societe">{selectedBrief.briefJson.societe || 'N/A'}</span>
                <h2 className="detail-title">{selectedBrief.briefJson.titre}</h2>
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
            
            {/* TABLEAU DES CHIFFRES CLÉS */}
            {selectedBrief.briefJson.chiffres_cles && selectedBrief.briefJson.chiffres_cles.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--dim)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  Données financières extraites
                </h4>
                
                <div style={{ border: '1px solid var(--line)', borderRadius: '4px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#111', borderBottom: '1px solid var(--line)' }}>
                        <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--dim)', fontWeight: 500, width: '40%' }}>Indicateur</th>
                        <th style={{ textAlign: 'right', padding: '0.75rem 1rem', color: 'var(--dim)', fontWeight: 500 }}>Valeur</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBrief.briefJson.chiffres_cles.map((c, i) => (
                        <tr key={i} style={{ borderBottom: i < selectedBrief.briefJson.chiffres_cles.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--text)' }}>
                            {c.label || 'Donnée'}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'right', color: 'var(--amber)', fontWeight: 600, fontFamily: 'var(--mono)' }}>
                            {c.valeur || c}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Alerte visuelle si le statut n'est pas OK */}
                {selectedBrief.status !== 'OK' && (
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.75rem', 
                    background: 'rgba(255, 159, 28, 0.1)', 
                    border: '1px solid rgba(255, 159, 28, 0.3)',
                    borderRadius: '4px',
                    color: 'var(--amber)',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>⚠️</span>
                    <span>Certains chiffres n'ont pas pu être vérifiés dans le document source (voir détail ci-dessous).</span>
                  </div>
                )}
              </div>
            )}

            {/* DÉTAIL DE L'ERREUR */}
            {selectedBrief.error && (
              <div style={{ 
                background: 'rgba(255,64,64,0.1)', 
                color: 'var(--down)', 
                padding: '1rem', 
                marginBottom: '1rem', 
                fontSize: '0.85rem', 
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
          </div>

        ) : (
          
          /* GRILLE PRINCIPALE */
          <div className="grid">
            {briefs.map((b) => (
              <div key={b.id} className="card" onClick={() => setSelectedBrief(b)}>
                <div className="card-societe">{b.briefJson.societe || 'Inconnue'}</div>
                <h3>{b.briefJson.titre}</h3>
                <div className="card-excerpt">{b.briefJson.breve}</div>
                
                {/* TAGS DES CHIFFRES SUR LA CARTE */}
                <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {b.briefJson.chiffres_cles?.slice(0, 2).map((c, i) => (
                    <span key={i} style={{ 
                      fontSize: '0.7rem', 
                      padding: '0.2rem 0.5rem', 
                      background: '#151515', 
                      border: '1px solid #2a2a2a',
                      color: 'var(--dim)',
                      borderRadius: '2px'
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
              </div>
            ))}
            {briefs.length === 0 && (
              <div style={{ color: 'var(--dim)', gridColumn: '1 / -1', textAlign: 'center', marginTop: '3rem' }}>
                Aucune dépêche disponible pour le moment.
              </div>
            )}
          </div>
        )}
      </main>
    </>
  )
}

export default App