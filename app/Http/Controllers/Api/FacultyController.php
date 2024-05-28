<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Faculty;
use App\Http\Resources\Api\Faculty as FullFacuclties;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
class FacultyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(): AnonymousResourceCollection
    {
        $resource = Faculty::all();

        return FullFacuclties::collection($resource);
    }
}
