<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Cities;
use App\Models\City;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CitiesController extends Controller
{
    protected function index(): AnonymousResourceCollection
    {
        $search = request('search');

        $city = City::where('name', 'like', "%$search%")
            ->orWhere('region', 'like', "%$search%")
            ->limit(8)
            ->get();

        return Cities::collection($city);
    }
}
