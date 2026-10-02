import { ProductCategory } from "@/components/sections/ProductCategory";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories, getCategories, type CategorySlug } from "@/lib/categories";

type RelatedCategoriesProps = {
  slugs: CategorySlug[];
  eyebrow?: string;
  lines?: string[];
  className?: string;
};

/** Up to three related collections, linking pages to one another. */
export function RelatedCategories({
  slugs,
  eyebrow = "Related collections",
  lines = ["Complete", "the bathroom."],
  className = "bg-ivory",
}: RelatedCategoriesProps) {
  const related = getCategories(slugs).slice(0, 3);

  return (
    <section aria-labelledby="related-heading" className={`section-y ${className}`}>
      <div className="container-site">
        <SectionHeading id="related-heading" eyebrow={eyebrow} lines={lines} />

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:mt-20 lg:grid-cols-3 lg:gap-x-10">
          {related.map((category, index) => (
            <ProductCategory
              key={category.slug}
              category={category}
              number={categories.indexOf(category) + 1}
              aspect={
                index === 2 && related.length === 3
                  ? "aspect-[3/2] lg:aspect-[4/5]"
                  : "aspect-[4/5]"
              }
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
              delay={index * 0.08}
              className={index === 2 && related.length === 3 ? "col-span-2 lg:col-span-1" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
