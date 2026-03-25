import { useLanguage } from "@/hooks/use-language";

const Footer = () => {
  const { content } = useLanguage();

  return (
    <footer className="py-12 bg-surface-primary border-t border-swiss-light">
      <div className="swiss-grid">
        <div className="col-span-12 text-center">
          <p className="text-caption text-text-tertiary">{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
