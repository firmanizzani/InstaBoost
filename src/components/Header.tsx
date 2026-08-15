import { ShoppingCart, Instagram, History } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onHistoryClick: () => void;
}

const navLinks = [
  { label: 'Followers', href: '#followers' },
  { label: 'Likes', href: '#likes' },
  { label: 'Comments', href: '#comments' },
  { label: 'Views', href: '#views' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header({ cartCount, onCartClick, onHistoryClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-pink-500 to-amber-400 shadow-lg shadow-pink-500/30">
            <Instagram className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Insta<span className="text-pink-400">Boost</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <button
            onClick={onHistoryClick}
            className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-2 text-sm font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white active:scale-95"
            title="Riwayat Transaksi"
          >
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Riwayat</span>
          </button>

          <button
            onClick={onCartClick}
            className="relative flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/20 active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Keranjang</span>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-xs font-bold text-white shadow-lg shadow-pink-500/50">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
