import usePageMeta from '../hooks/usePageMeta'
import { PageCta, PageSection, SitePage } from '../components/common'

const industries = [
  ['التصنيع', 'سلاسل قيمة أكثر رؤية، وعمليات إنتاج أكثر مرونة.'], ['الرعاية الصحية', 'تجارب موثوقة وآمنة للمرضى والفرق والبيانات.'], ['القطاع الحكومي', 'خدمات عامة تربط الطموح الوطني بالأثر اليومي.'], ['الخدمات المالية', 'ثقة رقمية، امتثال ذكي، وتجارب عميل أكثر دقة.'], ['الطاقة', 'معلومات تشغيلية تدعم الاستدامة واستمرارية الأعمال.'], ['التعليم', 'نماذج تعلم وعمليات مؤسسية مهيأة للمستقبل.'], ['التجزئة', 'قرارات أقرب للعميل عبر البيانات والأتمتة.'],
]
export default function IndustriesPage() {
  usePageMeta({ title: 'القطاعات — XVI Group', description: 'خبرة XVI Group عبر التصنيع والرعاية الصحية والحكومة والمالية والطاقة والتعليم والتجزئة.', canonical: 'https://xvi-group.net/industries', schemaType: 'CollectionPage' })
  return <SitePage crumb="القطاعات" eyebrow="XVI / INDUSTRIES" title={<>عمق قطاعي.<br />منظور مؤسسي.</>} description="نعرف أن التحول لا يحدث في فراغ. لذلك نبدأ بإيقاع القطاع، ومتطلباته التنظيمية، والواقع التشغيلي لفرقك." ctaLabel="اعرض تحديك" ctaPath="/contact">
    <PageSection eyebrow="SECTOR EXPERTISE" title="حلول تتحدث لغة السوق."><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{industries.map(([name, text], index) => <article key={name} className="group min-h-56 rounded-[26px] border border-[color:var(--color-xvi-line)] bg-white/65 p-7 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(11,15,20,.08)]"><div className="text-xs tracking-[.2em] text-[color:var(--color-xvi-bronze)]">SECTOR 0{index + 1}</div><h3 className="mt-14 text-3xl font-semibold tracking-[-.045em]">{name}</h3><p className="mt-4 leading-8 text-[color:var(--color-xvi-ink-soft)]">{text}</p></article>)}</div></PageSection>
    <PageSection tone="navy" eyebrow="HOW WE ENGAGE" title="نعرف النظام، ثم نعيد ترتيب الاحتمالات."><div className="grid gap-7 md:grid-cols-3 text-white/70"><div><h3 className="text-xl text-white">سياق دقيق</h3><p className="mt-3 leading-8">نقرأ المتطلبات التنظيمية وعلاقات أصحاب المصلحة قبل تصميم الحل.</p></div><div><h3 className="text-xl text-white">تدخل مناسب</h3><p className="mt-3 leading-8">نوازن بين السرعة، المخاطر، والطموح دون وصفة جاهزة.</p></div><div><h3 className="text-xl text-white">أثر قابل للإثبات</h3><p className="mt-3 leading-8">نربط التقدم بمقاييس تشغيلية ومالية يفهمها الجميع.</p></div></div></PageSection>
    <PageCta title="ابنِ ميزة تناسب قطاعك." />
  </SitePage>
}
