<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StudentRequest;
use App\Http\Resources\Student\StudentFull;
use Illuminate\Http\Request;

class StudentProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $profile = auth()->user();

        return new StudentFull($profile);
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
        //
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
    public function update(Request $request)
    {
        $id = $this->guard()->user();
        dd($id);
        $profile = Student::where('id', $id)->first();

        if (!$profile) {
            return response()->json(['error' => 'Профіль не знайдено'], 404);
        }

        $data = $request->validated();
        $profile->update($data);

        return response()->json(['message' => 'Профіль успішно оновлено'], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
