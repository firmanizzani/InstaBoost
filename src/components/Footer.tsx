import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 via-pink-500 to-amber-400">
                <Instagram className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-white">
                Insta<span className="text-pink-400">Boost</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Platform terpercaya untuk meningkatkan engagement Instagram Anda dengan aman dan cepat.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#followers" className="hover:text-pink-400">Followers</a></li>
              <li><a href="#likes" className="hover:text-pink-400">Likes</a></li>
              <li><a href="#comments" className="hover:text-pink-400">Comments</a></li>
              <li><a href="#views" className="hover:text-pink-400">Views</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-pink-400">About Us</a></li>
              <li><a href="#faq" className="hover:text-pink-400">FAQ</a></li>
              <li><a href="#" className="hover:text-pink-400">Terms</a></li>
              <li><a href="#" className="hover:text-pink-400">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Contact</h4>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-colors hover:bg-pink-500/20 hover:text-pink-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © 2026 InstaBoost. All rights reserved. Not affiliated with Instagram or Meta Platforms.
        </div>
      </div>
    </footer>
  );
}
