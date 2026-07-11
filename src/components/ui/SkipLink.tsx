/**
 * SkipLink — "Skip to main content" accessible link.
 * Visible only on keyboard focus.
 *
 * Integration: place as the very first child of <body> in layout.tsx
 * Make sure <main id="main-content"> exists in (public)/layout.tsx ✓
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        fixed top-4 left-4 z-[9999]
        px-5 py-3 rounded-xl
        bg-[#2563EB] text-white text-sm font-semibold
        shadow-[0_0_24px_rgba(37,99,235,0.6)]
        translate-y-[-200%] focus:translate-y-0
        transition-transform duration-200
        focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2 focus:ring-offset-[#0F172A]
      "
    >
      Skip to main content
    </a>
  )
}
