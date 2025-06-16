<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Http\Resources\Api\Privilege as FullPrivilege;
use App\Models\Privilege;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PrivilegeController extends Controller
{
    protected function index(): ResourceCollection
    {
        $resource = Privilege::query()
            ->where('is_active', true)
            ->get();

        return FullPrivilege::collection($resource);
    }
}
