import type { LanguageCode } from "@/lib/site-content";

export const pageCopy: Record<LanguageCode, {
  backToPortfolio: string;
  backShort: string;
  loadingCaseStudy: string;
  caseStudyTitlePlaceholder: string;
  incorrectPassword: string;
  enterPasswordToEdit: string;
  passwordPlaceholder: string;
  submit: string;
  cancel: string;
  save: string;
  saveChanges: string;
  editMode: string;
  presentationMode: string;
  addModule: string;
  subtitlePlaceholder: string;
}> = {
  en: {
    backToPortfolio: "Back to Portfolio",
    backShort: "Back",
    loadingCaseStudy: "Loading case study...",
    caseStudyTitlePlaceholder: "Case study title",
    incorrectPassword: "Incorrect password",
    enterPasswordToEdit: "Enter password to edit",
    passwordPlaceholder: "Password",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    saveChanges: "Save Changes",
    editMode: "Edit Mode",
    presentationMode: "Presentation Mode",
    addModule: "Add Module",
    subtitlePlaceholder: "Subtitle (optional)",
  },
  es: {
    backToPortfolio: "Volver al portafolio",
    backShort: "Volver",
    loadingCaseStudy: "Cargando caso de estudio...",
    caseStudyTitlePlaceholder: "Título del caso de estudio",
    incorrectPassword: "Contraseña incorrecta",
    enterPasswordToEdit: "Introduce la contraseña para editar",
    passwordPlaceholder: "Contraseña",
    submit: "Enviar",
    cancel: "Cancelar",
    save: "Guardar",
    saveChanges: "Guardar cambios",
    editMode: "Modo de edición",
    presentationMode: "Modo presentación",
    addModule: "Agregar módulo",
    subtitlePlaceholder: "Subtítulo (opcional)",
  },
  fr: {
    backToPortfolio: "Retour au portfolio",
    backShort: "Retour",
    loadingCaseStudy: "Chargement de l'étude de cas...",
    caseStudyTitlePlaceholder: "Titre de l'étude de cas",
    incorrectPassword: "Mot de passe incorrect",
    enterPasswordToEdit: "Saisissez le mot de passe pour modifier",
    passwordPlaceholder: "Mot de passe",
    submit: "Valider",
    cancel: "Annuler",
    save: "Enregistrer",
    saveChanges: "Enregistrer les modifications",
    editMode: "Mode édition",
    presentationMode: "Mode présentation",
    addModule: "Ajouter un module",
    subtitlePlaceholder: "Sous-titre (facultatif)",
  },
};
