import usePageMeta from '../hooks/usePageMeta'
import { PageCta, PageSection, SitePage } from '../components/common'

const insights = [['مقال تنفيذي','لماذا تتعثر برامج التحول قبل أن تصل إلى التقنية؟','6 دقائق قراءة'],['ورقة بيضاء','نموذج الحوكمة العملية للذكاء الاصطناعي المؤسسي','PDF / 18 صفحة'],['تقرير','المؤسسة القابلة للقرار: إشارات من السوق والعمليات','تقرير 2026'],['بحث','كيف تغير المنصات الذكية طبيعة العمل القيادي؟','بحث مستمر']]
export default function InsightsPage() {
  usePageMeta({ title: 'الرؤى — XVI Group', description: 'مقالات تنفيذية وأوراق بيضاء وتقارير وأبحاث XVI Group في الذكاء الاصطناعي والتحول.', canonical: 'https://xvi-group.net/insights', schemaType: 'CollectionPage' })
  return <SitePage crumb="الرؤى" eyebrow="XVI / INSIGHTS" title={<>رؤى تمنح<br />القرار عمقًا.</>} description="مساحة تحريرية لفرق القيادة التي تريد قراءة التحول بوضوح أكبر: ما الذي يتغير، وما الذي يستحق أن يُفعل الآن." ctaLabel="تحدث إلى باحثينا" ctaPath="/contact">
    <PageSection eyebrow="EXECUTIVE LIBRARY" title="قراءة مختصرة، وفكرة تستمر."><div className="grid gap-4 md:grid-cols-2">{insights.map(([type,title,meta]) => <article key={title} className="group rounded-[26px] border border-[color:var(--color-xvi-line)] bg-white/65 p-7 transition hover:bg-white"><div className="flex items-center justify-between text-xs tracking-[.14em] text-[color:var(--color-xvi-bronze)]"><span>{type}</span><span>{meta}</span></div><h3 className="mt-16 max-w-lg text-3xl font-semibold leading-tight tracking-[-.045em]">{title}</h3><div className="mt-8 text-sm text-[color:var(--color-xvi-ink-soft)]">اقرأ الرؤية ←</div></article>)}</div></PageSection>
    <PageSection tone="navy" eyebrow="RESEARCH AGENDA" title="AI، الثقة، ومستقبل القدرة المؤسسية."><p className="max-w-2xl text-lg leading-9 text-white/70">نبحث في الأسئلة التي تسبق موجة التنفيذ: كيف تُبنى الثقة؟ كيف تتغير الأدوار؟ وأين تتحقق القيمة فعلًا؟</p></PageSection>
    <PageCta title="اجعل الرؤية بداية حوار عمل." />
  </SitePage>
}
