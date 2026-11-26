import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLocalizedData } from '../../hooks/useLocalizedData'
import type { LayoutProps } from '../types'
import { withBase } from '../../utils/asset'
import { FaGithub, FaRegEnvelope } from 'react-icons/fa'
import './minimal.css'

export function Layout({ children }: LayoutProps) {
  const { siteConfig, publications } = useLocalizedData()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useEffect(() => {
    document.title = siteConfig.name.display
  }, [siteConfig])
  return (
    <div className="folio">
      <div className="folio-sheet">
        <header className="folio-bar">
          <NavLink end to="/">{t('nav.home')}</NavLink>
          <nav aria-label={t('nav.navigation')}>
            {siteConfig.features.experience && <NavLink to="/experience">{t('nav.experience')}</NavLink>}
            {siteConfig.features.publications && publications.length > 0 && <NavLink to="/publications">{t('nav.publications')}</NavLink>}
          </nav>
        </header>
        <main>{children}</main>
        <footer>© {siteConfig.name.display}</footer>
      </div>
    </div>
  )
}

export function Home() {
  const { siteConfig, about, projects } = useLocalizedData()
  const [, ...personal] = about.journey.split(/\n+/).filter(Boolean)
  return (
    <>
      <header className="folio-profile">
        <img src={withBase('images/' + siteConfig.avatar)} width="240" height="240" alt="" />
        <div>
          <h1>{siteConfig.name.display}</h1>
          <p className="folio-tagline">{siteConfig.tagline}</p>
          <div className="folio-links">
            <a href={siteConfig.social.github} aria-label="GitHub" title="GitHub"><FaGithub /></a>
            <a href={'mailto:' + siteConfig.contact.email} aria-label="Email" title="Email"><FaRegEnvelope /></a>
          </div>
        </div>
      </header>
      {about.journeyPhases?.length ? (
        <ol className="folio-timeline" aria-label="Education">
          {about.journeyPhases.map(phase => (
            <li key={phase.period}>
              <span className="folio-period">{phase.period}</span>
              <div className="folio-entry">
                <h3>{phase.org}</h3>
                <p>{phase.title}</p>
                <p>{phase.description}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}
      <section><h2>selected projects</h2>
        {projects.filter(project => project.featured).map(project => (
          <article key={project.title} className="folio-project">
            <h3><a href={project.link}>{project.title}</a></h3><p>{project.summary}</p>
          </article>
        ))}
      </section>
      {personal.length > 0 && <section><h2>away from the desk</h2>
        {personal.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </section>}
    </>
  )
}

export function Experience() {
  const { experience, experienceTimeline, awards } = useLocalizedData()
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const entries = experienceTimeline.filter(item => [item.title, item.company, item.summary, ...item.highlights]
    .join(' ').toLowerCase().includes(query.trim().toLowerCase())).sort((a,b) => b.start.localeCompare(a.start))
  return (
    <>
      <h1>{t('nav.experience')}</h1>
      <section><h2>Education</h2>
        {experience.education.courses.map(item => <article key={item.course}><small>{item.year}</small><h3>{item.course}</h3><p>{item.institution}</p></article>)}
      </section>
      <section><h2>Work and activities</h2>
        <label>Search experience<input type="search" value={query} onChange={e => setQuery(e.target.value)} /></label>
        {entries.map(item => <article key={item.title}>
          <small>{item.start.slice(0,7)} – {item.end?.slice(0,7) ?? 'present'}</small>
          <h3>{item.title}</h3><p>{item.company}</p><p>{item.summary}</p>
          {item.highlights.length > 0 && <details><summary>Details</summary><ul>{item.highlights.map(line => <li key={line}>{line}</li>)}</ul></details>}
        </article>)}
        {!entries.length && <p>No matching experience.</p>}
      </section>
      <section><h2>Awards</h2>{awards.map(item => <p key={item.title}><small>{item.date}</small>　{item.title}</p>)}</section>
    </>
  )
}

export function Publications() {
  const { publications } = useLocalizedData()
  const { t } = useTranslation()
  return <><h1>{t('nav.publications')}</h1>
    {publications.length ? publications.map(item => <article key={item.id}><small>{item.year} · {item.venue}</small><h3>{item.title}</h3><p>{item.authors.join(', ')}</p>{Object.entries(item.links).map(([label,url]) => <a key={label} href={url}>{label} </a>)}</article>)
      : <p>No publications listed yet.</p>}
    <Link to="/">{t('nav.home')}</Link></>
}
