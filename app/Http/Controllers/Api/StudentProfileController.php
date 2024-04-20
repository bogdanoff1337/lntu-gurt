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

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['update']]);
    }
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
        $validatedData = $request->all();

        $user = Auth::user();

        if(!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user->update($validatedData);

        return new StudentFull($user);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
