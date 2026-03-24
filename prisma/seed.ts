import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    id: "sculptural-tote",
    title: "The Sculptural Tote",
    category: "Bags",
    price: 1250,
    description:
      "Handcrafted in Italy from the finest Veau Grainé leather. Features architectural lines and a sculptural silhouette that redefines the classic tote.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCngS3ubhh9aUPpstL2V9FC_P4zs5mg94CMA1etg4IXauWDDULoXi9Isk470RJDARk6BPeUTSsN8jc4I5RNxSaHLJnC_xf-QidprvPKO196IG2MgUgOXQiLgXVUAx8CPuPZk-zZNP91jFkbXtyW_1u-kghgn048_T8Ah32E4W6SLB38bsu5pB6lvVtZnpPiODoDPiSwqyccvY_4NG6E_P08TZwo9vhykEJyiX6tZsR0J08m1L3F56QbU1Z9RR6j-ZF-x1QAlAyjRyz7",
  },
  {
    id: "linear-frame",
    title: "Linear Frame 01",
    category: "Eyewear",
    price: 340,
    description:
      "Minimalist eyewear crafted from clear acetate. Japanese hinges and Carl Zeiss lenses ensure both style and function.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMcogWnvTLI0yb4AZOk-GvZ2d8BIGQ4KUhZIuzac3G0RKmcnSJ80eGRX_VF9E8xSm-YgrSc19GXTczh_xH1O6J-dfovZPhoojGf2_SB7Vyt9kuYpSGngbDJ97uTPccyBLQWFeglBqgbdvH9eKJyPdCBZzRjckQ6AW-7NU42ApIRihQ6316GqD9uu1trPiq8jpA-KRxgcPQDBkJBcW4eBf7G0S4dFiUYSmgNx5KP_krOjuHLzA2YAssH2BHfjiLjt061L6AESHIPGme",
  },
  {
    id: "temporal-watch",
    title: "Temporal Watch",
    category: "Timepieces",
    price: 580,
    description:
      "Swiss automatic movement housed in a brushed steel case. Minimal dial design with precise timekeeping.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCy6PdaKdrHaP-Lnkln5UwG75vIIgxkZ53X-bpsR-bAOf1aLP0A0sx9XTkGIWhO-Wh3fCWIR3FG8tPfHnNXI96x5h_OAyPJQUhridyPBXpOF45jvcm20enay2LfJfCYijPfRoTRxQautLsmoBf4ZImmolpJq9bnyFpf-JTNIegqK0VhDyO9G_9Ow2BD80sRwrap3ZKvJoZqdmQ4pt5_EgbrMVIchbX-dfql_FZZXlX1iJ_SP_45lOByTk3zVKp84gtjHo70tun0qN5t",
  },
  {
    id: "velocity-low-top",
    title: "Velocity Low Top",
    category: "Footwear",
    price: 210,
    description:
      "Performance meets design in this modern interpretation of the classic sneaker. Premium materials throughout.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuByhxAsuMYI3Wd3T4h2dXqgildvbGl1qnWEtx4qYEo39NpFKRH_mXC70TU4YiKr0_bXs9ltejJMkc7kkbD8iDCqWK1IyKevGE7R-5C5Bg20GtdqD4lepS65ATDMXXPeMReM0lJxAWnA3UVPWKGIg3sE3E7Uw97CwvJH_nlipTGDFdlU9vpArphFSwlkPSsKILmzeaGHJYevzO9g1JClPhw0Xxzmvda0rJnKYfN9y6-vbt_E80WX3cM7g3Ab_-ZKb62IXk6PhfspA22f",
  },
  {
    id: "acoustic-mkii",
    title: "Acoustic MKII",
    category: "Audio",
    price: 450,
    description:
      "Studio-grade headphones with exceptional clarity. Handcrafted wooden accents and premium leather cushioning.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKiYvXHpxuwEBNKtzx5V_4OxKrzVHde1hZzervtq3pLCOacsAGxQqql7CVf-37TXPqWxLCZBAeFCHC5Eo4KmnRnvU42EgEzErVyhw2NX97MZEFR0r2ugOMIFwwHJZeb0nou_w2dIEsHYU49ZWiTtx5whRSsavb1SzQsrG41ISwmzhRUrjSj-xzf58UZRP5ru5a0_npaypeQIunte-rdJtJXlAcYSo3yTRRtm9aN5VJfghLQg_olusK3ykJSLCw4dWcMEya_joQti_8",
  },
  {
    id: "canvas-ox-70",
    title: "Canvas Ox 70",
    category: "Footwear",
    price: 95,
    description:
      "An icon, reimagined. Durable canvas upper with vulcanized sole for timeless everyday wear.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAszevgVGl18ViGCGcvUzfbeRPXakBIyQ1dW3SCG5ENrz5zAICCnAKU6ruWxRqSmKHxDzdGOdcK9tpJU34FwYWd9jkFPpxMua6XzUp2Soaztoh2D610keTK6zJpQ7EYCWbP3ia7E2rDPF-fCNilSj_cRyIyaA2nh3V8FMPTQaO0kjcnceW1WsWUWAeERTVmWOIX8Z5eR_5vxjsAxEyfwjhyK6bnoRMZlp0S0ZrOzeQ2-kK7xrRxKf-D4t7gS_WR_EUdc9gsOgq-pkTh",
  },
  {
    id: "cylindrical-vase",
    title: "Cylindrical Vase",
    category: "Objects",
    price: 125,
    description:
      "A hand-finished ceramic vase with strict geometry and soft texture for interior statements.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZSVg4tygjvoGAuBVKzhOMwIv0EtSj8cjVWsew1pBvsxqHi0WIdeudysFToH5xFUUaZLu5QDbxx_rlB1L4qp3y_gS8JWWIPGoCjKnGROCMRb5KKwyXTwGzpbuRJXt5ZxlV5m4oXxxUUCauqb7I7XEKfLmHRvXpUOQ2heYY4fpmknT4E74VipdyLQXZ3uawI8pf72f94W-w339w2XQoDPvl7egngOFhBVJG1jEX98Or9Gh8NJk4Sm3MieFfUkm4-uhGHNqWE1dJnhyZ",
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
