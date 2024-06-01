import React, { FC, createContext, useContext, ReactNode } from 'react';

const I18N_CONFIG_KEY = process.env.REACT_APP_I18N_CONFIG_KEY || 'i18nConfig';

type Lang = 'de' | 'en' | 'es' | 'fr' | 'ja' | 'zh';

type Props = {
  selectedLang: Lang;
  children?: ReactNode;
};

const initialState: Props = {
  selectedLang: 'en',
};

function getConfig(): Props {
  if (typeof window !== 'undefined') {
    const ls = localStorage.getItem(I18N_CONFIG_KEY);
    if (ls) {
      try {
        return JSON.parse(ls) as Props;
      } catch (er) {
        console.error(er);
      }
    }
  }
  return initialState;
}

// Side effect
export function setLanguage(lang: Lang): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({ selectedLang: lang }));
    window.location.reload();
  }
}

const I18nContext = createContext<Props>(initialState);

const useLang = (): Lang => {
  return useContext(I18nContext).selectedLang;
};

const MetronicI18nProvider: FC<Props> = ({ children }) => {
  const lang = getConfig();
  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>;
};

export { MetronicI18nProvider, useLang };
