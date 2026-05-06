<?php

namespace App\Http\Controllers;

use App\Services\CounselorService;
use Inertia\Inertia;

class CounselorController extends Controller
{
    public function __construct(protected CounselorService $service) {}
    public function index(?string $category )
    {
        $counselors = Inertia::scroll(fn() => $this->service->getCounselors($category));
        $filters = compact("category");
        return inertia("counselors/index", compact('counselors','filters'));
    }
}
