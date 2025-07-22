import { Todo } from '../types/Todo';
import api from './api';

const SearchData = async (query: string): Promise<Todo[]> => {
  try {
    const response = await api.get<Todo[]>('/todos/search', {
      params: { q: query }
    });

    return response.data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description
    }));
  } catch (error) {
    console.error('Erro ao buscar todos:', error);
    return [];
  }
};

export default SearchData;
