<?php

namespace App\Services;

use App\Repositories\CounselorRepository;

class CounselorService
{

    public function __construct(protected CounselorRepository $repo) {}

    public function getCounselors(?string $category)
    {
        return $this->repo->getAllCounselors($category);
    }
}
