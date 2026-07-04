<?php

namespace App\Services;

use App\Repositories\CounselorRepository;

class CounselorService
{
    public function __construct(protected CounselorRepository $repo) {}

    public function getCounselors(?string $category, ?string $search = null)
    {
        return $this->repo->getAllCounselors($category, $search);
    }

    public function getCounselor(string $counselor)
    {
        return $this->repo->getCounselorBySlug($counselor);
    }
}
