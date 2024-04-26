import { suggestionRequest } from '@/entities/product/api';
import { SearchResultType, SearchSuggestion } from './searchSuggestion';

export { magnifierIconTmpl, SearchSuggestion } from './searchSuggestion';

function renderItem(parent: Element, text: string, type: SearchResultType) {
    return new SearchSuggestion(parent, {
        className: `${type}-[${text}]`,
        type: type,
        text: text,
    });
}

export async function useGetSearchSuggestions(query: string) {
    return suggestionRequest(query)
        .then(({ status, data }) => {
            const suggestions: Array<
                (parent: Element) => {
                    item: SearchSuggestion;
                    id: string;
                }
            > = [];
            if (status === 200) {
                data.products.forEach((itemName, ind) => {
                    suggestions.push((parent: Element) => {
                        return {
                            item: renderItem(parent, itemName, 'item'),
                            id: ind.toString() + itemName,
                        };
                    });
                });
                data.categories.forEach(({ name, id }) => {
                    suggestions.push((parent: Element) => {
                        return {
                            item: renderItem(parent, name, 'category'),
                            id: id.toString(),
                        };
                    });
                });
            }

            return suggestions;
        })
        .catch(() => {
            const suggestions: Array<
                (parent: Element) => {
                    item: SearchSuggestion;
                    id: string;
                }
            > = [];
            return suggestions;
        });
}
