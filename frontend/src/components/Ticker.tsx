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

const fmt = (n: number) => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function Ticker() {
  const ticks = [...MARKETS, ...MARKETS]

  return (
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
  )
}