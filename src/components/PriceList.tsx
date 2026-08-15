import { Users, Heart, MessageCircle, Play, Check, Star, Crown } from 'lucide-react';
import type { Package, ServiceType } from '@/types';
import { packages, serviceMeta } from '@/data/packages';

const iconMap: Record<ServiceType, typeof Users> = {
  followers: Users,
  likes: Heart,
  comments: MessageCircle,
  views: Play,
};

interface PriceListProps {
  service: ServiceType;
  onAdd: (pkg: Package) => void;
}

export default function PriceList({ service, onAdd }: PriceListProps) {
  const meta = serviceMeta[service];
  const Icon = iconMap[service];
  const items = packages.filter((p) => p.service === service);

  return (
    <section id={service} className="scroll-mt-20 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} shadow-lg`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{meta.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{meta.tagline}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
                pkg.bestValue
                  ? 'border-pink-500/50 bg-gradient-to-b from-pink-500/10 to-transparent shadow-lg shadow-pink-500/10'
                  : pkg.popular
                  ? 'border-white/20 bg-white/5'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              {(pkg.popular || pkg.bestValue) && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                      pkg.bestValue
                        ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg shadow-pink-500/40'
                        : 'bg-white/10 text-pink-300'
                    }`}
                  >
                    {pkg.bestValue ? (
                      <>
                        <Crown className="h-3 w-3" /> Best Value
                      </>
                    ) : (
                      <>
                        <Star className="h-3 w-3 fill-current" /> Popular
                      </>
                    )}
                  </span>
                </div>
              )}

              <div className="mb-4 mt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                  {pkg.label}
                </div>
                <div className="mt-1 text-3xl font-extrabold text-white">
                  {pkg.quantity.toLocaleString('en-US')}
                </div>
                <div className="text-xs text-slate-400">{service}</div>
              </div>

              <div className="mb-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">Rp {pkg.price.toLocaleString('id-ID')}</span>
                  <span className="text-[10px] text-slate-400">
                    / Rp {Math.round(pkg.price / pkg.quantity).toLocaleString('id-ID')} per pcs
                  </span>
                </div>
              </div>

              <ul className="mb-5 space-y-2 text-xs text-slate-300">
                {pkg.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onAdd(pkg)}
                className={`mt-auto w-full rounded-xl py-2.5 text-sm font-semibold transition-all active:scale-95 ${
                  pkg.bestValue
                    ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
