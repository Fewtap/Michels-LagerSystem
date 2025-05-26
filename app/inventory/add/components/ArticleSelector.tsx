import type { Article } from '@/Types/database.types';

interface ArticleSelectorProps {
  articles: Article[];
  selectedArticle?: Article;
  onArticleChange: (article: Article | undefined) => void;
}

export function ArticleSelector({ articles, selectedArticle, onArticleChange }: ArticleSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    
    if (selectedValue === "") {
      onArticleChange(undefined);
      return;
    }

    const selectedId = parseInt(selectedValue);
    const article = articles.find((a) => a.article_id === selectedId);
    onArticleChange(article);
  };

  return (
    <div className="flex gap-2">
      <label>Article</label>
      <select
        className="text-black px-5"
        value={selectedArticle?.article_id || ""}
        onChange={handleChange}
      >
        <option value="">Select an article</option>
        {articles.map((article) => (
          <option key={article.article_id} value={article.article_id}>
            {`${article.article_id}: ${article.Name}`}
          </option>
        ))}
      </select>
    </div>
  );
}