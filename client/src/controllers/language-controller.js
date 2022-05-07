/**
 * Author: Nam Dinh
 * Created At: Sat Apr 16 2022
 * File name: language-controller.js
 */

import languageService from '@services/language-service';

class LanguageController {
    async fetchPreviewLanguage(setLanguages) {
        const result = await languageService.fetchPreviewLanguage();
        setLanguages(result);
    }

    async fetchAll(setLanguages) {
        const result = await languageService.fetchAll();

        setLanguages(result);
    }
}

export default LanguageController;
