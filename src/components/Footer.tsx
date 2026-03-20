interface FooterProps {
  backgroundClassName?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Footer = ({
  backgroundClassName = "bg-surface-primary",
  showBackButton = false,
  onBackClick,
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-12 border-t border-swiss-light ${backgroundClassName}`}>
      <div className="swiss-grid">
        {showBackButton && onBackClick && (
          <div className="col-span-12 text-center mb-8">
            <button
              onClick={onBackClick}
              className="px-8 py-3 bg-text-primary text-surface-primary hover:bg-swiss-gray transition-colors duration-200"
            >
              Back to Portfolio
            </button>
          </div>
        )}
        <div className="col-span-12 text-center">
          <p className="text-caption text-text-tertiary">
            © {currentYear} Chad Mortensen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
