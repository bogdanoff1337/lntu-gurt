<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomRequest;
use App\Http\Resources\Api\Room\Short;
use Illuminate\Http\Request;
use App\Models\Room;
use App\Http\Resources\Api\Room\Full;
use App\Models\Image;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $rooms = Room::with('images')
            ->when($request->id, function ($query, $id) {
                return $query->where('id', $id);
            })
            ->when($request->faculty_id, function ($query, $faculty_id) {
                return $query->where('faculty_id', $faculty_id);
            })
            ->when($request->dormitory_id, function ($query, $dormitory_id) {
                return $query->where('dormitory_id', $dormitory_id);
            })
            ->when($request->gender, function ($query, $gender) {
                return $query->where('gender', $gender);
            })
            ->paginate(12);

        return Short::collection($rooms);
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
        $room = Room::create($request->validate());


        if($request->hasfile('images'))
        {
            foreach($request->file('images') as $imagefile)
            {
                $image = new Image;
                $path = $imagefile->store('/images/resource', ['disk' => 'photos_room']);
                $image->url = $path;
                $image->room_id = $room->id;
                $image->save();
            }
        }
        return new RoomResource($room);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new Full(Room::with('images')->find($id));
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
