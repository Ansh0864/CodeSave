import { isToday, isThisWeek, isThisMonth, isThisYear } from './date';

export const searchPastes = (pastes, query, filters) => {
  let filteredPastes = [...pastes];

  // Text search
  if (query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    filteredPastes = filteredPastes.filter(paste => {
      const titleMatch = paste.title?.toLowerCase().includes(searchTerm);
      const contentMatch = paste.content?.toLowerCase().includes(searchTerm);
      const tagsMatch = paste.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
      return titleMatch || contentMatch || tagsMatch;
    });
  }

  // Language filter
  if (filters.language) {
    filteredPastes = filteredPastes.filter(paste => paste.language === filters.language);
  }

  // Privacy filter
  if (filters.privacy !== undefined) {
    filteredPastes = filteredPastes.filter(paste => paste.isPrivate === filters.privacy);
  }

  // Favorites filter
  if (filters.favoritesOnly) {
    filteredPastes = filteredPastes.filter(paste => paste.isFavorite);
  }

  // Date range filter
  if (filters.dateRange) {
    filteredPastes = filteredPastes.filter(paste => {
      const createdAt = paste.createdAt;
      switch (filters.dateRange) {
        case 'today':
          return isToday(createdAt);
        case 'week':
          return isThisWeek(createdAt);
        case 'month':
          return isThisMonth(createdAt);
        case 'year':
          return isThisYear(createdAt);
        default:
          return true;
      }
    });
  }

  return filteredPastes;
};

export const sortPastes = (pastes, sortBy, sortOrder = 'desc') => {
  const sortedPastes = [...pastes];

  sortedPastes.sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'date':
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      case 'title':
        aValue = a.title?.toLowerCase() || '';
        bValue = b.title?.toLowerCase() || '';
        break;
      case 'views':
        aValue = a.views || 0;
        bValue = b.views || 0;
        break;
      case 'favorites':
        aValue = a.isFavorite ? 1 : 0;
        bValue = b.isFavorite ? 1 : 0;
        // Secondary sort by date for favorites
        if (aValue === bValue) {
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
        }
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  return sortedPastes;
};

export const getSearchSuggestions = (pastes, query) => {
  if (!query.trim()) return [];

  const suggestions = new Set();
  const searchTerm = query.toLowerCase().trim();

  pastes.forEach(paste => {
    // Title suggestions
    if (paste.title?.toLowerCase().includes(searchTerm)) {
      suggestions.add(paste.title);
    }

    // Tag suggestions
    paste.tags?.forEach(tag => {
      if (tag.toLowerCase().includes(searchTerm)) {
        suggestions.add(`#${tag}`);
      }
    });
  });

  return Array.from(suggestions).slice(0, 5);
};