import { X, Calendar, User, ShoppingBag, CreditCard, Trash2, CheckCircle2, Clock } from 'lucide-react';

interface HistoryModalProps {
  open: boolean;
  onClose: () => void;
}

interface TransactionItem {
  name: string;
  qty: number;
  price: number;
}

interface Transaction {
  id: string;
  username: string;
  email: string;
  items: TransactionItem[];
  total: number;
  paymentMethod: string;
  status: 'Pending' | 'Diproses' | 'Selesai';
  date: string;
}

export default function HistoryModal({ open, onClose }: HistoryModalProps) {
  if (!open) return null;

  const getTransactions = (): Transaction[] => {
    try {
      const data = localStorage.getItem('instaboost_transactions');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const transactions = getTransactions().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const clearHistory = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua riwayat transaksi?')) {
      localStorage.removeItem('instaboost_transactions');
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-white">Riwayat Transaksi</h2>
            <p className="text-xs text-slate-400">Pembelian yang Anda lakukan di perangkat ini</p>
          </div>
          <div className="flex items-center gap-3">
            {transactions.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-400 transition-colors hover:bg-rose-500/10"
                title="Hapus Semua Riwayat"
              >
                <Trash2 className="h-4 w-4" />
                Hapus
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
              <ShoppingBag className="mb-3 h-12 w-12 text-slate-600 animate-pulse" />
              <p className="font-semibold">Belum Ada Transaksi</p>
              <p className="text-xs text-slate-500 mt-1">Transaksi Anda akan muncul di sini setelah pembayaran sukses.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-pink-400 font-bold bg-pink-500/10 px-2 py-0.5 rounded">
                        #{tx.id}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="h-3 w-3" />
                        {new Date(tx.date).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-300 bg-white/5 px-2 py-0.5 rounded">
                        <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                        {tx.paymentMethod.toUpperCase()}
                      </span>
                      <span
                        className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold ${
                          tx.status === 'Selesai'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : tx.status === 'Diproses'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-blue-500/10 text-blue-400'
                        }`}
                      >
                        {tx.status === 'Selesai' ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3 animate-spin" />
                        )}
                        {tx.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                        <User className="h-4 w-4 text-pink-400" />
                        <span>@{tx.username}</span>
                      </div>
                      <div className="space-y-1 pl-5">
                        {tx.items.map((item, idx) => (
                          <div key={idx} className="text-xs text-slate-300">
                            {item.qty}x {item.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Total Pembayaran</div>
                      <div className="text-lg font-extrabold text-white">
                        Rp {tx.total.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
