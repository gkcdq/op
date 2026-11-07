import { useEffect, useState } from 'react'
import './App.css'
import { fetchBriefs } from './api/datagouv/briefs' // <-- L'import propre

const MARKETS = [
  // ... tes marchés fictifs restent inchangés
  { s: 'CAC 40',   last: 8124.35,  chg: 41.2,   pct: 0.51 },
  { s: 'DAX',      last: 19852.10, chg: -63.4,  pct: -0.32 },
  { s: 'FTSE 100', last: 8301.77,  chg: 12.9,   pct: 0.16 },
  { s: 'S&P 500',  last: 5921.4,   chg: 28.6,   pct: 0.49 },
  { s: 'EUR/USD',  last: 1.0842,   chg: -0.0021, pct: -0.19 },
  { s: 'BRENT',    last: 74.12,    chg: 0.88,   pct: 1.2 },
  { s: 'OR',       last: 2648.3,   chg: -9.5,   pct: -0.36 },
  { s: 'BTC/USD',  last: 68240,    chg: 1120,   pct: 1.67 },
]

const fmt = (n) => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function Clock() {
  // ... inchangé
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="hdr-clock">{now.toLocaleTimeString('fr-FR')}</span>
}

function App() {
  const ticks = [...MARKETS, ...MARKETS]
  
  const [briefs, setBriefs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // On appelle la fonction de notre dossier api/datagouv
    const loadBriefs = async () => {
      try {
        const data = await fetchBriefs()
        setBriefs(data)
      } catch (err) {
        console.error("Erreur:", err)
        setError("Impossible de contacter l'API.")
      } finally {
        setLoading(false)
      }
    }

    loadBriefs()
  }, [])

  return (
    <>
      <header className="hdr">
        <div className="hdr-logo">FINADORY</div>
        <div className="hdr-cmd"><span>&gt;</span> VEILLE &lt;GO&gt;</div>
        <Clock />
      </header>

      <div className="ticker" aria-label="Cours en direct">
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
        <section className="panel span-2">
          <div className="panel-h">Aperçu du marché <small>Données fictives</small></div>
          <div className="kpis">
             <div className="kpi"><small>Brèves générées</small><strong>{briefs.length}</strong></div>
             <div className="kpi"><small>Statut OK</small><strong>{briefs.filter(b => b.status === 'OK').length}</strong></div>
             <div className="kpi"><small>Statut Partiel</small><strong>{briefs.filter(b => b.status === 'PARTIEL').length}</strong></div>
             <div className="kpi"><small>Volatilité</small><strong>14,2</strong></div>
          </div>
        </section>

        <section className="panel span-2">
          <div className="panel-h">Dernières dépêches générées par l'IA</div>
          
          {loading && <div style={{ padding: '1rem', color: 'var(--amber)' }}>Chargement des dépêches...</div>}
          {error && <div style={{ padding: '1rem', color: 'var(--down)' }}>{error}</div>}
          
          {!loading && !error && briefs.length === 0 && (
             <div style={{ padding: '1rem', color: 'var(--dim)' }}>Aucune brève disponible pour le moment.</div>
          )}

          {!loading && !error && briefs.length > 0 && (
            <ul className="news" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px' }}>
              {briefs.map((b) => (
                <li key={b.id} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--amber)' }}>
                      {/* On affiche le nom de la société et le titre */}
                      <span style={{ color: 'var(--blue)' }}>{b.briefJson.societe}</span> : {b.briefJson.titre}
                    </h3>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      padding: '0.2rem 0.5rem', 
                      borderRadius: '3px',
                      backgroundColor: b.status === 'OK' ? 'rgba(0, 210, 106, 0.2)' : 'rgba(251, 139, 30, 0.2)',
                      color: b.status === 'OK' ? 'var(--up)' : 'var(--amber)',
                      border: `1px solid ${b.status === 'OK' ? 'var(--up)' : 'var(--amber)'}`
                    }}>
                      {b.status}
                    </span>
                  </div>
                  
                  <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text)' }}>
                    {b.briefJson.breve}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                    {b.briefJson.chiffres_cles?.map((c, idx) => (
                      <span key={idx} style={{ background: '#1a1a1a', padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: 'var(--dim)', borderRadius: '3px' }}>
                        {c}
                      </span>
                    ))}
                  </div>

                  <a href={b.documentUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--blue)', marginTop: 'auto', paddingTop: '1rem' }}>
                    Consulter le PDF source ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="ftr">
        <span>© 2026 FINADORY</span>
        <span>Analyse générée par Mistral AI</span>
      </footer>
    </>
  )
}

export default App