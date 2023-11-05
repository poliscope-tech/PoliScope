import { Layout } from '@/components/Layout'
import * as llmResults from '../../data/llm-results.json'
import { Article } from '@/components/mdx'

export default function FeedPage() {
  return (
    <Layout>
      {llmResults.map((result: any) => (
        <Article
          id="asdf"
          date={new Date(result['action-date'])}
          key={result.id}
        >
          <h2>{result.title}</h2>
          <p>{result['meeting body']}</p>
        </Article>
      ))}
    </Layout>
  )
}
