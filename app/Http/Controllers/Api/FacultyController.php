<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Http\Resources\Api\Faculty as FullFacuclties;
use Illuminate\Http\Resources\Json\ResourceCollection;

class FacultyController extends Controller
{
    protected function index(): ResourceCollection
    {
        $resource = Faculty::all();

        return FullFacuclties::collection($resource);
    }
}
