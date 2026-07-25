import usePageMeta from '../hooks/usePageMeta'
import { PageCta, PageSection, SitePage } from '../components/common'

const capabilities = [['المعمارية','نحو بيئة متماسكة وقابلة للتطور.'],['السحابة','اختيارات منصة توازن المرونة والسيادة والتكلفة.'],['الذكاء الاصطناعي','قدرات ذات قيمة ومضبوطة بالحوكمة.'],['الأتمتة','عمليات أقل احتكاكًا وأكثر قابلية للقياس.'],['الأمن السيبراني','مرونة مبنية داخل التصميم، لا بعده.'],['الأنظمة المؤسسية','منصات تخدم العمليات ولا تعيقها.'],['التكامل','تدفق موثوق للبيانات والقرارات.'],['منصات البيانات','أساس موحد للتحليل والابتكار.']]
export default function TechnologyPage() {
  usePageMeta({ title: 'التقنية — XVI Group', description: 'معمارية وسحابة وذكاء اصطناعي وأتمتة وأمن وأنظمة وبيانات للمؤسسات.', canonical: 'https://xvi-group.net/technology', schemaType: 'CollectionPage' })
  return <SitePage crumb="التقنية" eyebrow="XVI / TECHNOLOGY" title={<>تقنية تعمل<br />على مستوى الطموح.</>} description="نصمم منظومات تقنية تخلق الوضوح وتخفض التعقيد وتمنح المؤسسة مساحة آمنة للنمو." ctaLabel="استكشف المنظومة" ctaPath="/contact">
    <PageSection eyebrow="TECHNOLOGY STACK" title="كل طبقة لها دور في النتيجة."><div className="grid gap-px overflow-hidden rounded-[28px] border border-[color:var(--color-xvi-line)] bg-[color:var(--color-xvi-line)] sm:grid-cols-2 lg:grid-cols-4">{capabilities.map(([name, text]) => <article key={name} className="min-h-52 bg-white p-6"><div className="h-1 w-10 bg-[color:var(--color-xvi-bronze)]"/><h3 className="mt-12 text-2xl font-semibold tracking-[-.04em]">{name}</h3><p className="mt-3 text-sm leading-7 text-[color:var(--color-xvi-ink-soft)]">{text}</p></article>)}</div></PageSection>
    <PageSection tone="paper" eyebrow="ARCHITECTURAL PRINCIPLES" title="تصميم بهدوء، وتشغيل بثقة."><div className="grid gap-5 md:grid-cols-3"><p className="rounded-[22px] bg-white p-7 leading-8">نقلل التعقيد حيث لا يضيف قيمة.</p><p className="rounded-[22px] bg-white p-7 leading-8">نحمي الثقة والبيانات في كل قرار.</p><p className="rounded-[22px] bg-white p-7 leading-8">نترك مساحة للتوسع والتغيير القادم.</p></div></PageSection>
    <PageCta title="حوّل التقنية إلى ميزة تشغيلية." />
  </SitePage>
}
