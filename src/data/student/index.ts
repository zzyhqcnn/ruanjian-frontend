import type {
  HomePageData,
  TestCardData,
  StudyResourcesData,
  BookshelfData,
  AnalysisPageData,
  TestCard,
  Category,
  Resource,
  Book,
  AIModelInfo,
} from '../../types/studentData'

// Import JSON data
import homePageDataJson from './homePageData.json'
import testCardDataJson from './testCardData.json'
import studyResourcesDataJson from './studyResourcesData.json'
import bookshelfDataJson from './bookshelfData.json'
import analysisPageDataJson from './analysisPageData.json'

// Export with proper types
export const homePageData: HomePageData = homePageDataJson
export const testCardData: TestCardData = testCardDataJson
export const studyResourcesData: StudyResourcesData = studyResourcesDataJson
export const bookshelfData: BookshelfData = bookshelfDataJson
export const analysisPageData: AnalysisPageData = analysisPageDataJson

// Export individual collections for convenience
export const testCards: TestCard[] = testCardData.testCards
export const categories: Category[] = studyResourcesData.categories
export const resources: Resource[] = studyResourcesData.resources
export const books: Book[] = bookshelfData.books
export const aiModelInfo: AIModelInfo = analysisPageData.aiModelInfo

// For easier imports
export * from '../../types/studentData'
