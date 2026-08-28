export const toCaseStatItems = (
  stats: CaseStats,
): CaseStateItem[] => {
  return [
    {
      id: 'all',
      label: `All · ${stats.total}`,
      to: '/cases',
    },
    {
      id: 'active',
      label: `Active · ${stats.active}`,
      to: '/cases?status=active',
    },
    {
      id: 'completed',
      label: `Completed · ${stats.completed}`,
      to: '/cases?status=completed',
    },
    {
      id: 'empty',
      label: `Empty · ${stats.empty}`,
      to: '/cases?status=empty',
    },
  ]
}
