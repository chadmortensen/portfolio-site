import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/hooks/use-language";
import { languageOptions, type LanguageCode } from "@/lib/site-content";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, content } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: content.navigation.items.home },
    { href: "#about", label: content.navigation.items.about },
    { href: "#experience", label: content.navigation.items.experience },
    { href: "#leadership", label: content.navigation.items.leadership },
    { href: "#value", label: content.navigation.items.value },
    { href: "#case-studies", label: content.navigation.items.caseStudies },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleCaseStudyClick = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  const LanguageSelector = () => (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1 rounded-full border border-swiss-light px-3 py-1 text-caption text-text-secondary transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2"
        aria-label={content.navigation.languageSelectorAriaLabel}
      >
        <span>{language.toUpperCase()}</span>
        <ChevronDown size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-24 bg-surface-primary border border-swiss-light shadow-lg">
        <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as LanguageCode)}>
          {languageOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.code}
              value={option.code}
              className="cursor-pointer text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
            >
              <div className="flex w-full items-center justify-between gap-3">
                <span>{option.label}</span>
                <span className="text-caption text-text-tertiary">{option.name}</span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 ${
      isScrolled
        ? "bg-surface-primary/80 backdrop-blur-md backdrop-saturate-150 border-b border-swiss-light"
        : "bg-surface-primary"
    }`}>
      <div className="max-width-container mx-auto px-4 sm:px-6">
        <div className="flex justify-center items-center">
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              item.label === content.navigation.items.caseStudies ? (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger className="text-body text-text-secondary hover:text-text-primary transition-colors duration-200 relative group whitespace-nowrap flex items-center space-x-1 rounded px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2">
                    <span>{item.label}</span>
                    <ChevronDown size={14} />
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-blue group-hover:w-full transition-all duration-300"></span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-surface-primary border border-swiss-light shadow-lg">
                    {content.caseStudies.cards.map((study) => (
                      <DropdownMenuItem
                        key={study.route}
                        onClick={() => handleCaseStudyClick(study.route)}
                        className="text-text-secondary hover:text-text-primary hover:bg-surface-secondary cursor-pointer"
                      >
                        {study.title}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem
                      onClick={() => scrollToSection(item.href)}
                      className="text-text-secondary hover:text-text-primary hover:bg-surface-secondary cursor-pointer"
                    >
                      {content.navigation.viewAllCaseStudies}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-body text-text-secondary hover:text-text-primary transition-colors duration-200 relative group whitespace-nowrap rounded px-2 py-1"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-blue group-hover:w-full transition-all duration-300"></span>
                </button>
              )
            ))}
            <button
              onClick={() => scrollToSection("#contact")}
              className="text-body text-text-secondary hover:text-text-primary transition-colors duration-200 relative group whitespace-nowrap rounded px-2 py-1"
            >
              {content.navigation.items.contact}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-blue group-hover:w-full transition-all duration-300"></span>
            </button>
            <LanguageSelector />
          </div>

          <button
            className="md:hidden p-2 text-text-primary rounded"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? content.navigation.closeMenuLabel : content.navigation.openMenuLabel}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div id="mobile-navigation" className="md:hidden mt-6 pb-6 border-t border-swiss-light">
            <div className="flex flex-col space-y-4 pt-6">
              {navItems.map((item) => (
                item.label === content.navigation.items.caseStudies ? (
                  <div key={item.href} className="space-y-2">
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-left text-body text-text-secondary hover:text-text-primary transition-colors duration-200 rounded px-2 py-1"
                    >
                      {item.label}
                    </button>
                    <div className="pl-4 space-y-2">
                      {content.caseStudies.cards.map((study) => (
                        <button
                          key={study.route}
                          onClick={() => handleCaseStudyClick(study.route)}
                          className="block text-left text-caption text-text-secondary hover:text-text-primary transition-colors duration-200 rounded px-2 py-1"
                        >
                          {study.title}
                        </button>
                      ))}
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className="block text-left text-caption text-text-secondary hover:text-text-primary transition-colors duration-200 rounded px-2 py-1"
                      >
                        {content.navigation.viewAllCaseStudies}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-body text-text-secondary hover:text-text-primary transition-colors duration-200 rounded px-2 py-1"
                  >
                    {item.label}
                  </button>
                )
              ))}
              <button
                onClick={() => scrollToSection("#contact")}
                className="text-left text-body text-text-secondary hover:text-text-primary transition-colors duration-200 rounded px-2 py-1"
              >
                {content.navigation.items.contact}
              </button>
              <div className="pt-2">
                <p className="text-caption uppercase tracking-wide text-text-tertiary mb-2">{content.navigation.languageMenuLabel}</p>
                <div className="flex gap-2">
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => setLanguage(option.code)}
                      className={`rounded-full border px-3 py-1 text-caption transition-colors ${
                        language === option.code
                          ? "border-text-primary bg-text-primary text-surface-primary"
                          : "border-swiss-light text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
