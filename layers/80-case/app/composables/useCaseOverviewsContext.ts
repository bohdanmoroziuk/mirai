type CaseOverviewsContext = {
  openCase: (caseId: string) => Promise<void>
  updateCase: (caseId: string) => void
  deleteCase: (caseId: string) => Promise<void>
}

const {
  shareContext,
  useContext,
} = createContext<CaseOverviewsContext>('CaseOverviewsContext')

export const shareCaseOverviewsContext = shareContext
export const useCaseOverviewsContext = useContext
