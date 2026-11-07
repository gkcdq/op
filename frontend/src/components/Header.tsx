import { useEffect, useState } from 'react'

function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="hdr-clock">{now.toLocaleTimeString('fr-FR')}</span>
}

export default function Header() {
  return (
    <header className="hdr">
      <div className="hdr-logo">BERGDOT TERMINAL</div>
      <Clock />
    </header>
  )
}