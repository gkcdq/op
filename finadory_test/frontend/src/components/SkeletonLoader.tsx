export default function SkeletonLoader() {
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