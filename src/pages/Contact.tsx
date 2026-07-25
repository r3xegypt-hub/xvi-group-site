import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import usePageMeta from '../hooks/usePageMeta'
import { PageSection, SitePage } from '../components/common'
import { contactDetails, faqs } from '../data/siteContent'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  usePageMeta({ title: 'تواصل — XVI Group', description: 'ابدأ حوارًا مع XVI Group حول التحول والاستراتيجية والتقنية.', canonical: 'https://xvi-group.net/contact', schemaType: 'ContactPage' })
  const validate = (form: HTMLFormElement) => {
    const next: Record<string, string> = {}
    const name = form.elements.namedItem('name') as HTMLInputElement | null
    const email = form.elements.namedItem('email') as HTMLInputElement | null
    const message = form.elements.namedItem('message') as HTMLTextAreaElement | null
    if (!name?.value.trim()) next.name = 'الاسم مطلوب'
    if (!email?.value.trim()) next.email = 'البريد الإلكتروني مطلوب'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) next.email = 'أدخل بريدًا إلكترونيًا صالحًا'
    if (!message?.value.trim()) next.message = 'الرسالة مطلوبة'
    return next
  }
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = validate(event.currentTarget)
    setErrors(next)
    if (Object.keys(next).length === 0) setSubmitted(true)
  }
  const fieldClass = 'mt-2 w-full rounded-2xl border border-[color:var(--color-xvi-line)] bg-white/75 px-4 py-3.5 outline-none transition duration-300 focus:border-[color:var(--color-xvi-bronze)] focus:bg-white focus:shadow-[0_12px_34px_rgba(11,15,20,.05)]'
  const errorBorder = 'border-red-500 focus:border-red-500'
  return <SitePage crumb="تواصل" eyebrow="XVI / CONTACT" title={<>لنبدأ من<br />السؤال الصحيح.</>} description="أخبرنا بما تحاول تحقيقه. سنرتب حوارًا مركزًا مع الأشخاص المناسبين من فريقنا." ctaLabel="راجع الأسئلة الشائعة" ctaPath="#faq">
    <PageSection eyebrow="START A CONVERSATION" title="ما الذي يستحق أن يتحرك الآن؟"><div className="grid gap-10 lg:grid-cols-[1fr_.75fr]"><form onSubmit={submit} className="grid gap-5" aria-label="نموذج التواصل" noValidate>
      <label className="group text-sm font-medium">الاسم<input required name="name" aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} className={`${fieldClass} ${errors.name ? errorBorder : ''}`} />{errors.name && <span id="err-name" role="alert" className="mt-1 block text-xs text-red-500">{errors.name}</span>}</label>
      <label className="group text-sm font-medium">البريد المهني<input required type="email" name="email" aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} className={`${fieldClass} ${errors.email ? errorBorder : ''}`} />{errors.email && <span id="err-email" role="alert" className="mt-1 block text-xs text-red-500">{errors.email}</span>}</label>
      <label className="group text-sm font-medium">المؤسسة<input name="company" aria-describedby="help-company" className={fieldClass} /><span id="help-company" className="mt-1 block text-xs text-gray-400">اختياري</span></label>
      <label className="group text-sm font-medium">كيف يمكننا المساعدة؟<textarea required name="message" rows={5} aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} className={`${fieldClass} resize-y ${errors.message ? errorBorder : ''}`} />{errors.message && <span id="err-message" role="alert" className="mt-1 block text-xs text-red-500">{errors.message}</span>}</label>
      <button type="submit" className="xvi-premium-button mt-2 w-fit overflow-hidden rounded-full bg-[color:var(--color-xvi-navy)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(11,27,51,.17)]">أرسل الطلب</button>
      {submitted ? <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} role="status" className="text-sm text-[color:var(--color-xvi-bronze)]">شكرًا لك. تم تسجيل طلبك وسيتواصل معك فريقنا قريبًا.</motion.p> : null}
    </form><aside className="relative overflow-hidden rounded-[28px] bg-[color:var(--color-xvi-navy)] p-8 text-white shadow-[0_30px_72px_rgba(11,27,51,.16)]"><div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_92%_8%,rgba(201,169,110,.22),transparent_30%)]" /><div className="relative"><div className="text-xs tracking-[.2em] text-[color:var(--color-xvi-bronze)]">OFFICE</div><div className="mt-10 space-y-7">{contactDetails.map(item => <div key={item.label}><div className="text-xs text-white/50">{item.label}</div>{item.href ? <a href={item.href} className="mt-2 block text-lg transition hover:text-[color:var(--color-xvi-bronze)]">{item.value}</a> : <p className="mt-2 text-lg">{item.value}</p>}</div>)}</div><div className="mt-12 flex min-h-40 items-end rounded-2xl border border-white/15 bg-[linear-gradient(135deg,rgba(201,169,110,.22),transparent)] p-4 text-sm text-white/60">خريطة الموقع<br/>Al Ain, UAE</div></div></aside></div></PageSection>
    <PageSection tone="paper" eyebrow="FAQ" title="أسئلة أولية." ><div id="faq" className="divide-y divide-[color:var(--color-xvi-line)]">{faqs.map(item => <details key={item.q} className="py-5"><summary className="cursor-pointer text-lg font-semibold">{item.q}</summary><p className="mt-4 max-w-2xl leading-8 text-[color:var(--color-xvi-ink-soft)]">{item.a}</p></details>)}</div></PageSection>
  </SitePage>
}
