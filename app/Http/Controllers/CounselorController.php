<?php

namespace App\Http\Controllers;

use App\Services\CounselorService;
use Inertia\Inertia;

class CounselorController extends Controller
{
    public function __construct(protected CounselorService $service) {}

    /* Main page - counselor list */
    public function index(?string $category = null)
    {
        $counselors = Inertia::scroll(fn() => $this->service->getCounselors($category));
        $filters = compact("category");
        return inertia("counselors/index", compact('counselors', 'filters'));
    }

    /* Detail Counselor page - show details conselor */
    public function details(string $counselor)
    {
        abort(404);

    }
}
