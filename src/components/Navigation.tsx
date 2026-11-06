import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { navigateToSection } from "@/lib/section-navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Sections scroll on the home page; items with a route open their own page.
  const navItems: { href: string; label: string; route?: string }[] = [
    { href: "#home", label: "Home" },
    { href: "#case-studies", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" }
  ];

  const caseStudies = [
    { title: "Brightside Growth Vision", route: "/case-study-3" },
    { title: "Etsy Fulfillment Vision", route: "/case-study-2" },
    { title: "Walmart Registry Revamp", route: "/case-study-1" },
    { title: "How I Lead", route: "/case-study-4" }
  ];

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      navigateToSection(location.hash);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [location.pathname, location.hash]);

  const scrollToSection = (href: string, route?: string) => {
    setIsOpen(false);

    if (route) {
      navigate(route);
      return;
    }

    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }

    navigateToSection(href);
  };

  const handleCaseStudyClick = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 w-full z-50 border-b border-swiss-light/60 ${isOpen ? "bg-surface-primary" : "bg-surface-primary/60"} py-4 backdrop-blur-xl backdrop-saturate-150${isOpen ? " max-h-[100dvh] overflow-y-auto" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          event.preventDefault();
          setIsOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
    >
      <div className="max-width-container mx-auto px-4 sm:px-6">
        <div className="flex justify-center items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              item.label === "Work" ? (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger className="text-nav text-text-secondary hover:text-text-primary transition-colors duration-200 relative group whitespace-nowrap flex items-center space-x-1 rounded px-2 py-1">
                    <span>{item.label}</span>
                    <ChevronDown size={14} />
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-blue group-hover:w-full transition-all duration-300"></span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-surface-primary border border-swiss-light shadow-lg">
                    {caseStudies.map((study) => (
                      <DropdownMenuItem
                        key={study.route}
                        onClick={() => handleCaseStudyClick(study.route)}
                        className="text-text-secondary hover:text-text-primary hover:bg-surface-secondary cursor-pointer px-4 py-2.5 leading-relaxed"
                      >
                        {study.title}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem
                      onClick={() => scrollToSection(item.href)}
                      className="text-text-secondary hover:text-text-primary hover:bg-surface-secondary cursor-pointer px-4 py-2.5 leading-relaxed"
                    >
                      View All Case Studies
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href, item.route)}
                  aria-current={item.route && location.pathname === item.route ? "page" : undefined}
                  className="text-nav text-text-secondary hover:text-text-primary transition-colors duration-200 relative group whitespace-nowrap rounded px-1 py-1"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-blue group-hover:w-full transition-all duration-300"></span>
                </button>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            className="md:hidden p-2 text-text-primary rounded"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls={isOpen ? "mobile-navigation" : undefined}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-navigation" className="md:hidden mt-6 pb-6 border-t border-swiss-light">
            <div className="flex flex-col space-y-4 pt-6">
              {navItems.map((item) => (
                item.label === "Work" ? (
                  <div key={item.href} className="space-y-2">
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-left text-nav text-text-secondary hover:text-text-primary transition-colors duration-200 rounded px-2 py-1"
                    >
                      {item.label}
                    </button>
                    <div className="pl-4 space-y-4">
                      {caseStudies.map((study) => (
                        <button
                          key={study.route}
                          onClick={() => handleCaseStudyClick(study.route)}
                          className="block text-left text-base text-text-secondary hover:text-text-primary transition-colors duration-200 rounded px-2 py-2"
                        >
                         - {study.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href, item.route)}
                    aria-current={item.route && location.pathname === item.route ? "page" : undefined}
                    className="text-left text-nav text-text-secondary hover:text-text-primary transition-colors duration-200 rounded px-2 py-1"
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
