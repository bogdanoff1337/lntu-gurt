<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Cities;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CitiesController extends Controller
{
    protected function index(Request $request): AnonymousResourceCollection
    {
        // city search
        $search = $request->input('search');

        $city = City::where('name', 'ILIKE', "%$search%")
            ->limit(8)
            ->get();

        return Cities::collection($city);
    }
}
