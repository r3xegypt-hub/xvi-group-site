import usePageMeta from '../hooks/usePageMeta'
import { PageSection, SitePage } from '../components/common'

const terms = [['استخدام الموقع','يُقدم هذا الموقع لأغراض تعريفية ومهنية. تلتزم باستخدامه بطريقة مشروعة ولا تؤثر في أمنه أو توافره.'],['الملكية الفكرية','المحتوى والعلامات والتصاميم المعروضة مملوكة لـ XVI Group أو مرخصة لها، ولا يجوز استخدامها دون موافقة كتابية.'],['المعلومات المهنية','لا يشكل محتوى الموقع استشارة ملزمة أو عرضًا تعاقديًا. تُحدد أي خدمات بموجب اتفاق منفصل ومكتوب.'],['حدود المسؤولية','نبذل جهدًا معقولًا للحفاظ على دقة المحتوى، لكننا لا نضمن خلوه من الأخطاء أو ملاءمته لغرض محدد.'],['القانون الساري','تُفسر هذه الشروط وفق القوانين المعمول بها في دولة الإمارات العربية المتحدة.']]
export default function TermsPage() {
  usePageMeta({ title: 'الشروط والأحكام — XVI Group', description: 'شروط وأحكام استخدام موقع XVI Group.', canonical: 'https://xvi-group.net/terms' })
  return <SitePage crumb="الشروط والأحكام" eyebrow="XVI / TERMS" title={<>شروط واضحة<br />لعلاقة مهنية.</>} description="باستخدامك موقع XVI Group، توافق على هذه الشروط والأحكام. نكتبها بلغة مباشرة لأن الوضوح جزء من العلاقة." ctaLabel="تواصل معنا" ctaPath="/contact">
    <PageSection eyebrow="TERMS OF USE" title="أساس استخدام الموقع."><div className="max-w-3xl space-y-8">{terms.map(([title,text], index) => <article key={title} className="grid gap-3 sm:grid-cols-[70px_1fr]"><div className="text-sm tracking-[.2em] text-[color:var(--color-xvi-bronze)]">0{index + 1}</div><div><h3 className="text-2xl font-semibold">{title}</h3><p className="mt-3 leading-8 text-[color:var(--color-xvi-ink-soft)]">{text}</p></div></article>)}<p className="border-t border-[color:var(--color-xvi-line)] pt-6 text-sm text-[color:var(--color-xvi-ink-soft)]">آخر تحديث: يوليو 2026.</p></div></PageSection>
  </SitePage>
}
