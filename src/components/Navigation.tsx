import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { navigateToSection } from "@/lib/section-navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = { href: string; label: string; sections: string[] };

// Each nav item covers one or more home page sections, in page order.
const navItems: NavItem[] = [
  { href: "#home", label: "Home", sections: ["home"] },
  { href: "#case-studies", label: "Work", sections: ["case-studies"] },
  { href: "#about", label: "About", sections: ["about", "experience", "leadership", "value"] },
  { href: "#contact", label: "Contact", sections: ["contact", "ux-tips"] },
];

const caseStudies = [
  { title: "Brightside Growth Vision", route: "/case-study-3" },
  { title: "Etsy Fulfillment Vision", route: "/case-study-2" },
  { title: "Walmart Registry Revamp", route: "/case-study-1" },
  { title: "How I Lead", route: "/case-study-4" },
];

const itemClass =
  "relative z-10 flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium leading-5 sm:px-4 sm:text-[0.95rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-2";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [activeHref, setActiveHref] = useState<string | null>(isHome ? "#home" : null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!isHome || !location.hash) return;
    const frame = window.requestAnimationFrame(() => navigateToSection(location.hash));
    return () => window.cancelAnimationFrame(frame);
  }, [isHome, location.hash]);

  // Highlight the nav item whose section sits under a line 40% down the viewport.
  useEffect(() => {
    if (!isHome) {
      setActiveHref(location.pathname.startsWith("/case-study") ? "#case-studies" : null);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = navItems[0].href;
      for (const item of navItems) {
        for (const id of item.sections) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = item.href;
        }
      }
      // At the very bottom of the page, the last item wins even if its section is short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = navItems[navItems.length - 1].href;
      }
      setActiveHref(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isHome, location.pathname]);

  // Slide the white highlight under the active item (same look as the /chad-mapped switches).
  const measure = useCallback(() => {
    const el = activeHref ? itemRefs.current[activeHref] : null;
    setIndicator(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [activeHref]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const goToSection = (href: string) => {
    if (!isHome) {
      navigate(`/${href}`);
      return;
    }
    setActiveHref(href);
    navigateToSection(href);
  };

  const colorFor = (href: string) =>
    activeHref === href ? "text-text-primary" : "text-[hsl(220_9%_46%)] hover:text-text-primary";

  return (
    <nav
      aria-label="Main navigation"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-[calc(1rem+env(safe-area-inset-top,0px))]"
    >
      <div className="pointer-events-auto relative flex items-center gap-0.5 rounded-full bg-[hsl(220_14%_96%/0.85)] p-1 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150">
        <span
          aria-hidden="true"
          className="absolute top-1 bottom-1 rounded-full bg-surface-primary shadow-[0_1px_3px_rgb(0_0_0/0.1),0_1px_2px_rgb(0_0_0/0.06)] transition-all duration-300 ease-out"
          style={{
            left: indicator?.left ?? 0,
            width: indicator?.width ?? 0,
            opacity: indicator ? 1 : 0,
          }}
        />
        {navItems.map((item) =>
          item.label === "Work" ? (
            <DropdownMenu key={item.href} modal={false}>
              <DropdownMenuTrigger
                ref={(el) => (itemRefs.current[item.href] = el)}
                aria-current={activeHref === item.href ? (isHome ? "location" : "page") : undefined}
                className={`${itemClass} ${colorFor(item.href)}`}
              >
                <span>{item.label}</span>
                <ChevronDown size={14} aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                sideOffset={10}
                className="rounded-2xl border border-swiss-light bg-surface-primary/95 p-1.5 shadow-lg backdrop-blur-xl"
              >
                {caseStudies.map((study) => (
                  <DropdownMenuItem
                    key={study.route}
                    onClick={() => navigate(study.route)}
                    className="cursor-pointer rounded-xl px-4 py-2.5 leading-relaxed text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                  >
                    {study.title}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  onClick={() => goToSection(item.href)}
                  className="cursor-pointer rounded-xl px-4 py-2.5 leading-relaxed text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                >
                  View All Case Studies
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              key={item.href}
              ref={(el) => (itemRefs.current[item.href] = el)}
              onClick={() => goToSection(item.href)}
              aria-current={activeHref === item.href ? "location" : undefined}
              className={`${itemClass} ${colorFor(item.href)}`}
            >
              {item.label}
            </button>
          )
        )}
      </div>
    </nav>
  );
};

export default Navigation;
