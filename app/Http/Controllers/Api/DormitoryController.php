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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DormitoryRequest $request)
    {
        $dormitories = Dormitory::create($request->validate());

        return new DormitoryResource($dormitories);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $dormitories = Dormitory::findOrFail($id);

        $dormitories->update($request->validate());
        
        return new DormitoryResource($dormitories);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dormitories = Dormitory::findOrFail($id);

        $dormitories->delete();

        return response()->json();
    }
}
