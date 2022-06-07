import { createI18n } from 'vue-i18n'
import messages from '../language/index';

const i18n = createI18n({
    legacy:false,
    locale: localStorage.getItem('lang') || 'en',
    messages
});

export default i18n;