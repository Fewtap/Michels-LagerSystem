import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Article } from '@/Types/database.types';
import ArticleInformation from '../ArticleInformation';

// Mock article data for testing
const mockArticle: Article = {
  Name: "Testing Article",
  EAN: 1234567890123,
  PCS: 100,
  Size: 'Large',
  Unit: 'kg',
  article_id: 10234
};

describe('ArticleInformation', () => {
  it('renders the component with article details', () => {
    render(ArticleInformation({
      article: mockArticle
    }));
    
    // Check if the main heading is present
    expect(screen.getByRole('heading', { name: 'Article Details' })).toBeInTheDocument();
    
    // Check if all article properties are displayed
    expect(screen.getByText('EAN:')).toBeInTheDocument();
    expect(screen.getByText('1234567890123')).toBeInTheDocument();
    
    expect(screen.getByText('PCS:')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    
    expect(screen.getByText('Size:')).toBeInTheDocument();
    expect(screen.getByText('Large')).toBeInTheDocument();
    
    expect(screen.getByText('Unit:')).toBeInTheDocument();
    expect(screen.getByText('kg')).toBeInTheDocument();
    
    expect(screen.getByText('Article ID:')).toBeInTheDocument();
    expect(screen.getByText('10234')).toBeInTheDocument();
  });

  it('applies default CSS classes', () => {
    const { container } = render(ArticleInformation({ article: mockArticle }));
    const mainDiv = container.firstChild as HTMLElement;
    
    expect(mainDiv).toHaveClass('grid', 'grid-cols-1', 'gap-6', 'text-black');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-test-class';
    const { container } = render(
      ArticleInformation({ article: mockArticle, className: customClass })
    );
    const mainDiv = container.firstChild as HTMLElement;
    
    expect(mainDiv).toHaveClass(customClass);
    expect(mainDiv).toHaveClass('grid', 'grid-cols-1', 'gap-6', 'text-black');
  });

  it('handles different article data types correctly', () => {
    const articleWithDifferentData: Article = {
      Name: "Different Test Article",
      EAN: 9876543210987,
      PCS: 0,
      Size: '',
      Unit: 'pieces',
      article_id: 99999
    };

    render(ArticleInformation({ article: articleWithDifferentData }));
    
    expect(screen.getByText('9876543210987')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('pieces')).toBeInTheDocument();
    expect(screen.getByText('99999')).toBeInTheDocument();
  });

  it('renders with proper semantic structure', () => {
    render(ArticleInformation({ article: mockArticle }));
    
    // Check that the white container div exists
    const containerDiv = screen.getByRole('heading', { name: 'Article Details' }).closest('div');
    expect(containerDiv).toHaveClass('bg-white', 'p-4', 'rounded-lg', 'shadow');
  });

  it('displays all required fields', () => {
    render(ArticleInformation({ article: mockArticle }));
    
    // Ensure all required fields are present
    const requiredFields = ['EAN:', 'PCS:', 'Size:', 'Unit:', 'Article ID:'];
    
    requiredFields.forEach(field => {
      expect(screen.getByText(field)).toBeInTheDocument();
    });
  });

  it('handles null or undefined values gracefully', () => {
    const articleWithNullValues = {
      ...mockArticle,
      Size: null,
      Unit: undefined
    } as any;

    // This test ensures the component doesn't crash with null/undefined values
    expect(() => {
      render(ArticleInformation({ article: articleWithNullValues }));
    }).not.toThrow();
  });
});