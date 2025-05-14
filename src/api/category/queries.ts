import { createQuery, createMutation } from 'react-query-kit';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from './requests';
import type { ICategoryResponse, ICategory, ICategoryQuery } from './types';
import type { CategorySchema } from '@/modules/CategoryManagementPage/libs/validators';

export const useCategoriesQuery = createQuery<ICategoryResponse, Partial<ICategoryQuery>>({
  queryKey: ['admin/categories'],
  fetcher: (params) => getCategories(params),
});
export const useCategoryByIdQuery = createQuery<ICategory, string>({
  queryKey: ['category'],
  fetcher: (id) => getCategoryById(id),
});
// Mutations
export const useCreateCategoryMutation = createMutation<ICategory, CategorySchema>({ mutationFn: (data) => createCategory(data) });
export const useUpdateCategoryMutation = createMutation<ICategory, { id: string; formData: Partial<CategorySchema> }>({
  mutationFn: ({ id, formData }) => updateCategory({ id, formData }),
});
export const useDeleteCategoryMutation = createMutation<void, string>({
  mutationFn: (id) => deleteCategory(id),
});
