<?php
namespace App\Repositories;

use App\Models\Counselor;

class CounselorRepository {



    public function getAllCounselors(){

        return Counselor::select('id','name','email','whatsapp','photo_url','pricing_type','price_per_hour','status')
        ->with("categories","specialization")->paginate(6);
    }

}
