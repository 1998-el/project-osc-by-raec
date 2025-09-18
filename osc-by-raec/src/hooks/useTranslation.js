export const useTranslation = () => {
  const translateMessage = async (text, from = 'auto', to = 'fr') => {
    // Simuler une traduction asynchrone
    return new Promise((resolve) => {
      setTimeout(() => {
        // Ici, on retourne le texte original pour la simulation
        resolve(text);
      }, 300);
    });
  };

  return {
    translateMessage
  };
};
