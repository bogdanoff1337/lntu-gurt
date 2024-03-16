<?php

namespace App\Http\Controllers\ControlApi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Faculty;
use App\Http\Resources\Api\Faculty as FullFacuclties;
class FacultyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $faculties = Faculty::query()->paginate();

        return FullFacuclties::collection($faculties);
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
    public function store(Request $request)
    {
        $faculty = Faculty::create($request->validate());

        return new FullFacuclties($faculty);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new FullFacuclties(Faculty::findOrFail($id));
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
        $faculty = Faculty::findOrFail($id);

        $faculty->update($request->validate());

        return new FullFacuclties($faculty);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $faculty = Faculty::findOrFail($id);

        $faculty->delete();

        return response()->noContent();
    }
}
