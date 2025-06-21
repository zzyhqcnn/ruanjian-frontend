// Home Page Types
export interface HomePageData {
  backgroundText: string
  quote: string
}

// Test Card Types
export interface TestCard {
  id: number
  title: string
  creator: string
  publishTime: string
  deadline: string
  progress: number
  backgroundColor: string
}

export interface TestCardData {
  testCards: TestCard[]
}

// Study Resources Types
export interface Category {
  id: number
  name: string
}

export interface Resource {
  id: number
  title: string
  author: string
  description: string
  coverImage: string
  type: string
}

export interface StudyResourcesData {
  categories: Category[]
  resources: Resource[]
}

// Bookshelf Types
export interface Book {
  id: number
  title: string
  author: string
  pages: number
  format: string
  coverImg: string
  description?: string
}

export interface BookshelfData {
  books: Book[]
}

// Analysis Page Types
export interface AIModelInfo {
  modelName: string
  description: string
  capabilities: string[]
}

export interface AnalysisPageData {
  aiModelInfo: AIModelInfo
}
