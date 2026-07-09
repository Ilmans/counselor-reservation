export const VISIBILITY = {
    active: 'bg-blue-100 text-blue-800 border-blue-200',
    inactive: 'bg-cyan-100 text-cyan-800 border-cyan-200',
} as const;

export const ROLE: Record<string, string> = {
    admin: 'bg-red-100 text-red-700',
    counselor: 'bg-blue-100 text-blue-700',
    user: 'bg-green-100 text-green-700',
};

export const CONSULTATION_STATUS_CLASSES: Record<string, string> = {
    pending_payment: 'bg-orange-100 text-orange-800 border-orange-200',
    pending_confirmation: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    in_queue: 'bg-purple-100 text-purple-800 border-purple-200',
    in_progress: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
};
