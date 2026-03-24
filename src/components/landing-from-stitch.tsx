import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Integrasi Cepat",
    description:
      "Hubungkan ribuan aplikasi yang Anda gunakan setiap hari dalam hitungan menit tanpa kode.",
  },
  {
    title: "Analitik Real-time",
    description:
      "Dapatkan wawasan mendalam tentang performa proyek dengan visualisasi data yang presisi.",
  },
  {
    title: "Keamanan Data",
    description:
      "Perlindungan tingkat enterprise untuk memastikan semua aset intelektual Anda tetap aman dan privat.",
  },
];

const steps = [
  {
    title: "Hubungkan",
    description:
      "Impor data dan tim Anda dari platform manapun dengan satu klik mudah.",
  },
  {
    title: "Otomatisasikan",
    description:
      "Biarkan kecerdasan buatan kami menangani tugas repetitif dan alur kerja rutin.",
  },
  {
    title: "Pantau",
    description:
      "Lihat kemajuan secara langsung melalui dashboard pusat yang intuitif.",
  },
];

export function LandingFromStitch() {
  return (
    <div className="bg-slate-50 text-slate-900">
      <nav className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <span className="text-xl font-extrabold tracking-tight">Stitch Project</span>

          <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <Link href="#fitur" className="text-indigo-600">
              Fitur
            </Link>
            <Link
              href="#proses"
              className="text-slate-600 transition-colors hover:text-indigo-600"
            >
              Proses
            </Link>
            <Link
              href="#cta"
              className="text-slate-600 transition-colors hover:text-indigo-600"
            >
              Solusi
            </Link>
          </div>

          <Button className="bg-indigo-600 hover:bg-indigo-700">Mulai Gratis</Button>
        </div>
      </nav>

      <main className="pt-20">
        <section className="px-6 py-24 lg:px-12" id="hero">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-6 h-12 w-0.5 bg-indigo-700" />
              <p className="mb-4 text-xs font-bold tracking-[0.05em] text-indigo-700">
                KOLABORASI TANPA BATAS
              </p>
              <h1 className="mb-6 text-5xl leading-tight font-extrabold tracking-tight">
                Sederhanakan Kompleksitas Proyek Anda.
              </h1>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-600">
                Stitch Project menyatukan tim, tugas, dan tenggat waktu dalam satu
                alur kerja yang mulus. Didesain untuk presisi, dibangun untuk skala
                besar.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-indigo-700 to-indigo-600 px-8 py-6 text-base hover:opacity-90">
                  Mulai Gratis Sekarang
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-300 px-8 py-6 text-base text-indigo-700"
                >
                  Jelajahi Solusi Kami
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-8 rounded-full bg-indigo-600/15 blur-3xl" />
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqg0iGS95VuMCyIUmf0B7-KynX7peBFLf9AfEcdto2fglkZ0b7zuM4w5zKBbTZFfqkmhqvXnJrjczPDSYQIDgDCMH19DLV149cMwICRySh6vRIU_jTymZ54Tsr8g14IqIc1FCpvafYjQlTdXCBbNZgfy8eU4p6jqO2YZrEFqWkzcsGLQVxgJsSxp_YsmTpEmBn4JB3mgYNLrsDe1Y_iJ7aaQLG4wQExg1OTmTvMZc_aAOYPWh6o2-X41aEHX1INc0xLKguKAC_ffyr"
                alt="Dashboard project management"
                width={1100}
                height={700}
                className="relative z-10 rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-100 px-6 py-28" id="fitur">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-bold tracking-[0.05em] text-indigo-700">
                FITUR UTAMA
              </p>
              <h2 className="text-4xl font-bold tracking-tight">
                Solusi Tailor-Made untuk Tim Anda
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-xl bg-white p-10 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
                    ●
                  </div>
                  <h3 className="mb-4 text-xl font-bold">{feature.title}</h3>
                  <p className="leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-28" id="proses">
          <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row">
            <div className="lg:w-1/3">
              <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight">
                Proses yang Sederhana, Hasil yang Luar Biasa.
              </h2>
              <p className="text-slate-600">
                Kami menghilangkan hambatan teknis sehingga Anda dapat fokus pada
                apa yang benar-benar penting bagi bisnis Anda.
              </p>
            </div>

            <div className="grid flex-1 gap-12 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="relative pt-8">
                  <span className="absolute -top-6 -left-2 text-7xl font-extrabold text-slate-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mb-3 text-xl font-bold">{step.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24" id="cta">
          <div className="mx-auto max-w-7xl rounded-xl bg-gradient-to-r from-indigo-700 to-indigo-600 px-8 py-16 text-center text-white md:px-16">
            <h2 className="mb-6 text-4xl font-bold tracking-tight">
              Siap untuk Meningkatkan Efisiensi?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-indigo-100">
              Bergabunglah dengan ribuan tim yang telah mentransformasi cara mereka
              bekerja dengan Stitch Project.
            </p>
            <Button className="bg-white px-8 py-6 text-base font-bold text-indigo-700 hover:bg-slate-100">
              Mulai Sekarang
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <div>
            <p className="text-lg font-bold">Stitch Project</p>
            <p className="text-sm text-slate-500">
              © 2026 Stitch Project. Hak Cipta Dilindungi.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-indigo-600">
              Tentang Kami
            </Link>
            <Link href="#" className="hover:text-indigo-600">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="hover:text-indigo-600">
              Syarat & Ketentuan
            </Link>
            <Link href="#" className="hover:text-indigo-600">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
