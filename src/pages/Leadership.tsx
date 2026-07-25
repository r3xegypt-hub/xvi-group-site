import usePageMeta from '../hooks/usePageMeta'
import { PageCta, PageSection, SitePage } from '../components/common'

const profiles = [['القيادة التنفيذية','استراتيجية، تحول، وإدارة برامج معقدة.'],['الخبرة المتخصصة','تقنية، بيانات، أمن، وتجربة تشغيل.'],['المستشارون','وجهات نظر مستقلة تضيف عمقًا للقرارات الكبيرة.']]
export default function LeadershipPage() {
  usePageMeta({ title: 'القيادة — XVI Group', description: 'قيادة XVI Group وخبراتها التنفيذية والتقنية وثقافة العمل.', canonical: 'https://xvi-group.net/leadership', schemaType: 'AboutPage' })
  return <SitePage crumb="القيادة" eyebrow="XVI / LEADERSHIP" title={<>قيادة تعرف أن<br />الثقة تُكتسب.</>} description="نجمع خبرة الأعمال والتقنية والتنفيذ لنرافق فرق القيادة في اللحظات التي تحدد الاتجاه." ctaLabel="تواصل مع الفريق" ctaPath="/contact">
    <PageSection eyebrow="THE TEAM" title="خبرة موزعة، ومسؤولية مشتركة."><div className="grid gap-4 md:grid-cols-3">{profiles.map(([title,text], i) => <article key={title} className="min-h-72 rounded-[26px] border border-[color:var(--color-xvi-line)] bg-white/65 p-7"><div className="text-xs tracking-[.2em] text-[color:var(--color-xvi-bronze)]">XVI / 0{i+1}</div><h3 className="mt-24 text-3xl font-semibold tracking-[-.05em]">{title}</h3><p className="mt-4 leading-8 text-[color:var(--color-xvi-ink-soft)]">{text}</p></article>)}</div></PageSection>
    <PageSection tone="navy" eyebrow="EXPERTISE" title="نقود من داخل المشكلة، لا من حولها."><p className="max-w-2xl text-lg leading-9 text-white/70">تتقاطع خبراتنا في الاستراتيجية، التحول، الذكاء الاصطناعي، المنصات، والحوكمة. وهذا التقاطع هو ما يجعل الحوار أسرع والقرار أكثر تماسكًا.</p></PageSection>
    <PageSection tone="paper" eyebrow="CULTURE" title="الهدوء تحت الضغط جزء من الحرفة."><div className="grid gap-5 md:grid-cols-3"><p className="rounded-[22px] bg-white p-7 leading-8">نفكر باستقلالية ونلتزم بالنتيجة.</p><p className="rounded-[22px] bg-white p-7 leading-8">نحترم السياق ونواجه الحقيقة بوضوح.</p><p className="rounded-[22px] bg-white p-7 leading-8">نرفع قدرة العميل مع كل خطوة.</p></div></PageSection>
    <PageCta title="اجمع فريقك وفريقنا حول القرار التالي." />
  </SitePage>
}
