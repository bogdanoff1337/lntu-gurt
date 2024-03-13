<?php

namespace App\Http\Controllers\ControlApi;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomRequest;
use App\Http\Resources\Api\Room as RoomResource;
use App\Models\Room;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $room = Room::query()->paginate();

        return RoomResource::collection($room);
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
    public function store(RoomRequest $request)
    {
        $room = Room::create($request->validate());

        return new RoomResource($room);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new RoomResource(Room::findOrFail($id));
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
    public function update(RoomRequest $request, string $id)
    {
        $room = Room::findOrFail($id);

        $room->update($request->validate());

        return new RoomResource($room);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $room = Room::findOrFail($id);

        $room->delete();

        return response()->noContent();
    }
}
