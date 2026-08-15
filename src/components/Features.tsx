import { Zap, ShieldCheck, HeadphonesIcon, Lock, Globe } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Instant Delivery', desc: 'Pesanan mulai diproses dalam 1-5 menit setelah pembayaran dikonfirmasi.' },
  { icon: ShieldCheck, title: '100% Safe', desc: 'Tanpa password. Semua proses sesuai batas keamanan Instagram.' },
  { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Tim support siap membantu kapan pun melalui chat dan email.' },
  { icon: Lock, title: 'Secure Payment', desc: 'Pembayaran terenkripsi via SSL. Kami tidak menyimpan detail kartu Anda.' },
  { icon: Globe, title: 'Worldwide Service', desc: 'Melayani pelanggan dari seluruh dunia dengan harga kompetitif.' },
];

export default function Features() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Why choose <span className="text-pink-400">InstaBoost</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Everything you need to grow your Instagram presence safely and quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/30 hover:bg-white/5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 transition-colors group-hover:from-fuchsia-500/30 group-hover:to-pink-500/30">
                <f.icon className="h-5 w-5 text-pink-400" />
              </div>
              <h3 className="mb-1.5 text-base font-semibold text-white">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
