import type { Package, ServiceType } from '@/types';

export const serviceMeta: Record<
  ServiceType,
  { title: string; tagline: string; icon: string; gradient: string }
> = {
  followers: {
    title: 'Instagram Followers',
    tagline: 'Boost your credibility with real, high-quality followers.',
    icon: 'Users',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  likes: {
    title: 'Instagram Likes',
    tagline: 'Increase engagement and make your posts go viral.',
    icon: 'Heart',
    gradient: 'from-rose-500 to-orange-500',
  },
  comments: {
    title: 'Instagram Comments',
    tagline: 'Spark conversations with authentic-looking comments.',
    icon: 'MessageCircle',
    gradient: 'from-amber-500 to-pink-500',
  },
  views: {
    title: 'Instagram Views',
    tagline: 'Amplify your reach on Reels and video posts.',
    icon: 'Play',
    gradient: 'from-purple-500 to-rose-500',
  },
};

export const packages: Package[] = [
  // Followers
  { id: 'fol-100', service: 'followers', quantity: 100, price: 15000, label: 'Starter', perks: ['Akun terlihat real', 'Pengiriman bertahap'] },
  { id: 'fol-500', service: 'followers', quantity: 500, price: 39000, label: 'Growth', popular: true, perks: ['Akun berkualitas tinggi', 'Pengiriman drip-feed', 'Dukungan prioritas'] },
  { id: 'fol-1000', service: 'followers', quantity: 1000, price: 69000, label: 'Pro', perks: ['Akun premium', 'Kecepatan pengiriman alami', 'Dukungan prioritas'] },
  { id: 'fol-5000', service: 'followers', quantity: 5000, price: 249000, label: 'Business', bestValue: true, perks: ['Akun kelas atas', 'Kecepatan bisa kustom', 'Dedicated manager', 'Dukungan VIP'] },
  { id: 'fol-10000', service: 'followers', quantity: 10000, price: 449000, label: 'Elite', perks: ['Akun elite khusus', 'Pengiriman dipercepat', 'Dedicated manager', 'Dukungan VIP'] },

  // Likes
  { id: 'lik-100', service: 'likes', quantity: 100, price: 9000, label: 'Starter', perks: ['Instan masuk', 'Likes terlihat real', 'Bisa dibagi ke beberapa post'] },
  { id: 'lik-500', service: 'likes', quantity: 500, price: 29000, label: 'Growth', popular: true, perks: ['Instan masuk', 'Likes berkualitas tinggi', 'Bisa dibagi ke beberapa post'] },
  { id: 'lik-1000', service: 'likes', quantity: 1000, price: 49000, label: 'Pro', perks: ['Instan masuk', 'Likes premium', 'Bisa dibagi hingga 10 post'] },
  { id: 'lik-5000', service: 'likes', quantity: 5000, price: 179000, label: 'Business', bestValue: true, perks: ['Instan masuk', 'Likes kelas atas', 'Bisa dibagi ke unlimited post', 'Dukungan VIP'] },
  { id: 'lik-10000', service: 'likes', quantity: 10000, price: 299000, label: 'Elite', perks: ['Instan masuk', 'Likes elite', 'Bisa dibagi ke unlimited post', 'Dukungan VIP'] },

  // Comments
  { id: 'cmt-50', service: 'comments', quantity: 50, price: 19000, label: 'Starter', perks: ['Komentar generik', 'Akun terlihat real', 'Bisa disesuaikan'] },
  { id: 'cmt-100', service: 'comments', quantity: 100, price: 35000, label: 'Growth', popular: true, perks: ['Komentar kustom', 'Akun berkualitas tinggi', 'Pengiriman bertahap'] },
  { id: 'cmt-250', service: 'comments', quantity: 250, price: 79000, label: 'Pro', perks: ['Komentar kustom', 'Akun premium', 'Pengiriman drip-feed'] },
  { id: 'cmt-500', service: 'comments', quantity: 500, price: 149000, label: 'Business', bestValue: true, perks: ['Komentar kustom penuh', 'Akun kelas atas', 'Pengiriman alami', 'Dukungan VIP'] },
  { id: 'cmt-1000', service: 'comments', quantity: 1000, price: 249000, label: 'Elite', perks: ['Komentar kustom penuh', 'Akun elite', 'Pengiriman prioritas', 'Dukungan VIP'] },

  // Views
  { id: 'view-1000', service: 'views', quantity: 1000, price: 9000, label: 'Starter', perks: ['Instan masuk', 'Untuk Reels & Video', 'Pengiriman cepat'] },
  { id: 'view-5000', service: 'views', quantity: 5000, price: 29000, label: 'Growth', popular: true, perks: ['Instan masuk', 'Views berkualitas tinggi', 'Bisa dibagi ke beberapa video'] },
  { id: 'view-10000', service: 'views', quantity: 10000, price: 49000, label: 'Pro', perks: ['Instan masuk', 'Views premium', 'Bisa dibagi hingga 5 video'] },
  { id: 'view-50000', service: 'views', quantity: 50000, price: 199000, label: 'Business', bestValue: true, perks: ['Instan masuk', 'Views kelas atas', 'Bisa dibagi ke unlimited video', 'Dukungan VIP'] },
  { id: 'view-100000', service: 'views', quantity: 100000, price: 349000, label: 'Elite', perks: ['Instan masuk', 'Views elite', 'Bisa dibagi ke unlimited video', 'Dukungan VIP'] },
];

export const faqs = [
  { q: 'Apakah followers/likes yang dikirim benar-benar real?', a: 'Ya. Kami menggunakan akun berkualitas tinggi yang terlihat natural sehingga profil Anda tetap aman dan terlihat organik.' },
  { q: 'Berapa lama proses pengiriman?', a: 'Sebagian besar pesanan mulai diproses dalam 1-5 menit. Pengiriman besar dilakukan bertahap (drip-feed) agar terlihat natural.' },
  { q: 'Apakah aman untuk akun Instagram saya?', a: 'Sangat aman. Kami tidak meminta password Anda — hanya username. Semua proses sesuai dengan batas keamanan Instagram.' },
  { q: 'Metode pembayaran apa saja yang didukung?', a: 'Kami menerima kartu kredit/debit, transfer bank, e-wallet (GoPay, OVO, DANA), dan QRIS.' },
  { q: 'Apakah ada garansi?', a: 'Ya, kami menjamin semua pesanan diproses sesuai jumlah yang dibeli. Jika ada kendala, tim support kami siap membantu.' },
  { q: 'Bisakah saya split ke beberapa postingan?', a: 'Tidak bisa. Likes, comments, dan views tidak dapat dibagi ke beberapa post.' },
];
