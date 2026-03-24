"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export function HomePage() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null);

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterLoading(true);
    setNewsletterMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (!response.ok) {
        setNewsletterMessage("Subscription failed. Please use a valid email.");
        return;
      }

      setNewsletterEmail("");
      setNewsletterMessage("Thanks for subscribing to the Atelier.");
    } catch {
      setNewsletterMessage("Unable to subscribe right now. Please try again.");
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[921px] w-full flex items-center overflow-hidden px-12">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2FbVTbQUWQESYlzEHXsKncU1ydz6o2Pz8vtCRlR5eSYGg_ArqcLMWKDnnlBsS7YioreAG_oX7UL9Ny-n-bLXvhhjCnwX5Ah2KivSsh38ownuW9YjyzQE3z9Etb69QVw6vt3zvDABUkfyT0XjdIwT5RjP3oNrAA3bKagQG57znm0-rsA6iSkwBeu_845A4LYmT03pFmjD8VERGwcSNoAYcmeyQEbXC5seLoY45bcheChjgDpcdp4bwYG1hH8q8xEk5NxH19cPcKyui"
              alt="Minimalist fashion editorial photography"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-2xl">
            <p className="font-label text-[10px] uppercase tracking-[0.3rem] text-primary mb-6">
              Spring / Summer 2024
            </p>
            <h1 className="font-headline text-7xl md:text-8xl font-extrabold tracking-tighter text-inverse-surface leading-none mb-8">
              FORM <br /> &amp; FUNCTION
            </h1>
            <p className="font-body text-lg text-secondary mb-10 max-w-md leading-relaxed">
              A curated selection of archival pieces and modern essentials designed for the
              discerning minimalist.
            </p>
            <div className="flex gap-4">
              <Link
                href="/collections"
                className="bg-primary hover:bg-primary-dim text-on-primary px-10 py-5 font-label text-xs uppercase tracking-widest transition-all"
              >
                Explore Collection
              </Link>
              <Link
                href="/editorial"
                className="border border-outline-variant/30 hover:bg-surface-container-lowest text-inverse-surface px-10 py-5 font-label text-xs uppercase tracking-widest transition-all"
              >
                View Editorial
              </Link>
            </div>
          </div>
        </section>

        {/* Trending Items */}
        <section className="py-32 px-12 bg-surface">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-headline text-4xl font-bold tracking-tight text-inverse-surface">
                Trending Now
              </h2>
              <div className="h-1 w-12 bg-primary mt-4"></div>
            </div>
            <Link
              href="/objects"
              className="font-label text-xs uppercase tracking-widest border-b border-primary pb-1"
            >
              See All Objects
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <Link href="/product/sculptural-tote" className="md:col-span-7 group cursor-pointer">
              <div className="overflow-hidden bg-surface-container-low mb-6 aspect-[4/5] relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCngS3ubhh9aUPpstL2V9FC_P4zs5mg94CMA1etg4IXauWDDULoXi9Isk470RJDARk6BPeUTSsN8jc4I5RNxSaHLJnC_xf-QidprvPKO196IG2MgUgOXQiLgXVUAx8CPuPZk-zZNP91jFkbXtyW_1u-kghgn048_T8Ah32E4W6SLB38bsu5pB6lvVtZnpPiODoDPiSwqyccvY_4NG6E_P08TZwo9vhykEJyiX6tZsR0J08m1L3F56QbU1Z9RR6j-ZF-x1QAlAyjRyz7"
                  alt="Luxury leather handbag"
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline text-xl font-bold">The Sculptural Tote</h3>
                  <p className="font-label text-sm text-secondary">Veau Grainé Leather</p>
                </div>
                <span className="font-body text-lg">$1,250</span>
              </div>
            </Link>
            <div className="md:col-span-5 flex flex-col gap-10">
              <Link href="/product/linear-frame" className="group cursor-pointer">
                <div className="overflow-hidden bg-surface-container-low mb-6 aspect-square relative">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMcogWnvTLI0yb4AZOk-GvZ2d8BIGQ4KUhZIuzac3G0RKmcnSJ80eGRX_VF9E8xSm-YgrSc19GXTczh_xH1O6J-dfovZPhoojGf2_SB7Vyt9kuYpSGngbDJ97uTPccyBLQWFeglBqgbdvH9eKJyPdCBZzRjckQ6AW-7NU42ApIRihQ6316GqD9uu1trPiq8jpA-KRxgcPQDBkJBcW4eBf7G0S4dFiUYSmgNx5KP_krOjuHLzA2YAssH2BHfjiLjt061L6AESHIPGme"
                    alt="Minimalist eyewear"
                    fill
                    sizes="(min-width: 768px) 34vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline text-lg font-bold">Linear Frame 01</h3>
                    <p className="font-label text-xs text-secondary">Clear Acetate</p>
                  </div>
                  <span className="font-body text-md">$340</span>
                </div>
              </Link>
              <Link href="/product/temporal-watch" className="group cursor-pointer">
                <div className="overflow-hidden bg-surface-container-low mb-6 aspect-square relative">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy6PdaKdrHaP-Lnkln5UwG75vIIgxkZ53X-bpsR-bAOf1aLP0A0sx9XTkGIWhO-Wh3fCWIR3FG8tPfHnNXI96x5h_OAyPJQUhridyPBXpOF45jvcm20enay2LfJfCYijPfRoTRxQautLsmoBf4ZImmolpJq9bnyFpf-JTNIegqK0VhDyO9G_9Ow2BD80sRwrap3ZKvJoZqdmQ4pt5_EgbrMVIchbX-dfql_FZZXlX1iJ_SP_45lOByTk3zVKp84gtjHo70tun0qN5t"
                    alt="Premium minimalist watch"
                    fill
                    sizes="(min-width: 768px) 34vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline text-lg font-bold">Temporal Watch</h3>
                    <p className="font-label text-xs text-secondary">Silver / Steel</p>
                  </div>
                  <span className="font-body text-md">$580</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Signature Overlap */}
        <section className="relative py-24 px-12 flex justify-end">
          <div className="w-full md:w-4/5 relative">
            <div className="relative w-full h-[600px]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJFe7cvJONlUdBP6drXZNByplpQg3DdDnzebLqj2YzflO2LQih-jB5qRT6GsBE5fA2ONOB_DBA4ZXHliE4D4dx4M0u2t9xpDkMkTqGUgixkAKyns2emYA8iDkiCh9171k676DVp-FG_2QZ_G1ob4weowXJvmWXl6NkkIT_nNlrLJqMBOmf4J47yrlSw-o2Gq203Htx21fxyzuj5zOCT1FrYRUHql4OANde5fG9J5kZnm77GRu7LN4LHT1mdS2gSJNKzVom43ywWKTV"
                alt="Fashion model in monochromatic clothing"
                fill
                sizes="(min-width: 768px) 80vw, 100vw"
                className="object-cover grayscale brightness-90"
              />
            </div>
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 max-w-xl bg-surface-container-lowest p-16 shadow-2xl">
              <h2 className="font-headline text-5xl font-extrabold tracking-tighter text-inverse-surface mb-6 leading-tight">
                THE MODERN <br /> UNIFORM
              </h2>
              <p className="font-body text-secondary leading-relaxed mb-8">
                Our SS24 collection redefines the everyday essentials through a lens of
                architectural precision and tactile luxury. Each piece is a testament to the
                beauty of restraint.
              </p>
              <Link
                href="/editorial/modern-uniform"
                className="font-label text-xs uppercase tracking-[0.2rem] text-primary font-bold border-b-2 border-primary pb-2"
              >
                Discover the Story
              </Link>
            </div>
          </div>
        </section>

        {/* Curator's Choice */}
        <section className="py-32 bg-surface-container-low px-12">
          <div className="text-center mb-24">
            <p className="font-label text-[10px] uppercase tracking-[0.4rem] text-secondary mb-4">
              Selected Works
            </p>
            <h2 className="font-headline text-5xl font-bold tracking-tight text-inverse-surface">
              Curator&apos;s Choice
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              {
                id: "velocity-low-top",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByhxAsuMYI3Wd3T4h2dXqgildvbGl1qnWEtx4qYEo39NpFKRH_mXC70TU4YiKr0_bXs9ltejJMkc7kkbD8iDCqWK1IyKevGE7R-5C5Bg20GtdqD4lepS65ATDMXXPeMReM0lJxAWnA3UVPWKGIg3sE3E7Uw97CwvJH_nlipTGDFdlU9vpArphFSwlkPSsKILmzeaGHJYevzO9g1JClPhw0Xxzmvda0rJnKYfN9y6-vbt_E80WX3cM7g3Ab_-ZKb62IXk6PhfspA22f",
                category: "Footwear",
                title: "Velocity Low Top",
                price: "$210",
                offset: "",
              },
              {
                id: "acoustic-mkii",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKiYvXHpxuwEBNKtzx5V_4OxKrzVHde1hZzervtq3pLCOacsAGxQqql7CVf-37TXPqWxLCZBAeFCHC5Eo4KmnRnvU42EgEzErVyhw2NX97MZEFR0r2ugOMIFwwHJZeb0nou_w2dIEsHYU49ZWiTtx5whRSsavb1SzQsrG41ISwmzhRUrjSj-xzf58UZRP5ru5a0_npaypeQIunte-rdJtJXlAcYSo3yTRRtm9aN5VJfghLQg_olusK3ykJSLCw4dWcMEya_joQti_8",
                category: "Audio",
                title: "Acoustic MKII",
                price: "$450",
                offset: "translate-y-12",
              },
              {
                id: "canvas-ox-70",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAszevgVGl18ViGCGcvUzfbeRPXakBIyQ1dW3SCG5ENrz5zAICCnAKU6ruWxRqSmKHxDzdGOdcK9tpJU34FwYWd9jkFPpxMua6XzUp2Soaztoh2D610keTK6zJpQ7EYCWbP3ia7E2rDPF-fCNilSj_cRyIyaA2nh3V8FMPTQaO0kjcnceW1WsWUWAeERTVmWOIX8Z5eR_5vxjsAxEyfwjhyK6bnoRMZlp0S0ZrOzeQ2-kK7xrRxKf-D4t7gS_WR_EUdc9gsOgq-pkTh",
                category: "Footwear",
                title: "Canvas Ox 70",
                price: "$95",
                offset: "",
              },
              {
                id: "cylindrical-vase",
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZSVg4tygjvoGAuBVKzhOMwIv0EtSj8cjVWsew1pBvsxqHi0WIdeudysFToH5xFUUaZLu5QDbxx_rlB1L4qp3y_gS8JWWIPGoCjKnGROCMRb5KKwyXTwGzpbuRJXt5ZxlV5m4oXxxUUCauqb7I7XEKfLmHRvXpUOQ2heYY4fpmknT4E74VipdyLQXZ3uawI8pf72f94W-w339w2XQoDPvl7egngOFhBVJG1jEX98Or9Gh8NJk4Sm3MieFfUkm4-uhGHNqWE1dJnhyZ",
                category: "Objects",
                title: "Cylindrical Vase",
                price: "$125",
                offset: "translate-y-12",
              },
            ].map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className={`group cursor-pointer ${item.offset}`}
              >
                <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 22vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
                  {item.category}
                </p>
                <h4 className="font-headline text-lg font-bold mb-1">{item.title}</h4>
                <p className="font-body text-sm text-secondary">{item.price}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-48 px-12 bg-surface">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-4xl mb-8 text-primary">
              mail_outline
            </span>
            <h2 className="font-headline text-5xl font-bold tracking-tight text-inverse-surface mb-6">
              Join the Atelier
            </h2>
            <p className="font-body text-secondary text-lg mb-12 max-w-lg">
              Subscribe to receive early access to new collections, exclusive archival drops, and
              editorial stories.
            </p>
            <form className="w-full max-w-md flex flex-col gap-6" onSubmit={handleNewsletterSubmit}>
              <div className="relative">
                <label className="block font-label text-[10px] uppercase tracking-widest text-secondary mb-2 text-left">
                  Email Address
                </label>
                <input
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 transition-all py-3 px-0 font-body placeholder:text-outline-variant/50"
                  placeholder="your@email.com"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={newsletterLoading}
                className="w-full bg-inverse-surface text-background py-5 font-label text-xs uppercase tracking-[0.3rem] hover:bg-primary disabled:opacity-60 transition-colors"
              >
                {newsletterLoading ? "Subscribing..." : "Subscribe"}
              </button>
              {newsletterMessage && <p className="text-sm text-secondary">{newsletterMessage}</p>}
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
