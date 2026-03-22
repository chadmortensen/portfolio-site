import type { LanguageCode } from "@/lib/site-content";

export const pageCopy: Record<LanguageCode, {
  backToPortfolio: string;
  backShort: string;
  loadingCaseStudy: string;
  caseStudyTitlePlaceholder: string;
  incorrectPassword: string;
}> = {
  en: {
    backToPortfolio: "Back to Portfolio",
    backShort: "Back",
    loadingCaseStudy: "Loading case study...",
    caseStudyTitlePlaceholder: "Case study title",
    incorrectPassword: "Incorrect password",
  },
  es: {
    backToPortfolio: "Volver al portafolio",
    backShort: "Volver",
    loadingCaseStudy: "Cargando caso de estudio...",
    caseStudyTitlePlaceholder: "Título del caso de estudio",
    incorrectPassword: "Contraseña incorrecta",
  },
  fr: {
    backToPortfolio: "Retour au portfolio",
    backShort: "Retour",
    loadingCaseStudy: "Chargement de l'étude de cas...",
    caseStudyTitlePlaceholder: "Titre de l'étude de cas",
    incorrectPassword: "Mot de passe incorrect",
  },
};
