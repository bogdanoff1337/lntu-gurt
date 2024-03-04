<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomRequest;
use Illuminate\Http\Request;
use App\Models\Room;
use App\Http\Resources\Api\Room as RoomResource;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;
class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $dormitory_id = $request->input('dormitory_id');
        $gender = $request->input('gender');

        $roomsQuery = Room::query();

        if ($dormitory_id) {
            $roomsQuery->where('dormitory_id', $dormitory_id);
        }

        if ($gender) {
            $roomsQuery->where('gender', $gender);
        }

        $rooms = $roomsQuery->paginate();

        return RoomResource::collection($rooms);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoomRequest $request)
    {
        // Створюємо кімнату
        $validatedData = $request->validated();
        $room = Room::create($validatedData);
    
        // Зберігаємо фотографії на сервері та оновлюємо шляхи до них у базі даних
        $images = [];
        foreach ($request->file('photos') as $photo) {
            $path = $photo->store('room-photos', 'public');
            $images[] = $path;
        }
        $room->update(['photos' => $images]);
    
        return new RoomResource($room);
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

        return response()->json();
    }
}
