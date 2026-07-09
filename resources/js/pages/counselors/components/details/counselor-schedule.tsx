import type { CounselorDetail } from "@/types/counselor";

type Props = {
    schedules: CounselorDetail['schedules'];
};

function CounselorSchedule({ schedules }: Props) {
    return (
        <div className="rounded-[28px] border border-border/60 bg-card p-6 shadow-sm">
            <h2 className="font-serif text-lg font-normal text-foreground">
                Jadwal Praktik
            </h2>

            {schedules.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">
                    Belum ada jadwal yang tersedia.
                </p>
            ) : (
                <ul className="mt-4 space-y-2">
                    {schedules.map((schedule) => (
                        <li
                            key={schedule.id}
                            className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-muted/40 px-4 py-2.5"
                        >
                            <span className="text-sm font-medium text-foreground">
                                {schedule.day_label}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {schedule.open_time}–{schedule.close_time}
                            </span>
                            <span className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary">
                                {schedule.method_label}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CounselorSchedule;
