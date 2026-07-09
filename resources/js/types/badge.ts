export const VISIBILITY = {
    active: 'bg-blue-100 text-blue-800 border-blue-200',
    inactive: 'bg-cyan-100 text-cyan-800 border-cyan-200',
} as const;

export const ROLE: Record<string, string> = {
    admin: 'bg-red-100 text-red-700',
    counselor: 'bg-blue-100 text-blue-700',
    user: 'bg-green-100 text-green-700',
};
