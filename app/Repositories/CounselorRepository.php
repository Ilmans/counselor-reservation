<?php

namespace App\Repositories;

use App\Models\Category;
use App\Models\Counselor;

class CounselorRepository
{


    public function getAllCounselors()
    {
        return Counselor::select('id', 'specialization_id', 'name', 'email', 'whatsapp', 'photo_url', 'pricing_type', 'price_per_hour', 'status')
            ->with([
                'categories',
                'specialization',

            ])
            ->paginate(6);
    }

    public function getAllCategories()
    {
        return Category::select('id', 'name', 'slug')
            ->orderBy('name')
            ->get();
    }
}
