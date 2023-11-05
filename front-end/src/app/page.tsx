import { Layout } from '@/components/Layout'
import llmResults from '../../data/llm-results.json' // make sure the path is correct
import { Article } from '@/components/mdx'
import BarGraph from '@/components/BarGraph' // Make sure to create and import this component

export default function FeedPage() {
  return (
    <Layout>
      {llmResults.map((result) => (
        <Article
          id={result.id.toString()}
          date={new Date(result['action-date'])}
          key={result.id}
        >
          <h2>{result.title}</h2>
          <p>{result['meeting body']}</p>
          {/* Here we include the BarGraph component */}
          <BarGraph bill={result} />
        </Article>
      ))}
    </Layout>
  )
}
