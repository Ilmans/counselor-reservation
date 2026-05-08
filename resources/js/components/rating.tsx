import { Star } from 'lucide-react';

export default function Rating({
    rating = 0,
    totalSessions = 0,
    showSessions = true,
    size = 14,
}) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="mt-3 flex items-center gap-1">
            <div className="flex items-center">
                {[...Array(5)].map((_, index) => {
                    const isFilled = index < fullStars;
                    const isHalf = index === fullStars && hasHalfStar;

                    return (
                        <div
                            key={index}
                            className="relative"
                            style={{ width: size, height: size }}
                        >
                            {/* Background Star */}
                            <Star
                                size={size}
                                className="text-zinc-300 dark:text-zinc-700"
                                fill="currentColor"
                            />

                            {/* Filled Star */}
                            {(isFilled || isHalf) && (
                                <div
                                    className="absolute inset-0 overflow-hidden"
                                    style={{
                                        width: isHalf ? '50%' : '100%',
                                    }}
                                >
                                    <Star
                                        size={size}
                                        className="text-amber-400"
                                        fill="currentColor"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {Number(rating).toFixed(1)}
            </span>

            {showSessions && (
                <span className="text-xs text-zinc-400 dark:text-zinc-600">
                    &nbsp;· {totalSessions} sesi
                </span>
            )}
        </div>
    );
}
