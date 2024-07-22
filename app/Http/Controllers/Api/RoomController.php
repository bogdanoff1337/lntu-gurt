<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Room\Short;
use App\Models\Faculty;
use Illuminate\Http\Request;
use App\Models\Room;
use App\Http\Resources\Api\Room\Full;
use Illuminate\Http\Resources\Json\JsonResource;
class RoomController extends Controller
{
    public function index(Request $request): JsonResource
    {
        $filters = $request->only('id','faculty_id', 'dormitory_id', 'gender');

        $rooms = Room::filters($filters)->with('media')->paginate(12);

        return Short::collection($rooms);
    }

    public function show(string $id): JsonResource
    {
        $room = Room::with('media')->findOrFail($id);

        return new Full($room);
    }
}
