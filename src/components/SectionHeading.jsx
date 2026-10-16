export default function SectionHeading({ eyebrow, title, titleId, description }) {
  return <div className="section-heading">
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2 id={titleId}>{title}</h2>
    {description && <p className="section-description">{description}</p>}
  </div>
}
