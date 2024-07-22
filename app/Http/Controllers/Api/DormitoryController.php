<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Dormitory as DormitoryResource;
use App\Models\Dormitory;
use Illuminate\Http\Resources\Json\ResourceCollection;

class DormitoryController extends Controller
{
    protected function index(): ResourceCollection
    {
        $dormitories = Dormitory::all();

        return DormitoryResource::collection($dormitories);
    }
}
