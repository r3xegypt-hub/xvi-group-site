import usePageMeta from '../hooks/usePageMeta'
import { PageCta, PageSection, SitePage } from '../components/common'

const services: [string, string, string, string[]][] = [
  ['01', 'الاستشارات الإدارية', 'استراتيجية، نماذج تشغيل، وحوكمة تُترجم طموح المؤسسة إلى أولويات قابلة للقياس.', ['تشخيص تنفيذي', 'خارطة طريق', 'نموذج حوكمة']],
  ['02', 'الاستشارات التقنية', 'قرارات تقنية تستند إلى احتياجات الأعمال، من المعمارية إلى خارطة التحديث والتنفيذ.', ['معمارية مستهدفة', 'تقييم المنصات', 'خطة انتقال']],
  ['03', 'تحول الذكاء الاصطناعي', 'برنامج AI مسؤول يربط حالات الاستخدام بالبيانات والقدرات والحوكمة.', ['استراتيجية AI', 'حالات استخدام', 'ضوابط تشغيل']],
  ['04', 'التطوير التنفيذي', 'تمكين القادة والفرق من إدارة التحول بلغة عملية وإيقاع ثابت.', ['ورش قيادة', 'تمكين فرق', 'إدارة التغيير']],
]
export default function ServicesPage() {
  usePageMeta({ title: 'الخدمات — XVI Group', description: 'استشارات إدارية وتقنية وتحول ذكاء اصطناعي وتطوير تنفيذي للمؤسسات.', canonical: 'https://xvi-group.net/services', schemaType: 'CollectionPage' })
  return <SitePage crumb="الخدمات" eyebrow="XVI / SERVICES" title={<>خدمات مصممة<br />حول القرار.</>} description="نمزج بين التفكير الاستراتيجي والحرفة التقنية لتتحول المبادرات الكبيرة إلى قدرة تشغيلية دائمة." ctaLabel="ناقش أولوياتك" ctaPath="/contact">
    <PageSection eyebrow="CAPABILITIES" title="أربع ممارسات. غرفة قيادة واحدة."><ol className="xvi-practice-ledger">{services.map(([number, title, text, deliverables]) => <li key={number}><div className="xvi-practice-number">{number}</div><article><div className="xvi-practice-title"><h3>{title}</h3><span aria-hidden="true">↙</span></div><p>{text}</p><ul>{deliverables.map(item => <li key={item}>{item}</li>)}</ul></article></li>)}</ol></PageSection>
    <PageSection tone="paper" eyebrow="METHODOLOGY" title="نبدأ بالواقع، ونصل إلى الأثر."><div className="grid gap-4 md:grid-cols-4">{[['01','اكتشاف','نفهم القرار، القيود، والفرص.'],['02','تصميم','نبني خيارات واضحة ومعايير الاختيار.'],['03','تنفيذ','نضع الفرق والتقنية في إيقاع واحد.'],['04','تثبيت','نقيس الأثر وننقل القدرة للداخل.']].map(([n,t,d]) => <div key={n} className="border-t border-[color:var(--color-xvi-bronze)] pt-5"><span className="text-xs text-[color:var(--color-xvi-bronze)]">{n}</span><h3 className="mt-5 text-2xl font-semibold">{t}</h3><p className="mt-3 text-sm leading-7 text-[color:var(--color-xvi-ink-soft)]">{d}</p></div>)}</div></PageSection>
    <PageSection tone="navy" eyebrow="OUTCOMES" title="مخرجات يفهمها مجلس الإدارة ويستخدمها فريق التنفيذ."><div className="grid gap-5 md:grid-cols-3 text-white/75"><p>رؤية موحدة ومقاييس ذات معنى.</p><p>خطة تنفيذ لها مالكون وتبعيات واضحة.</p><p>قدرة داخلية تستمر بعد انتهاء المشروع.</p></div></PageSection>
    <PageCta title="اجعل المبادرة الكبيرة قابلة للتنفيذ." />
  </SitePage>
}
