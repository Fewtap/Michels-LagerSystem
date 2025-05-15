import { useEffect, useState } from 'react';
import { Article } from './Classes/Article';
import { Conversion } from './Classes/Conversion';

import './App.css'
import Database from './SUPABASE/supabase';

function App() {
  const [ArticleList, setArticleList] = useState<Article[]>([])


  useEffect(() => {
      let db = Database.getInstance()

      db.getItems("Products").then((data) => {
        if (data) {
          try{
          const articles = Conversion.convertToArticles(data);
          setArticleList(articles);
          }
          catch (error) {
            console.error("Error converting data:", error)
          }
        } else {
          console.error("No data found")
        }
      }
      ).catch((error) => {
        console.error("Error fetching data:", error)
      }
      )

      ArticleList.forEach((article) => {
        console.log(article.toString())
      }
      )
  }, [])

  return (
    <>
    <button onClick={() => {
      ArticleList.forEach((article) => {
        console.log(article.toString())
      }
      )
    }}>Check List</button>
      <div>
        {
          ArticleList.map((article, index) => (
            <div>
              <h1 key={index}>{article.Name}</h1>
              <button key={index + "A"} onClick={() => {
                console.log(article.printName())
              }
              }>Check</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
