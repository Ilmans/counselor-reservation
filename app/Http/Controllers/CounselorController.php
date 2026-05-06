<?php

namespace App\Http\Controllers;

use App\Services\CounselorService;
use Illuminate\Http\Request;

class CounselorController extends Controller
{
    public function __construct(protected CounselorService $service) {}
    public function index()
    {
        return $this->service->getCounselors();
    }
}
