import usePageMeta from '../hooks/usePageMeta'
import { PageSection, SitePage } from '../components/common'

const items = [['المعلومات التي نجمعها','قد نجمع بيانات التواصل التي تقدمها عبر النماذج، وبيانات استخدام تقنية محدودة لتحسين الموقع.'],['كيف نستخدمها','نستخدم البيانات للرد على الاستفسارات، وتقديم الخدمات، وتحسين التجربة، والالتزام بالالتزامات النظامية.'],['المشاركة والحماية','لا نبيع البيانات الشخصية. نشاركها فقط عند الحاجة التشغيلية المشروعة أو إذا تطلب القانون ذلك، مع اتخاذ تدابير حماية مناسبة.'],['حقوقك','يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها، حيثما ينطبق، عبر التواصل معنا.']]
export default function PrivacyPage() {
  usePageMeta({ title: 'سياسة الخصوصية — XVI Group', description: 'سياسة خصوصية XVI Group وكيفية التعامل مع البيانات الشخصية.', canonical: 'https://xvi-group.net/privacy' })
  return <SitePage crumb="الخصوصية" eyebrow="XVI / PRIVACY" title={<>الخصوصية جزء<br />من الثقة.</>} description="توضح هذه السياسة كيف تتعامل XVI Group مع المعلومات الشخصية عند استخدام هذا الموقع أو التواصل معنا." ctaLabel="تواصل بخصوص الخصوصية" ctaPath="/contact">
    <PageSection eyebrow="PRIVACY POLICY" title="التزام واضح ومحدد."><div className="max-w-3xl space-y-8">{items.map(([title,text]) => <article key={title}><h3 className="text-2xl font-semibold">{title}</h3><p className="mt-3 leading-8 text-[color:var(--color-xvi-ink-soft)]">{text}</p></article>)}<p className="border-t border-[color:var(--color-xvi-line)] pt-6 text-sm leading-7 text-[color:var(--color-xvi-ink-soft)]">آخر تحديث: يوليو 2026. للاستفسارات المتعلقة بالخصوصية: xvi@xvi-group.net</p></div></PageSection>
  </SitePage>
}
