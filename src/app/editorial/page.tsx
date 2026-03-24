import { PageTemplate } from "@/components/layout/page-template";
import Image from "next/image";
import Link from "next/link";

export default function EditorialPage() {
  const articles = [
    {
      id: "modern-uniform",
      title: "The Modern Uniform",
      excerpt: "Our SS24 collection redefines the everyday essentials through a lens of architectural precision.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJFe7cvJONlUdBP6drXZNByplpQg3DdDnzebLqj2YzflO2LQih-jB5qRT6GsBE5fA2ONOB_DBA4ZXHliE4D4dx4M0u2t9xpDkMkTqGUgixkAKyns2emYA8iDkiCh9171k676DVp-FG_2QZ_G1ob4weowXJvmWXl6NkkIT_nNlrLJqMBOmf4J47yrlSw-o2Gq203Htx21fxyzuj5zOCT1FrYRUHql4OANde5fG9J5kZnm77GRu7LN4LHT1mdS2gSJNKzVom43ywWKTV",
      date: "March 2024",
    },
  ];

  return (
    <PageTemplate title="Editorial" subtitle="Stories & Journal">
      <div className="max-w-5xl mx-auto space-y-24">
        {articles.map((article) => (
          <Link key={article.id} href={`/editorial/${article.id}`} className="group block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] overflow-hidden relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">
                  {article.date}
                </p>
                <h2 className="font-headline text-4xl font-bold mb-6">{article.title}</h2>
                <p className="font-body text-secondary leading-relaxed mb-8">{article.excerpt}</p>
                <span className="font-label text-xs uppercase tracking-[0.2rem] text-primary font-bold border-b-2 border-primary pb-2">
                  Read Story
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageTemplate>
  );
}
