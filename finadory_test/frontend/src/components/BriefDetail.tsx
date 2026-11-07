import { motion } from 'framer-motion'
import CompanyLogo from './CompanyLogo'

interface BriefDetailProps {
  brief: any;
  onBack: () => void;
}

export default function BriefDetail({ brief, onBack }: BriefDetailProps) {
  return (
    <motion.div 
      key="detail"
      className="detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="detail-header">
        <div className="detail-id">
          <CompanyLogo societe={brief.briefJson.societe} size={48} />
          <div>
            <span className="detail-societe">{brief.briefJson.societe || 'N/A'}</span>
            <h2 className="detail-title">{brief.briefJson.titre}</h2>
          </div>
        </div>
        <span style={{ 
          padding: '0.4rem 0.8rem', 
          border: `1px solid ${brief.status === 'OK' ? 'var(--up)' : 'var(--amber)'}`,
          color: brief.status === 'OK' ? 'var(--up)' : 'var(--amber)',
          fontSize: '0.8rem', borderRadius: '3px',
          whiteSpace: 'nowrap'
        }}>
          {brief.status === 'OK' ? 'VÉRIFIÉ' : 'PARTIEL'}
        </span>
      </div>
      
      <p className="detail-content">{brief.briefJson.breve}</p>
      
      {brief.briefJson.chiffres_cles && brief.briefJson.chiffres_cles.length > 0 && (
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
                {brief.briefJson.chiffres_cles.map((c: any, i: number) => (
                  <tr key={i}>
                    <td>{c.label || 'Donnée'}</td>
                    <td>{c.valeur || c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {brief.status !== 'OK' && (
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

      {brief.error && (
        <div style={{ 
          background: 'rgba(255,64,64,0.1)', color: 'var(--down)', 
          padding: '1rem', marginBottom: '1rem', fontSize: '0.85rem', 
          borderLeft: '3px solid var(--down)' 
        }}>
          ⚠️ Détail de la vérification : {brief.error}
        </div>
      )}

      <div className="detail-actions">
        <button className="btn" onClick={onBack}>
          ← Retour au terminal
        </button>
        <a href={brief.documentUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Consulter le PDF source ↗
        </a>
      </div>
    </motion.div>
  )
}