import 'server-only';

// language process
const language = {
  en: () => import('../json_file/en.json').then(module => module.default),
  bn: () => import('../json_file/bn.json').then(module => module.default),
};

export const getLanguage = async locale => language[locale]();
