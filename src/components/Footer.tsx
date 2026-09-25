const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-surface-primary border-t border-swiss-light">
      <div className="swiss-grid">
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
