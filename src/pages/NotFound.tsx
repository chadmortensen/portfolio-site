import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

const NotFound = () => {
  const location = useLocation();
  const { content } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">{content.notFound.title}</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          {content.notFound.cta}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
