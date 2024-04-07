<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DormitoryRequest;
use Illuminate\Http\Request;
use App\Http\Resources\Api\Dormitory as DormitoryResource;
use App\Models\Dormitory;

class DormitoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dormitories = Dormitory::query()->paginate();

        return DormitoryResource::collection($dormitories);
    }
}
