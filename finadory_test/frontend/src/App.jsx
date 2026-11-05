import { useEffect, useState } from 'react'
import './App.css'

const MARKETS = [
  { s: 'CAC 40',   last: 8124.35,  chg: 41.2,   pct: 0.51 },
  { s: 'DAX',      last: 19852.10, chg: -63.4,  pct: -0.32 },
  { s: 'FTSE 100', last: 8301.77,  chg: 12.9,   pct: 0.16 },
  { s: 'S&P 500',  last: 5921.4,   chg: 28.6,   pct: 0.49 },
  { s: 'EUR/USD',  last: 1.0842,   chg: -0.0021, pct: -0.19 },
  { s: 'BRENT',    last: 74.12,    chg: 0.88,   pct: 1.2 },
  { s: 'OR',       last: 2648.3,   chg: -9.5,   pct: -0.36 },
  { s: 'BTC/USD',  last: 68240,    chg: 1120,   pct: 1.67 },
]

const NEWS = [
  { t: '09:42', h: 'La BCE maintient ses taux directeurs, ton prudent sur l\'inflation' },
  { t: '09:15', h: 'Les valeurs du luxe rebondissent après les résultats trimestriels' },
  { t: '08:50', h: 'Pétrole : l\'OPEP+ envisage de prolonger les baisses de production' },
  { t: '08:30', h: 'Industrie européenne : l\'indice PMI dépasse les attentes' },
  { t: '08:05', h: 'Fusion dans la tech : un accord à 4 Md€ en vue' },
]

const KPIS = [
  { l: 'Volume', v: '2,4 Md' },
  { l: 'Hausses', v: '312' },
  { l: 'Baisses', v: '188' },
  { l: 'Volatilité', v: '14,2' },
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
  const ticks = [...MARKETS, ...MARKETS] // dupliqué pour un défilement continu

  return (
    <>
      <header className="hdr">
        <div className="hdr-logo">HANIABAL</div>
        <div className="hdr-cmd"><span>&gt;</span> MARCHES &lt;GO&gt;</div>
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
            {KPIS.map((k) => (
              <div className="kpi" key={k.l}>
                <small>{k.l}</small>
                <strong>{k.v}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-h">Indices &amp; devises <small>Différé 15 min</small></div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Symbole</th><th>Dernier</th><th>Var.</th><th>Var. %</th></tr>
              </thead>
              <tbody>
                {MARKETS.map((m) => {
                  const cls = m.pct >= 0 ? 'up' : 'down'
                  return (
                    <tr key={m.s}>
                      <td>{m.s}</td>
                      <td>{fmt(m.last)}</td>
                      <td className={cls}>{m.chg >= 0 ? '+' : ''}{fmt(m.chg)}</td>
                      <td className={cls}>{m.pct >= 0 ? '+' : ''}{m.pct.toFixed(2)}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <div className="panel-h">Dernières dépêches</div>
          <ul className="news">
            {NEWS.map((n) => (
              <li key={n.t}>
                <time>{n.t}</time>
                <a href="#">{n.h}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="ftr">
        <span>© 2026 HANIABAL</span>
        <span>Données fictives à titre de démonstration</span>
      </footer>
    </>
  )
}

export default App