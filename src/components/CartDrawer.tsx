import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import type { CartItem } from '@/types';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  open,
  items,
  onClose,
  onInc,
  onDec,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = items.reduce((s, i) => s + i.pkg.price * i.qty, 0);
  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-slate-950 shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-pink-400" />
            <h2 className="text-lg font-bold text-white">Keranjang Belanja</h2>
            {totalItems > 0 && (
              <span className="rounded-full bg-pink-500/20 px-2 py-0.5 text-xs font-semibold text-pink-300">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
              <ShoppingCart className="h-8 w-8 text-slate-500" />
            </div>
            <p className="text-slate-400 font-medium">Keranjang Anda kosong.</p>
            <p className="text-xs text-slate-500">Pilih salah satu paket di bawah untuk ditambahkan.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <div
                  key={item.pkg.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold capitalize text-white">
                        {item.pkg.quantity.toLocaleString('en-US')} {item.pkg.service}
                      </div>
                      <div className="text-xs text-slate-400">{item.pkg.label} package</div>
                      <div className="mt-1 text-sm font-bold text-pink-400">
                        Rp {(item.pkg.price * item.qty).toLocaleString('id-ID')}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(item.pkg.id)}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => onDec(item.pkg.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-white">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onInc(item.pkg.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                    <span className="ml-auto text-xs text-slate-500">
                      Rp {item.pkg.price.toLocaleString('id-ID')} / pcs
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-slate-400">Subtotal</span>
                <span className="text-xl font-bold text-white">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:shadow-pink-500/50 active:scale-95"
              >
                Lanjut ke Pembayaran
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
