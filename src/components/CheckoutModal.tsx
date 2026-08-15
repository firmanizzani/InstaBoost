import { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2, ArrowRight, QrCode, Landmark, AlertCircle } from 'lucide-react';
import type { CartItem } from '@/types';

interface CheckoutModalProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onComplete: () => void;
}

type PaymentStep = 'form' | 'payment_detail' | 'success';

export default function CheckoutModal({ open, items, onClose, onComplete }: CheckoutModalProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [payment, setPayment] = useState('qris');
  const [step, setStep] = useState<PaymentStep>('form');
  const [submitting, setSubmitting] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('bca');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown

  const subtotal = items.reduce((s, i) => s + i.pkg.price * i.qty, 0);
  const fee = 2500; // Flat processing fee in Rupiah
  const total = subtotal + fee;

  // Countdown timer for QRIS & Bank Transfer
  useEffect(() => {
    if (step !== 'payment_detail' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  if (!open) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep('payment_detail');
      setTimeLeft(300); // reset timer
    }, 1000);
  };

  const handleVerifyPayment = () => {
    setCheckingPayment(true);
    setTimeout(() => {
      setCheckingPayment(false);
      
      // Save transaction to localStorage
      try {
        const txId = Math.floor(100000 + Math.random() * 900000).toString();
        const newTx = {
          id: txId,
          username,
          email,
          items: items.map((i) => ({
            name: `${i.pkg.quantity.toLocaleString('id-ID')} ${i.pkg.service}`,
            qty: i.qty,
            price: i.pkg.price,
          })),
          total,
          paymentMethod: payment,
          status: 'Diproses',
          date: new Date().toISOString(),
        };

        const existing = localStorage.getItem('instaboost_transactions');
        const transactions = existing ? JSON.parse(existing) : [];
        transactions.push(newTx);
        localStorage.setItem('instaboost_transactions', JSON.stringify(transactions));
      } catch (err) {
        console.error('Failed to save transaction:', err);
      }

      setStep('success');
      setTimeout(() => {
        setStep('form');
        setUsername('');
        setEmail('');
        setPhoneNumber('');
        onComplete();
      }, 3000);
    }, 2000);
  };

  // Branded GoPay logo (teal pill badge style)
  const GopayLogo = ({ active }: { active: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill={active ? '#00AED6' : '#374151'} />
      <circle cx="30" cy="28" r="11" fill="white" fillOpacity="0.15" />
      <path d="M30 19 C24.477 19 20 23.477 20 29 C20 34.523 24.477 39 30 39 C33.5 39 36.6 37.2 38.4 34.5 L34.2 34.5 C33.1 35.7 31.6 36.5 30 36.5 C25.858 36.5 22.5 33.142 22.5 29 C22.5 24.858 25.858 21.5 30 21.5 C32.8 21.5 35.2 23 36.6 25.2 L30 25.2 L30 27.7 L39.5 27.7 L39.5 29 C39.5 29.6 39.45 30.1 39.35 30.6 L41.8 30.6 C41.93 30.1 42 29.55 42 29 C42 23.477 37.523 19 30 19Z" fill="white"/>
    </svg>
  );

  // Branded DANA logo (blue style)
  const DanaLogo = ({ active }: { active: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill={active ? '#118EEA' : '#374151'} />
      <text
        x="50%"
        y="52%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="15"
        fontWeight="800"
        fontFamily="Arial Black, Arial, sans-serif"
        letterSpacing="0.5"
      >DANA</text>
    </svg>
  );

  const paymentOptions = [
    { id: 'qris', label: 'QRIS / QR Code', icon: QrCode, customLogo: null },
    { id: 'gopay', label: 'GoPay', icon: null, customLogo: GopayLogo },
    { id: 'dana', label: 'DANA', icon: null, customLogo: DanaLogo },
    { id: 'bank', label: 'Transfer Bank', icon: Landmark, customLogo: null },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-bold text-white">
            {step === 'form' && 'Pembayaran'}
            {step === 'payment_detail' && 'Instruksi Pembayaran'}
            {step === 'success' && 'Pembayaran Berhasil!'}
          </h2>
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto px-5 py-5">
          {step === 'form' && (
            <form onSubmit={handleStartPayment} className="space-y-4">
              {/* Cart Summary */}
              <div className="space-y-2 rounded-xl bg-white/[0.02] border border-white/5 p-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Detail Pesanan</div>
                {items.map((item) => (
                  <div key={item.pkg.id} className="flex justify-between text-sm">
                    <span className="text-slate-300">
                      {item.qty}x {item.pkg.quantity.toLocaleString('id-ID')} {item.pkg.service}
                    </span>
                    <span className="font-semibold text-white">
                      Rp {(item.pkg.price * item.qty).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Username & Email inputs */}
              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Instagram Username
                  </label>
                  <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3">
                    <span className="text-slate-500 font-medium">@</span>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username"
                      className="w-full bg-transparent px-1 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Email Penerima
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-pink-500/50"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  Metode Pembayaran
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {paymentOptions.map((opt) => {
                    const Icon = opt.icon;
                    const CustomLogo = opt.customLogo;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPayment(opt.id)}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-xs font-semibold transition-all ${
                          payment === opt.id
                            ? 'border-pink-500 bg-pink-500/10 text-white'
                            : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {CustomLogo ? (
                          <CustomLogo active={payment === opt.id} />
                        ) : Icon ? (
                          <Icon className={`h-4 w-4 ${payment === opt.id ? 'text-pink-400' : 'text-slate-400'}`} />
                        ) : null}
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Total Summary */}
              <div className="space-y-1.5 rounded-xl bg-white/5 p-4 text-sm border border-white/5">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Biaya Layanan</span>
                  <span>Rp {fee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-base font-extrabold text-white">
                  <span>Total Bayar</span>
                  <span className="text-pink-400">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || items.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:shadow-pink-500/50 active:scale-95 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Lanjut Pembayaran <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'payment_detail' && (
            <div className="space-y-5">
              {/* Payment Info banner */}
              <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 border border-white/5 text-sm">
                <div>
                  <div className="text-xs text-slate-400">Total Tagihan</div>
                  <div className="text-lg font-bold text-white">Rp {total.toLocaleString('id-ID')}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Sisa Waktu</div>
                  <div className="text-sm font-mono font-bold text-amber-400">{formatTime(timeLeft)}</div>
                </div>
              </div>

              {/* QRIS Layout */}
              {payment === 'qris' && (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="rounded-2xl border-4 border-white bg-white p-4 shadow-lg w-48 h-48 flex items-center justify-center relative">
                    {/* Simulated QRIS code with styling */}
                    <div className="w-full h-full bg-slate-900 rounded p-1 flex flex-col justify-between items-center relative overflow-hidden">
                      <div className="text-[10px] font-extrabold text-white tracking-widest bg-pink-500 px-2 py-0.5 rounded-full absolute -top-1">QRIS</div>
                      <div className="grid grid-cols-6 gap-1 w-full h-full p-2 mt-2">
                        {Array.from({ length: 36 }).map((_, i) => {
                          const isSquare = (i < 3) || (i > 32) || (i % 6 === 0 && i < 18) || (i % 6 === 5 && i > 18);
                          return (
                            <div
                              key={i}
                              className={`rounded-sm ${
                                isSquare
                                  ? 'bg-white'
                                  : Math.random() > 0.4
                                  ? 'bg-pink-400'
                                  : 'bg-transparent'
                              }`}
                            />
                          );
                        })}
                      </div>
                      <div className="text-[8px] font-bold text-white uppercase opacity-75">InstaBoost Payment Gateway</div>
                    </div>
                  </div>
                  <div className="text-center text-xs text-slate-400 max-w-sm">
                    <p className="font-semibold text-white">Scan kode QR di atas menggunakan aplikasi e-wallet Anda.</p>
                    <p className="mt-1">Dukung OVO, GoPay, DANA, LinkAja, BCA Mobile, dll.</p>
                  </div>
                </div>
              )}

              {/* GoPay & DANA phone number flow */}
              {(payment === 'gopay' || payment === 'dana') && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                    <span className="text-xs uppercase tracking-wider text-pink-400 font-bold">
                      Pembayaran {payment === 'gopay' ? 'GoPay' : 'DANA'}
                    </span>
                    <p className="text-sm text-slate-300 mt-2">Masukkan nomor HP terdaftar untuk melanjutkan pembayaran.</p>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">Nomor Handphone</label>
                    <input
                      type="tel"
                      required
                      placeholder="08xxxxxxxxxx"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-pink-500"
                    />
                  </div>
                  <div className="flex gap-2 items-start text-xs text-slate-400 bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    <AlertCircle className="h-4 w-4 shrink-0 text-pink-400 mt-0.5" />
                    <p>Setelah menekan tombol Verifikasi, Anda akan mendapatkan notifikasi persetujuan di aplikasi {payment === 'gopay' ? 'Gojek' : 'DANA'} Anda.</p>
                  </div>
                </div>
              )}

              {/* Transfer Bank flow */}
              {payment === 'bank' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs text-slate-400">Pilih Bank</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['bca', 'mandiri'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBank(b)}
                          className={`rounded-xl border py-2 text-xs font-semibold uppercase ${
                            selectedBank === b
                              ? 'border-pink-500 bg-pink-500/10 text-white'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          Bank {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Nama Rekening:</span>
                      <span className="font-semibold text-white">InstaBoost Indonesia</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Nomor Rekening:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-base">
                          {selectedBank === 'bca' ? '8010887123' : '1370014299882'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(selectedBank === 'bca' ? '8010887123' : '1370014299882');
                            alert('Nomor rekening disalin!');
                          }}
                          className="text-xs text-pink-400 font-bold hover:underline"
                        >
                          Salin
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Jumlah Transfer:</span>
                      <span className="font-mono font-bold text-pink-400 text-base">
                        Rp {total.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 items-start text-xs text-slate-400 bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                    <p>Mohon transfer hingga digit terakhir agar sistem kami dapat memproses pembayaran Anda secara otomatis.</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <button
                type="button"
                onClick={handleVerifyPayment}
                disabled={checkingPayment || ((payment === 'gopay' || payment === 'dana') && !phoneNumber)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:shadow-pink-500/50 active:scale-95 disabled:opacity-60"
              >
                {checkingPayment ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menunggu & Memverifikasi Pembayaran...
                  </>
                ) : (
                  <>
                    Saya Sudah Membayar
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full text-center text-xs text-slate-400 hover:text-white transition-colors py-1"
              >
                Kembali & Ubah Metode Pembayaran
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-white">Pembayaran Sukses!</h3>
              <p className="mt-2 text-sm text-slate-400 max-w-xs mx-auto">
                Terima kasih, pembayaran untuk username <span className="text-pink-400 font-semibold">@{username}</span> telah dikonfirmasi.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Layanan akan mulai masuk dalam waktu 1-5 menit secara berkala.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
