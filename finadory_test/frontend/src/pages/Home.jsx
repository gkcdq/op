import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchBriefs } from '../api/datagouv/briefs'
import Header from '../components/Header'
import Ticker from '../components/Ticker'
import SearchBar from '../components/SearchBar'
import SkeletonLoader from '../components/SkeletonLoader'
import BriefCard from '../components/BriefCard'
import BriefDetail from '../components/BriefDetail'

const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
}

export default function Home() {
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
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              Bergdot
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
              [ Cliquez pour accéder au terminal ]
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <Ticker />

      <main className="main">
        <SearchBar search={search} setSearch={setSearch} hidden={!!selectedBrief} />

        {error && (
          <div style={{
            background: 'rgba(255, 107, 107, 0.1)', border: '1px solid var(--down)',
            color: 'var(--down)', padding: '1rem', borderRadius: '4px',
            marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem'
          }}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <SkeletonLoader />
        ) : (
          <AnimatePresence mode="wait">
            {selectedBrief ? (
              <BriefDetail brief={selectedBrief} onBack={() => setSelectedBrief(null)} />
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
                  <BriefCard 
                    key={b.id} 
                    brief={b} 
                    onClick={() => setSelectedBrief(b)} 
                    variants={cardVariants} 
                  />
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