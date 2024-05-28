<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Dormitory as DormitoryResource;
use App\Models\Dormitory;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
class DormitoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(): AnonymousResourceCollection
    {
        $dormitories = Dormitory::query()->paginate();

        return DormitoryResource::collection($dormitories);
    }
}
