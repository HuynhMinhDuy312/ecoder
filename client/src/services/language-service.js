import axios from './axios';

const root = '/languages';

class LanguageService {
    fetchPreviewLanguage = async () => {
        const response = await axios.get(`${root}/preview`);
        const result = response.data;

        return result;
    };

    fetchAll = async () => {
        const response = await axios.get(`${root}/all`);
        const result = response.data;

        return result;
    };
}

export default new LanguageService();
