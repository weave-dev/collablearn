export type GridColsValues = typeof GridCols[keyof typeof GridCols]
export const GridCols = {
    2: 'grid-cols-2',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    8: 'grid-cols-8',
    12: 'grid-cols-12',
} as const

export type GridRowsValues = typeof GridRows[keyof typeof GridRows]
export const GridRows = {
    NONE: 'grid-rows-none',
    2: 'grid-rows-2',
    4: 'grid-rows-4',
    6: 'grid-rows-6',
    8: 'grid-rows-8',
    12: 'grid-rows-12',
} as const