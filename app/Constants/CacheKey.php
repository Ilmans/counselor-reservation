<?php

namespace App\Constants;

class CacheKey
{

    public const CATEGORIES = 'categories';

    public const SPECIALIZATIONS = 'specializations';




    public static function counselorBySlug(string $slug): string
    {
        return "counselor:slug:$slug";
    }
}
