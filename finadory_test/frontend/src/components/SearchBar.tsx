import { motion, AnimatePresence } from 'framer-motion'

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  hidden: boolean;
}

export default function SearchBar({ search, setSearch, hidden }: SearchBarProps) {
  return (
    <AnimatePresence>
      {!hidden && (
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
  )
}