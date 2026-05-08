import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchNewsCategory } from '../services/api';
import { getStoredValue, setStoredValue } from '../utils/storage';

const CATEGORIES = ['Technology', 'Science'];
const CACHE_KEY = 'dashboard-news-cache';
const CACHE_TTL = 15 * 60 * 1000;

export function useNews(notify) {
  const [articlesByCategory, setArticlesByCategory] = useState({ Technology: [], Science: [] });
  const [loading, setLoading] = useState({ Technology: false, Science: false });
  const [errors, setErrors] = useState({ Technology: '', Science: '' });
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchCategory = useCallback(
    async (category, { silent = false } = {}) => {
      setLoading((current) => ({ ...current, [category]: true }));
      setErrors((current) => ({ ...current, [category]: '' }));

      try {
        const articles = await fetchNewsCategory(category);
        setArticlesByCategory((current) => {
          const next = { ...current, [category]: articles };
          setStoredValue(CACHE_KEY, { timestamp: Date.now(), articlesByCategory: next });
          return next;
        });
        if (!silent) notify?.(`${category} news refreshed`, 'success');
      } catch (caught) {
        const message = caught.message || `Unable to load ${category} news.`;
        setErrors((current) => ({ ...current, [category]: message }));
        notify?.(message, 'error');
      } finally {
        setLoading((current) => ({ ...current, [category]: false }));
      }
    },
    [notify]
  );

  useEffect(() => {
    const cached = getStoredValue(CACHE_KEY, null);
    const fresh = cached && Date.now() - cached.timestamp < CACHE_TTL;

    if (fresh) {
      setArticlesByCategory(cached.articlesByCategory);
      return;
    }

    CATEGORIES.forEach((category) => fetchCategory(category, { silent: true }));
  }, [fetchCategory]);

  const allArticles = useMemo(() => Object.values(articlesByCategory).flat(), [articlesByCategory]);

  const visibleArticles = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return allArticles
      .filter((article) => activeCategory === 'All' || article.category === activeCategory)
      .filter((article) => {
        if (!keyword) return true;
        return [article.title, article.description, article.source?.name, article.author]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(keyword));
      })
      .sort((a, b) => {
        if (sortBy === 'source') {
          return (a.source?.name || '').localeCompare(b.source?.name || '');
        }
        return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
      });
  }, [activeCategory, allArticles, search, sortBy]);

  return {
    categories: CATEGORIES,
    articlesByCategory,
    allArticles,
    visibleArticles,
    loading,
    errors,
    search,
    setSearch,
    sortBy,
    setSortBy,
    activeCategory,
    setActiveCategory,
    refreshCategory: fetchCategory
  };
}
