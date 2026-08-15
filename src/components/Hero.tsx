import { Star, ShieldCheck, Zap, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-fuchsia-600/30 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            Trusted by 50,000+ creators worldwide
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Grow your Instagram
            <span className="block bg-gradient-to-r from-fuchsia-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              faster than ever
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Beli followers, likes, comments, dan views Instagram berkualitas tinggi
            dengan harga terjangkau. Pengiriman cepat, aman, dan bergaransi.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#followers"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-pink-500/30 transition-all hover:shadow-pink-500/50 active:scale-95"
            >
              Lihat Price List
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#faq"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Cara Kerja
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
            {[
              { icon: Zap, value: '1-5 min', label: 'Mulai cepat' },
              { icon: ShieldCheck, value: '100%', label: 'Aman & garansi' },
              { icon: Star, value: '4.9/5', label: 'Rating pelanggan' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <s.icon className="h-5 w-5 text-pink-400" />
                <div className="text-xl font-bold text-white sm:text-2xl">{s.value}</div>
                <div className="text-xs text-slate-400 sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
