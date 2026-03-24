import { PageTemplate } from "@/components/layout/page-template";
import Image from "next/image";
import Link from "next/link";

export default function CollectionsPage() {
  const collections = [
    {
      id: "ss24",
      title: "Spring / Summer 2024",
      description: "Form & Function",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2FbVTbQUWQESYlzEHXsKncU1ydz6o2Pz8vtCRlR5eSYGg_ArqcLMWKDnnlBsS7YioreAG_oX7UL9Ny-n-bLXvhhjCnwX5Ah2KivSsh38ownuW9YjyzQE3z9Etb69QVw6vt3zvDABUkfyT0XjdIwT5RjP3oNrAA3bKagQG57znm0-rsA6iSkwBeu_845A4LYmT03pFmjD8VERGwcSNoAYcmeyQEbXC5seLoY45bcheChjgDpcdp4bwYG1hH8q8xEk5NxH19cPcKyui",
      items: "24 pieces",
    },
    {
      id: "modern-uniform",
      title: "The Modern Uniform",
      description: "Architectural Essentials",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJFe7cvJONlUdBP6drXZNByplpQg3DdDnzebLqj2YzflO2LQih-jB5qRT6GsBE5fA2ONOB_DBA4ZXHliE4D4dx4M0u2t9xpDkMkTqGUgixkAKyns2emYA8iDkiCh9171k676DVp-FG_2QZ_G1ob4weowXJvmWXl6NkkIT_nNlrLJqMBOmf4J47yrlSw-o2Gq203Htx21fxyzuj5zOCT1FrYRUHql4OANde5fG9J5kZnm77GRu7LN4LHT1mdS2gSJNKzVom43ywWKTV",
      items: "18 pieces",
    },
    {
      id: "curators-choice",
      title: "Curator's Selection",
      description: "Timeless Objects",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCngS3ubhh9aUPpstL2V9FC_P4zs5mg94CMA1etg4IXauWDDULoXi9Isk470RJDARk6BPeUTSsN8jc4I5RNxSaHLJnC_xf-QidprvPKO196IG2MgUgOXQiLgXVUAx8CPuPZk-zZNP91jFkbXtyW_1u-kghgn048_T8Ah32E4W6SLB38bsu5pB6lvVtZnpPiODoDPiSwqyccvY_4NG6E_P08TZwo9vhykEJyiX6tZsR0J08m1L3F56QbU1Z9RR6j-ZF-x1QAlAyjRyz7",
      items: "32 pieces",
    },
  ];

  return (
    <PageTemplate title="Collections" subtitle="Curated Selections">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.id}`}
            className="group cursor-pointer"
          >
            <div className="aspect-[3/4] overflow-hidden mb-6 relative">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
              {collection.items}
            </p>
            <h3 className="font-headline text-2xl font-bold mb-2">{collection.title}</h3>
            <p className="font-body text-sm text-secondary">{collection.description}</p>
          </Link>
        ))}
      </div>
    </PageTemplate>
  );
}
