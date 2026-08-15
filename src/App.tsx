import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PriceList from '@/components/PriceList';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import HistoryModal from '@/components/HistoryModal';
import Features from '@/components/Features';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import type { CartItem, Package, ServiceType } from '@/types';

const services: ServiceType[] = ['followers', 'likes', 'comments', 'views'];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const addToCart = useCallback((pkg: Package) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.pkg.id === pkg.id);
      if (existing) {
        return prev.map((i) =>
          i.pkg.id === pkg.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { pkg, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const incItem = useCallback((id: string) => {
    setCart((prev) =>
      prev.map((i) => (i.pkg.id === id ? { ...i, qty: i.qty + 1 } : i))
    );
  }, []);

  const decItem = useCallback((id: string) => {
    setCart((prev) =>
      prev
        .map((i) => (i.pkg.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.pkg.id !== id));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    setCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} onHistoryClick={() => setHistoryOpen(true)} />
      <main>
        <Hero />
        {services.map((s) => (
          <PriceList key={s} service={s} onAdd={addToCart} />
        ))}
        <Features />
        <FAQ />
      </main>
      <Footer />

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onInc={incItem}
        onDec={decItem}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />
      <CheckoutModal
        open={checkoutOpen}
        items={cart}
        onClose={() => setCheckoutOpen(false)}
        onComplete={handleCheckoutComplete}
      />
      <HistoryModal
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
      />
    </div>
  );
}
