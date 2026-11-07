import { motion } from 'framer-motion'
import CompanyLogo from './CompanyLogo'

interface BriefCardProps {
  brief: any;
  onClick: () => void;
  variants: any;
}

export default function BriefCard({ brief, onClick, variants }: BriefCardProps) {
  return (
    <motion.div 
      className="card" 
      onClick={onClick}
      variants={variants}
      whileHover={{ scale: 1.02, y: -4 }} 
      whileTap={{ scale: 0.98 }}        
    >
      <div className="card-head">
        <CompanyLogo societe={brief.briefJson.societe} size={24} />
        <div className="card-societe">{brief.briefJson.societe || 'Inconnue'}</div>
      </div>
      <h3>{brief.briefJson.titre}</h3>
      <div className="card-excerpt">{brief.briefJson.breve}</div>
      
      <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {brief.briefJson.chiffres_cles?.slice(0, 2).map((c: any, i: number) => (
          <span key={i} style={{ 
            fontSize: '0.7rem', padding: '0.2rem 0.5rem', 
            background: '#151515', border: '1px solid #2a2a2a',
            color: 'var(--dim)', borderRadius: '2px'
          }}>
            {c.label}: <strong style={{ color: 'var(--text)' }}>{c.valeur}</strong>
          </span>
        ))}
        {brief.briefJson.chiffres_cles?.length > 2 && (
          <span style={{ color: 'var(--dim)', fontSize: '0.7rem', alignSelf: 'center' }}>
            +{brief.briefJson.chiffres_cles.length - 2} autres
          </span>
        )}
      </div>
    </motion.div>
  )
}