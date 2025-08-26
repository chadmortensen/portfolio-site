import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#leadership", label: "Leadership" },
    { href: "#value", label: "Value" },
    { href: "#case-studies", label: "Case Studies" },
    { href: "#contact", label: "Contact" }
  ];

  const caseStudies = [
    { title: "Brightside Growth Vision", route: "/case-study-3" },
    { title: "Etsy Fulfillment Vision", route: "/case-study-2" },
    { title: "Walmart Registry Revamp", route: "/case-study-1" },
    { title: "Additional work examples", route: "/case-study-4" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  const handleCaseStudyClick = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 ${
      isScrolled 
        ? 'bg-surface-primary/80 backdrop-blur-md backdrop-saturate-150 border-b border-swiss-light' 
        : 'bg-surface-primary'
    }`}>
      <div className="max-width-container mx-auto px-4 sm:px-6">
        <div className="flex justify-center items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              item.label === "Case Studies" ? (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger className="text-body text-text-secondary hover:text-text-primary transition-colors duration-200 relative group whitespace-nowrap flex items-center space-x-1">
                    <span>{item.label}</span>
                    <ChevronDown size={14} />
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-blue group-hover:w-full transition-all duration-300"></span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-surface-primary border border-swiss-light shadow-lg">
                    {caseStudies.map((study) => (
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
                      View All Case Studies
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-body text-text-secondary hover:text-text-primary transition-colors duration-200 relative group whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-blue group-hover:w-full transition-all duration-300"></span>
                </button>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-swiss-light">
            <div className="flex flex-col space-y-4 pt-6">
              {navItems.map((item) => (
                item.label === "Case Studies" ? (
                  <div key={item.href} className="space-y-2">
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-left text-body text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      {item.label}
                    </button>
                    <div className="pl-4 space-y-2">
                      {caseStudies.map((study) => (
                        <button
                          key={study.route}
                          onClick={() => handleCaseStudyClick(study.route)}
                          className="block text-left text-caption text-text-secondary hover:text-text-primary transition-colors duration-200"
                        >
                          {study.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-body text-text-secondary hover:text-text-primary transition-colors duration-200"
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
