import menuStructureJson from './menu-structure.json';

// Type definitions
export interface MenuItemVariation {
  name: string;
  price?: string;
  description?: string;
}

export interface MenuItem {
  name: string;
  price?: string;
  description?: string;
  variations?: string[];
  items?: MenuItem[] | string[];
  category?: string;
  sizes?: string[];
  types?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  nameTranslations: {
    it: string;
    en: string;
    ru: string;
    uk: string;
    pl: string;
    de: string;
  };
  pages: number[];
  hasPhotos: boolean;
  items: MenuItem[];
  notes?: string;
}

export interface MenuStructure {
  meta: {
    totalPages: number;
    venue: string;
    menuType: string;
    hasPhotos: boolean;
    language: string;
  };
  categories: MenuCategory[];
  pageMapping: Record<string, { category: string; type: string }>;
  designNotes: {
    colorScheme: string;
    photoStyle: string;
    layout: string;
    categoryHeaders: string;
    typography: string;
    photoQuality: string;
    brandElements: string;
  };
  photographyPages: number[];
  presentationOrder: string[];
  notes: string;
}

// Load the menu structure
const menuStructure = menuStructureJson as MenuStructure;

// Export the full structure
export const menu = menuStructure;

// Helper functions
export function getAllCategories(): MenuCategory[] {
  return menuStructure.categories;
}

export function getCategoryForPage(pageNum: number): MenuCategory | null {
  const pageKey = pageNum.toString();
  const pageInfo = menuStructure.pageMapping[pageKey];
  
  if (!pageInfo) return null;
  
  // Handle multiple categories on one page (take first)
  const categoryId = pageInfo.category.split(',')[0];
  
  return menuStructure.categories.find(cat => cat.id === categoryId) || null;
}

export function getFirstPageForCategory(categoryId: string): number {
  const category = menuStructure.categories.find(cat => cat.id === categoryId);
  return category && category.pages.length > 0 ? category.pages[0] : 1;
}

export function getCategoryById(categoryId: string): MenuCategory | null {
  return menuStructure.categories.find(cat => cat.id === categoryId) || null;
}

export function getTotalPages(): number {
  return menuStructure.meta.totalPages;
}

export function getPresentationOrder(): string[] {
  return menuStructure.presentationOrder;
}

export function getNavigableCategories(): MenuCategory[] {
  // Return all categories except the cover page for sidebar navigation
  return menuStructure.categories.filter(cat => cat.id !== 'cover');
}

// Export design tokens
export const designTokens = {
  colors: {
    background: '#F5F1E8', // Cream/beige
    categoryHeaderGold: '#D4A574',
    categoryHeaderPurple: '#B088B5',
    text: '#2C2416',
  },
  photoFrameStyle: 'circular',
  layout: 'two-page-spread',
};

export default menuStructure;
