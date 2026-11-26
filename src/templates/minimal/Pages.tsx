import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLocalizedData } from '../../hooks/useLocalizedData'
import type { LayoutProps } from '../types'
import './minimal.css'

export function Layout({ children }: LayoutProps) {
  const { siteConfig, publications } = useLocalizedData()
  const { t, i18n } = useTranslation()
  const zh = i18n.resolvedLanguage === 'zh'
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useEffect(() => {
    document.documentElement.lang = zh ? 'zh-CN' : 'en'
    document.title = siteConfig.name.display
  }, [zh, siteConfig])
  return (
    <div className="folio">
      <div className="folio-sheet">
        <header className="folio-bar">
          <NavLink end to="/">{t('nav.home')}</NavLink>
          <nav aria-label={t('nav.navigation')}>
            {siteConfig.features.experience && <NavLink to="/experience">{t('nav.experience')}</NavLink>}
            {siteConfig.features.publications && publications.length > 0 && <NavLink to="/publications">{t('nav.publications')}</NavLink>}
            <button onClick={() => i18n.changeLanguage(zh ? 'en' : 'zh')} lang={zh ? 'en' : 'zh'}>{zh ? 'English' : '中文'}</button>
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
  const { i18n } = useTranslation()
  const zh = i18n.resolvedLanguage === 'zh'
  const [intro, ...personal] = about.journey.split(/\n+/).filter(Boolean)
  return (
    <>
      <header>
        <h1>{siteConfig.name.display}</h1>
        <div className="folio-links">
          <a href={siteConfig.social.github}>GitHub</a>
          <a href={'mailto:' + siteConfig.contact.email}>{zh ? '邮箱' : 'Email'}</a>
        </div>
      </header>
      <p className="folio-intro">{intro}</p>
      <section><h2>{zh ? '精选项目' : 'Selected projects'}</h2>
        {projects.filter(project => project.featured).map(project => (
          <article key={project.title} className="folio-project">
            <h3><a href={project.link}>{project.title}</a></h3><p>{project.summary}</p>
          </article>
        ))}
      </section>
      {personal.length > 0 && <section><h2>{zh ? '研究之外' : 'Away from the desk'}</h2>
        {personal.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </section>}
    </>
  )
}

export function Experience() {
  const { experience, experienceTimeline, awards } = useLocalizedData()
  const { i18n, t } = useTranslation()
  const zh = i18n.resolvedLanguage === 'zh'
  const [query, setQuery] = useState('')
  const entries = experienceTimeline.filter(item => [item.title, item.company, item.summary, ...item.highlights]
    .join(' ').toLowerCase().includes(query.trim().toLowerCase())).sort((a,b) => b.start.localeCompare(a.start))
  return (
    <>
      <h1>{t('nav.experience')}</h1>
      <section><h2>{zh ? '教育背景' : 'Education'}</h2>
        {experience.education.courses.map(item => <article key={item.course}><small>{item.year}</small><h3>{item.course}</h3><p>{item.institution}</p></article>)}
      </section>
      <section><h2>{zh ? '工作与活动' : 'Work and activities'}</h2>
        <label>{zh ? '搜索经历' : 'Search experience'}<input type="search" value={query} onChange={e => setQuery(e.target.value)} /></label>
        {entries.map(item => <article key={item.title}>
          <small>{item.start.slice(0,7)} – {item.end?.slice(0,7) ?? (zh ? '至今' : 'present')}</small>
          <h3>{item.title}</h3><p>{item.company}</p><p>{item.summary}</p>
          {item.highlights.length > 0 && <details><summary>{zh ? '详情' : 'Details'}</summary><ul>{item.highlights.map(line => <li key={line}>{line}</li>)}</ul></details>}
        </article>)}
        {!entries.length && <p>{zh ? '没有匹配的经历。' : 'No matching experience.'}</p>}
      </section>
      <section><h2>{zh ? '荣誉' : 'Awards'}</h2>{awards.map(item => <p key={item.title}><small>{item.date}</small>　{item.title}</p>)}</section>
    </>
  )
}

export function Publications() {
  const { publications } = useLocalizedData()
  const { t, i18n } = useTranslation()
  return <><h1>{t('nav.publications')}</h1>
    {publications.length ? publications.map(item => <article key={item.id}><small>{item.year} · {item.venue}</small><h3>{item.title}</h3><p>{item.authors.join(', ')}</p>{Object.entries(item.links).map(([label,url]) => <a key={label} href={url}>{label} </a>)}</article>)
      : <p>{i18n.resolvedLanguage === 'zh' ? '暂无已列出的论文。' : 'No publications listed yet.'}</p>}
    <Link to="/">{t('nav.home')}</Link></>
}
