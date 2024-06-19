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
        $rooms = Room::query()
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
            ->with('media')
            ->paginate(12);

            if ($request->has('faculty_id')) {
                $breadcrumbs = Faculty::where('id', $request->faculty_id)->get('slug_short')->first();
                return Short::collection($rooms)->additional(['breadcrumbs' => $breadcrumbs]);
            }

        return Short::collection($rooms);
    }

    public function show(string $id): JsonResource
    {
        $room = Room::with('media')->findOrFail($id);

        return new Full($room);
    }
}
